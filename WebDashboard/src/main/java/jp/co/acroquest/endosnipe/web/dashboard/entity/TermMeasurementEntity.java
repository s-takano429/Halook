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
package jp.co.acroquest.endosnipe.web.dashboard.entity;

import java.util.Date;
import java.util.List;

import net.arnx.jsonic.JSONHint;

/**
 * 計測項目自動通知開始要求オブジェクト
 * 
 * @author fujii
 */
public class TermMeasurementEntity
{
    /** イベントID */
    public long                      event_id;

    /** グラフID */
    public long                      graph_id;

    /** 計測時刻のリスト */
    @JSONHint(format="yyyy/MM/dd HH:mm:ss")
    public List<Date>                timestamps;

    /** エージェント毎の計測データ */
    public List<TermMeasurementData> measurement_data;

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "TermMeasurementEntity [event_id=" + event_id + ", graph_id="
                + graph_id + ", timestamps=" + timestamps.toString()
                + ", measurement_data=" + measurement_data.toString() + "]";
    }
}
