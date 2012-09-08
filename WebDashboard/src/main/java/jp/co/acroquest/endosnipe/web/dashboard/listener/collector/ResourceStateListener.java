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

import java.util.Map;
import java.util.Map.Entry;

import jp.co.acroquest.endosnipe.communicator.AbstractTelegramListener;
import jp.co.acroquest.endosnipe.communicator.entity.Body;
import jp.co.acroquest.endosnipe.communicator.entity.Telegram;
import jp.co.acroquest.endosnipe.communicator.entity.TelegramConstants;
import jp.co.acroquest.endosnipe.web.dashboard.config.ResourceAlarmSetting;
import jp.co.acroquest.endosnipe.web.dashboard.constants.EventConstants;
import jp.co.acroquest.endosnipe.web.dashboard.entity.ResourceStateAllEntity;
import jp.co.acroquest.endosnipe.web.dashboard.manager.EventManager;
import jp.co.acroquest.endosnipe.web.dashboard.manager.MessageSender;
import net.arnx.jsonic.JSON;

/**
 * リソース状態（閾値超過状態）をクライアントに通知するリスナクラスです。
 * @author ochiai
 *
 */
public class ResourceStateListener extends AbstractTelegramListener
{

    /** メッセージ送信用オブジェクトです。 */
    private MessageSender                messageSender_;

    /** エージェントID */
    private int                          agentId_;

    /**
     * 
     * コンストラクタです。
     * @param messageSender {@link MessageSender}オブジェクト
     * @param agentId エージェントID
     */
    public ResourceStateListener(MessageSender messageSender, int agentId)
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
        ResourceStateAllEntity alarmEntity = new ResourceStateAllEntity();
        alarmEntity.event_id = EventConstants.EVENT_RESOURCE_STATE_ALL_RESPONSE;

        // agent_ids に1つのエージェントのidだけを入れる
        int[] agentIds = new int[1];
        agentIds[0] = this.agentId_;
        alarmEntity.agent_ids = agentIds;

        Body[] resourceAlarmBodies = telegram.getObjBody();

        // DataCollectorから送信された電文から、
        // Dashboardのクライアントに通知するためのイベントを作成する。
        for (Body body : resourceAlarmBodies)
        {
            String objectName = body.getStrObjName();
            String itemName = body.getStrItemName();
            if (TelegramConstants.OBJECTNAME_RESOURCEALARM.equals(objectName) == false)
            {
                continue;
            }
            int loopCount = body.getIntLoopCount();
            Object[] itemValueArr = body.getObjItemValueArr();
            // アラームレベルの項目に対する処理
            if (TelegramConstants.ITEMNAME_ALARM_LEVEL.equals(itemName))
            {
                // alarmLevels に1つのエージェントのアラームレベルだけを入れる
                int[] alarmLevels = new int[1];
                alarmLevels[0] = 0;
                for (int cnt = 0; cnt < itemValueArr.length; cnt++)
                {
                    if (cnt >= loopCount)
                    {
                        break;
                    }
                    Integer alarmLevel = (Integer)itemValueArr[cnt];
                    // alarmLevels[0] に、0：正常、1：警告、2：エラー のうち最大のものを入れる
                    if (alarmLevels[0] < alarmLevel.intValue())
                    {
                        alarmLevels[0] = alarmLevel.intValue();
                    }
                }
                alarmEntity.alarm_levels = alarmLevels;
            }
        }

        // クライアントに対する通知処理
        String message = JSON.encode(alarmEntity);
        EventManager manager = EventManager.getInstance();
        Map<String, ResourceAlarmSetting> clientSettings = manager.getResourceAlarmSettings();
        for (Entry<String, ResourceAlarmSetting> clientEntry : clientSettings.entrySet())
        {
            ResourceAlarmSetting alarmSetting = clientEntry.getValue();
            boolean containAgent = alarmSetting.containAgent(this.agentId_);
            if (containAgent)
            {
                String clientId = clientEntry.getKey();
                this.messageSender_.send(clientId, message);
            }
        }

        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected byte getByteRequestKind()
    {
        return TelegramConstants.BYTE_REQUEST_KIND_RESPONSE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected byte getByteTelegramKind()
    {
        return TelegramConstants.BYTE_TELEGRAM_RESOURCE_ALARM;
    }

}
