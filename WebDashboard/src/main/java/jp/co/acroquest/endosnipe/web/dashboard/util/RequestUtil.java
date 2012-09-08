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
package jp.co.acroquest.endosnipe.web.dashboard.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jp.co.acroquest.endosnipe.common.logger.ENdoSnipeLogger;
import jp.co.acroquest.endosnipe.web.dashboard.constants.LogMessageCodes;

/**
 * クライアントから受信したリクエストを解析するUtilクラスです。
 * @author fujii
 *
 */
public class RequestUtil
{
    /** ロガーオブジェクト */
    private static final ENdoSnipeLogger LOGGER      = ENdoSnipeLogger.getLogger(RequestUtil.class);

    /** 日付のフォーマット */
    private static final String          DATE_FORMAT = "yyyy/MM/dd HH:mm";

    /**
     * インスタンス化を阻止するprivateコンストラクタです。
     */
    private RequestUtil()
    {
        // Do Nothing.
    }

    /**
     * 通知要求エージェントIDをリストとして取得します。
     * @param agentIds 通知要求エージェントID
     * @return 通知要求エージェントIDのリスト
     */
    public static List<Integer> getAgentIdList(String agentIds)
    {
        List<Integer> agentIdList = new ArrayList<Integer>();
        String[] agentIdArray = agentIds.split(",");
        for (String agentIdStr : agentIdArray)
        {
            Integer agentId = null;
            try
            {
                agentId = Integer.valueOf(agentIdStr);
                agentIdList.add(agentId);
            }
            catch (NumberFormatException ex)
            {
                LOGGER.log(LogMessageCodes.UNKNOWN_AGENT_ID, agentId);
                continue;
            }
        }
        return agentIdList;
    }

    /**
     * 通知要求計測IDをリストとして取得します。
     * @param measurementTypes 通知要求計測ID
     * @return 通知要求計測IDのリスト
     */
    public static List<Integer> getMeasurementTypeList(String measurementTypes)
    {
        List<Integer> measurementTypeList = new ArrayList<Integer>();
        String[] measurementTyepArray = measurementTypes.split(",");
        for (String measurementTypeStr : measurementTyepArray)
        {
            Integer measurementType = null;
            try
            {
                measurementType = Integer.valueOf(measurementTypeStr);
                measurementTypeList.add(measurementType);
            }
            catch (NumberFormatException ex)
            {
                LOGGER.log(LogMessageCodes.UNKNOWN_MEASUREMENT_TYPE, measurementType);
                continue;
            }
        }
        return measurementTypeList;
    }

    /**
     * 期間をDate型の配列として取得します。
     * @param spanStr 期間
     * @return 期間(開始時刻, 終了時刻)
     */
    public static Date[] getSpanList(String spanStr)
    {
        String[] spanArray = spanStr.split(",");
        if (spanArray.length != 2)
        {
            return null;
        }
        String startStr = spanArray[0];
        String endStr = spanArray[1];

        SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT);

        Date[] dateArray = new Date[2];
        try
        {
            dateArray[0] = formatter.parse(startStr);
            dateArray[1] = formatter.parse(endStr);
        }
        catch (ParseException e)
        {
            return null;
        }

        return dateArray;
    }
}
