/*
 * Copyright (c) 2012 Acroquest Technology Co., Ltd. All Rights Reserved.
 * Please read the associated COPYRIGHTS file for more details.
 *
 * THE SOFTWARE IS PROVIDED BY Acroquest Technology Co., Ltd., WITHOUT
 * WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDER BE LIABLE FOR ANY
 * CLAIM, DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
 * OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */
package jp.co.acroquest.endosnipe.web.dashboard.listener.javelin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jp.co.acroquest.endosnipe.communicator.CommunicationClient;
import jp.co.acroquest.endosnipe.communicator.CommunicationFactory;
import jp.co.acroquest.endosnipe.communicator.TelegramListener;
import jp.co.acroquest.endosnipe.communicator.accessor.ConnectNotifyAccessor;
import jp.co.acroquest.endosnipe.communicator.entity.ConnectNotifyData;
import jp.co.acroquest.endosnipe.communicator.entity.Header;
import jp.co.acroquest.endosnipe.communicator.entity.Telegram;
import jp.co.acroquest.endosnipe.communicator.entity.TelegramConstants;
import jp.co.acroquest.endosnipe.web.dashboard.config.DataBaseConfig;
import jp.co.acroquest.endosnipe.web.dashboard.listener.collector.AlarmNotifyListener;
import jp.co.acroquest.endosnipe.web.dashboard.listener.collector.CollectorListener;
import jp.co.acroquest.endosnipe.web.dashboard.listener.collector.ResourceAlarmListener;
import jp.co.acroquest.endosnipe.web.dashboard.listener.collector.ResourceStateListener;
import jp.co.acroquest.endosnipe.web.dashboard.manager.ConnectionClient;
import jp.co.acroquest.endosnipe.web.dashboard.manager.DatabaseManager;
import jp.co.acroquest.endosnipe.web.dashboard.manager.MessageSender;
import jp.co.acroquest.endosnipe.web.dashboard.servlet.DashBoardServlet;

/**
 * DataCollectorからJavelinの増減通知を受け、agentの作成を行うリスナです。
 * @author kajiwara
 *
 */
public class JavelinNotifyListener implements TelegramListener
{

    /** メッセージ送信用オブジェクトです。 */
    private MessageSender               messageSender_;

    /** 接続しているDB名のリスト */
    private static Map<String, Integer> databaseNameMap_ = new HashMap<String, Integer>();

    /**
     * コンストラクタです。
     * @param messageSender {@link MessageSender}オブジェクト
     * @param agentId エージェントID
     */
    public JavelinNotifyListener(MessageSender messageSender)
    {
        this.messageSender_ = messageSender;
    }

    /**
     * Javelin増減電文を受けagentの増減を行います。
     * @param telegram Javelin増減通知電文
     * @return 応答電文(nullを返す。)
     */
    public Telegram receiveTelegram(Telegram telegram)
    {
        Header header = telegram.getObjHeader();
        if ((header.getByteTelegramKind() == TelegramConstants.BYTE_TELEGRAM_KIND_ADD_DATABASE_NAME || header.getByteTelegramKind() == TelegramConstants.BYTE_TELEGRAM_KIND_DEL_DATABASE_NAME)
                && header.getByteRequestKind() == TelegramConstants.BYTE_REQUEST_KIND_NOTIFY)
        {
            Set<String> databaseNameList = ConnectNotifyAccessor.getDataBaseNameList(telegram);
            modiryCollectorClientThread(databaseNameList, header.getByteTelegramKind());

            //            sendNotifyEntry(databaseNameList, header.getByteTelegramKind());
            //
        }
        return null;
    }

    /**
     * DataCollector-ClientThreadを作成・削除を行う
     * @param databaseNameList DataCollectorから取得したDB名リスト
     * @param telegramKind Javelin増減通知電文
     */
    private void modiryCollectorClientThread(Set<String> databaseNameList, byte telegramKind)
    {
        DatabaseManager manager = DatabaseManager.getInstance();
        DataBaseConfig dbConfig = manager.getDataBaseConfig();

        if (telegramKind == TelegramConstants.BYTE_TELEGRAM_KIND_ADD_DATABASE_NAME)
        {
            ConnectionClient connectionClient = ConnectionClient.getInstance();
            List<CommunicationClient> clientList = connectionClient.getClientList();
            for (String databaseName : databaseNameList)
            {
                if (databaseNameMap_.containsKey(databaseName))
                {
                    continue;
                }
                // DataCollectorに接続する。
                String javelinHost = dbConfig.getServerModeAgentSetting().acceptHost;
                int javelinPort = dbConfig.getServerModeAgentSetting().acceptPort;

                int agentId = getAgentId();
                String clientId = DashBoardServlet.createClientId(javelinHost, javelinPort);

                CommunicationClient client =
                                             CommunicationFactory.getCommunicationClient("DataCollector-ClientThread-"
                                                     + clientId);
                client.init(javelinHost, javelinPort);
                client.addTelegramListener(new CollectorListener(messageSender_, agentId,
                                                                 databaseName));
                client.addTelegramListener(new AlarmNotifyListener(messageSender_, agentId));
                client.addTelegramListener(new ResourceAlarmListener(messageSender_, agentId));
                client.addTelegramListener(new ResourceStateListener(messageSender_, agentId));

                ConnectNotifyData connectNotify = new ConnectNotifyData();
                connectNotify.setKind(ConnectNotifyData.KIND_CONTROLLER);
                connectNotify.setPurpose(ConnectNotifyData.PURPOSE_GET_RESOURCE);
                connectNotify.setDbName(databaseName);

                client.connect(connectNotify);
                clientList.add(client);

                databaseNameMap_.put(databaseName, agentId);
            }
        }
        else
        {
            for (String databaseName : databaseNameList)
            {
                databaseNameMap_.remove(databaseName);
            }
        }
    }

    /**
     * agentIDを取得する。
     * @return agentID
     */
    private int getAgentId()
    {
        // 現在空いている最も大きいagentId + 1の値を取得する
        Integer agentId = 1;
        for (Integer nowAgentId : databaseNameMap_.values())
        {
            if (agentId <= nowAgentId)
            {
                agentId = nowAgentId + 1;
            }
        }
        return agentId;
    }

    // TODO
    //    /**
    //     * クライアントにDB名を通知する。
    //     * @param measurementDataMap
    //     * @param matchSettingMap
    //     */
    //    private void sendNotifyEntry(Set<String> databaseNameList, Byte kind)
    //    {
    //        Map<Byte, Set<String>> notifyData = new HashMap<Byte, Set<String>>();
    //        notifyData.put(kind, databaseNameList);
    //
    //        // クライアントにDB名を送信する
    //        EventManager manager = EventManager.getInstance();
    //        Map<String, MeasurementSetting> clientSettings = manager.getCliantSettings();
    //        for (Entry<String, MeasurementSetting> clientEntry : clientSettings.entrySet())
    //        {
    //            String clientId = clientEntry.getKey();
    //
    //            String result = JSON.encode(notifyData);
    //            this.messageSender_.send(clientId, result);
    //        }
    //    }

    /**
     * DB名リストを取得します。
     * @return databaseNameList_ DB名リスト
     */
    public static Map<String, Integer> getDatabaseNameMap_()
    {
        return databaseNameMap_;
    }

    /**
     * DB名リストを設定します。
     * @param databaseNameList_ DB名リスト
     */
    public static void setDatabaseNameMap_(Map<String, Integer> databaseNameMap_)
    {
        JavelinNotifyListener.databaseNameMap_ = databaseNameMap_;
    }
}
