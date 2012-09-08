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

/**
 * 計測項目詳細オブジェクト
 * @author fujii
 *
 */
public class MeasurementDetailData
{
    /** 計測項目ID */
    public long   measurement_id;

    /** 計測項目タイプ */
    public int    measurement_type;

    /** 項目名 */
    public String item_name;
    
    /** 計測項目値(Stringに変換して使うこと) */
    public String measurement_value;

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "MeasurementData [measurement_id=" + measurement_id
                + ", measurement_type=" + measurement_type
                + ", itemName=" + item_name
                + ", measurement_value=" + measurement_value + "]";
    }

}
