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
package jp.co.acroquest.endosnipe.web.dashboard.manager;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import jp.co.acroquest.endosnipe.common.entity.MeasurementData;
import jp.co.acroquest.endosnipe.common.entity.MeasurementDetail;
import jp.co.acroquest.endosnipe.common.entity.ResourceData;
import jp.co.acroquest.endosnipe.web.dashboard.dto.MeasurementValueDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.wgp.manager.MessageInboundManager;
import org.wgp.manager.WgpDataManager;
import org.wgp.servlet.WgpMessageInbound;

/**
 * リソース通知を行うクラス。
 * @author fujii
 *
 */
@Service
@Scope("singleton")
public class ResourceSender
{
    @Autowired
    /** WgpDataManager */
    private WgpDataManager wgpDataManager;

    /** 単位の区切り文字 */
    private static final String UNIT_SEPARATOR = ":";

    /**
     * コンストラクタです。
     */
    public ResourceSender()
    {
        // Do Nothing.
    }

    public void send(final ResourceData resourceData)
    {
        MessageInboundManager inboundManager = MessageInboundManager.getInstance();
        List<WgpMessageInbound> inboundList = inboundManager.getMessageInboundList();

        for (WgpMessageInbound inbound : inboundList)
        {
            sendWgpData(resourceData, this.wgpDataManager, inbound);
        }
    }

    private void sendWgpData(final ResourceData resourceData, final WgpDataManager dataManager,
            final WgpMessageInbound inbound)
    {
        Set<String> listeners = inbound.getListeners();
        Map<String, MeasurementData> measurementMap = resourceData.getMeasurementMap();
        long measurementTime = resourceData.measurementTime;
        for (Entry<String, MeasurementData> measurementDataEntry : measurementMap.entrySet())
        {
            MeasurementData measurementData = measurementDataEntry.getValue();
            String measurementItemName = measurementDataEntry.getKey();
            boolean observate = isObservate(listeners, measurementItemName);
            if (observate == false)
            {
                continue;
            }
            Map<String, MeasurementDetail> measurementDetailMap =
                                                                  measurementData.getMeasurementDetailMap();

            if (measurementDetailMap.size() == 1)
            {
                MeasurementDetail measurementDetail = measurementDetailMap.get("");
                String value = String.valueOf(measurementDetail.value);
                MeasurementValueDto valueDto = new MeasurementValueDto();
                valueDto.setMeasurementItemId(0);
                valueDto.setMeasurementItemName(measurementItemName);
                valueDto.setMeasurementTime(measurementTime);
                valueDto.setMeasurementValue(value);
                dataManager.setData(measurementItemName, String.valueOf(measurementTime), valueDto);
            }
        }
    }

    /** 
     * 監視対象グループに計測対象が含まれているかどうか。リスナに保持したグループIDの前方一致で判定する。
     * @param listeners 監視対象リスナ
     * @param itemName 計測項目名
     * @return 監視対象グループに計測対象が含まれている場合true、含まれていない場合falseを返す。
     */
    private boolean isObservate(final Set<String> listeners, final String itemName)
    {
        for (String groupId : listeners)
        {
            if (itemName.startsWith(groupId))
            {
                return true;
            }
        }
        return false;
    }
}
