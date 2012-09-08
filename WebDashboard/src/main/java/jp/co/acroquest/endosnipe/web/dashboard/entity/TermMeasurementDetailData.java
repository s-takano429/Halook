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

import java.util.List;

/**
 * 計測項目詳細オブジェクト
 * 
 * @author fujii
 */
public class TermMeasurementDetailData
{
    /** 計測項目ID */
    public long         measurement_id = -1;

    /** 項目名 */
    public String      item_name;

    /** 計測項目タイプ */
    public int          measurement_type;

    /** 計測項目値(Stringに変換して使うこと) */
    public List<String> measurement_values;

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "TermMeasurementDetailData [id=" + measurement_id + ", item_name=" + this.item_name
                + ", type=" + measurement_type + ", values=" + measurement_values.toString() + "]";
    }

}
