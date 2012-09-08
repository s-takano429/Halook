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
package jp.co.acroquest.endosnipe.web.dashboard.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jp.co.acroquest.endosnipe.common.logger.ENdoSnipeLogger;
import jp.co.acroquest.endosnipe.data.dao.MeasurementValueDao;
import jp.co.acroquest.endosnipe.web.dashboard.constants.LogMessageCodes;
import jp.co.acroquest.endosnipe.web.dashboard.dto.MeasurementValueDto;
import jp.co.acroquest.endosnipe.web.dashboard.manager.DatabaseManager;

import org.springframework.stereotype.Service;

/**
 * MeasurementValueの取得用のインタフェースを提供する。
 * 
 * @author akiba
 */
@Service
public class MeasurementValueService
{
    /** ロガー */
    private static final ENdoSnipeLogger LOGGER =
        ENdoSnipeLogger.getLogger(MeasurementValueService.class);

    /**
     * 条件を指定してMeasurementValueのリストを取得する。
     * 
     * @param starttime  範囲開始時刻
     * @param endtime    範囲終了時刻
     * @param itemNameList 
     * @return MeasurementValueのリスト。
     */
    public Map<String, List<MeasurementValueDto>> getMeasurementValueList(Date starttime,
                                                                          Date endtime,
                                                                          List<String> measItemNameList)
    {
        // TODO データベース名が固定
        // →以下のコードは、collector.propertiesからデータベース名を取得するもの(clientモード想定)
        // →DataCollectorをserverモードで動かす場合は、Database名はあらかじめAgentから
        //   通知されているものを使用する。
        DatabaseManager dbMmanager = DatabaseManager.getInstance();
        String dbName = dbMmanager.getDataBaseName(1);
        
        Map<String, List<MeasurementValueDto>> valueMap =
            new HashMap<String, List<MeasurementValueDto>>();
        
        for (String itemName : measItemNameList)
        {
            List<MeasurementValueDto> valueList = new ArrayList<MeasurementValueDto>();
            valueMap.put(itemName, valueList);
            
            try
            {
                List<jp.co.acroquest.endosnipe.data.dto.MeasurementValueDto> queryResultList =
                    MeasurementValueDao.selectByTermAndMeasurementItemName(dbName,
                                                                           starttime, endtime,
                                                                           itemName);
                exchangeToDashboardDto(queryResultList, valueList);
            }
            catch (SQLException ex)
            {
                LOGGER.log(LogMessageCodes.SQL_EXCEPTION);
            }
        }
        
        return valueMap;
    }

    /**
     * DataAccesesorを使ってDBから取得した計測値の情報を、Dashboard用のDTOに詰め替える。
     * 
     * @param dashboardDtoList Dashboard用のDTOのリスト。
     * @param queryResultList DBから取得した計測値のリスト。
     */
    private void exchangeToDashboardDto(
            List<jp.co.acroquest.endosnipe.data.dto.MeasurementValueDto> queryResultList,
            List<MeasurementValueDto> dashboardDtoList)
    {
        if (dashboardDtoList == null || queryResultList == null)
        {
            return;
        }
        
        for (jp.co.acroquest.endosnipe.data.dto.MeasurementValueDto queryDto : queryResultList)
        {
            MeasurementValueDto dashboardDto = new MeasurementValueDto();
            dashboardDto.setMeasurementItemId(queryDto.measurementItemId);
            dashboardDto.setMeasurementItemName(queryDto.measurementItemName);
            dashboardDto.setMeasurementTime(queryDto.measurementTime.getTime());
            dashboardDto.setMeasurementValue(queryDto.value);
            dashboardDtoList.add(dashboardDto);
        }
    }
}
