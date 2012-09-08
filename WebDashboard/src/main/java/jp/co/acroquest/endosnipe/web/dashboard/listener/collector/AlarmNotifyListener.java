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
package jp.co.acroquest.endosnipe.web.dashboard.listener.collector;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import jp.co.acroquest.endosnipe.communicator.AbstractTelegramListener;
import jp.co.acroquest.endosnipe.communicator.accessor.JvnFileNotifyAccessor;
import jp.co.acroquest.endosnipe.communicator.accessor.JvnFileNotifyAccessor.JvnFileEntry;
import jp.co.acroquest.endosnipe.communicator.entity.Telegram;
import jp.co.acroquest.endosnipe.communicator.entity.TelegramConstants;
import jp.co.acroquest.endosnipe.web.dashboard.config.AlarmSetting;
import jp.co.acroquest.endosnipe.web.dashboard.constants.EventConstants;
import jp.co.acroquest.endosnipe.web.dashboard.entity.AlarmNotifyEntity;
import jp.co.acroquest.endosnipe.web.dashboard.manager.EventManager;
import jp.co.acroquest.endosnipe.web.dashboard.manager.MessageSender;
import jp.co.acroquest.endosnipe.web.dashboard.service.JvnFileEntryJudge;
import jp.co.acroquest.endosnipe.web.dashboard.util.DaoUtil;
import jp.co.acroquest.endosnipe.web.dashboard.util.EventUtil;
import jp.co.acroquest.endosnipe.perfdoctor.WarningUnit;
import net.arnx.jsonic.JSON;

/**
 * DataCollectorからjvnログの通知を受け、クライアントにPerformanceDoctorで検出したアラームを返すためのリスナです。
 * @author eriguchi
 *
 */
public class AlarmNotifyListener extends AbstractTelegramListener
{
    /** メッセージ送信用オブジェクトです。 */
    private MessageSender messageSender_;

    /** エージェントID */
    private int agentId_;

    /**
     * コンストラクタです。
     * @param messageSender {@link MessageSender}オブジェクト
     * @param agentId エージェントID
     */
    public AlarmNotifyListener(MessageSender messageSender, int agentId)
    {
        this.messageSender_ = messageSender;
        this.agentId_ = agentId;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected Telegram doReceiveTelegram(Telegram telegram)
    {

        JvnFileEntryJudge judge = new JvnFileEntryJudge();
        JvnFileEntry[] entries = JvnFileNotifyAccessor.getJvnFileEntries(telegram);
        List<WarningUnit> warningUnitList = judge.judge(entries, true, true);

        List<AlarmNotifyEntity> infoEntries = new ArrayList<AlarmNotifyEntity>();
        List<AlarmNotifyEntity> warnEntries = new ArrayList<AlarmNotifyEntity>();
        List<AlarmNotifyEntity> errorEntries = new ArrayList<AlarmNotifyEntity>();
        for (WarningUnit unit : warningUnitList)
        {
            String level = unit.getLevel();
            int eventId = EventConstants.EVENT_NOTIFY_ALARM_ITEM;
            AlarmNotifyEntity alarmNotifyEntity =
                                                  DaoUtil.createAlarmEntity(this.agentId_, unit,
                                                                            level, eventId);

        }

        String infoMessage = null;
        String warnMessage = null;
        String errorMessage = null;
        if (infoEntries.size() > 0)
        {
            infoMessage = JSON.encode(infoEntries);
        }
        if (warnEntries.size() > 0)
        {
            warnMessage = JSON.encode(warnEntries);
        }
        if (errorEntries.size() > 0)
        {
            errorMessage = JSON.encode(errorEntries);
        }
        EventManager manager = EventManager.getInstance();
        Map<String, AlarmSetting> clientSettings = manager.getAlarmSettings();
        for (Entry<String, AlarmSetting> clientEntry : clientSettings.entrySet())
        {
            AlarmSetting alarmSetting = clientEntry.getValue();
            boolean containAgent = alarmSetting.containAgent(this.agentId_);
            if (containAgent)
            {
                String clientId = clientEntry.getKey();

                int alarmLevel = alarmSetting.getAlarmLevel();
                if (alarmLevel == EventUtil.LEVEL_INFO)
                {
                    sendMessage(infoMessage, clientId);
                }
                else if (alarmLevel == EventUtil.LEVEL_WARN)
                {
                    sendMessage(warnMessage, clientId);
                }
                else if (alarmLevel == EventUtil.LEVEL_ERROR)
                {
                    sendMessage(errorMessage, clientId);
                }
            }
        }
        return null;
    }

    /**
     * {@link MessageSender}スレッドにメッセージを送信します。
     * @param message メッセージ
     * @param clientId クライアントID
     */
    private void sendMessage(String message, String clientId)
    {
        if (message != null && message.equals("") == false)
        {
            this.messageSender_.send(clientId, message);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected byte getByteRequestKind()
    {
        return TelegramConstants.BYTE_REQUEST_KIND_NOTIFY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected byte getByteTelegramKind()
    {
        return TelegramConstants.BYTE_TELEGRAM_KIND_JVN_FILE;
    }

}
