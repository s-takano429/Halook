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
 * 計測項目を一意にするキーを表すクラスです。<br />
 * 計測値種別と計測項目IDによって表します。
 * @author fujii
 *
 */
public class MeasurementItemKey
{
    /** 計測項目ID */
    public int measurementId_;

    /** 計測値種別 */
    public int measurementType_;

    /**
     * コンストラクタ。計測項目IDと計測値種別を設定します。
     * @param measurementId 計測項目ID
     * @param measurementType 計測値種別
     */
    public MeasurementItemKey(int measurementId, int measurementType)
    {
        this.measurementId_ = measurementId;
        this.measurementType_ = measurementType;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode()
    {
        final int PRIME = 31;
        int result = 1;
        result = PRIME * result + measurementId_;
        result = PRIME * result + measurementType_;
        return result;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
        {
            return true;
        }
        if (obj == null)
        {
            return false;
        }
        if (getClass() != obj.getClass())
        {
            return false;
        }
        MeasurementItemKey other = (MeasurementItemKey) obj;
        if (measurementId_ != other.measurementId_)
        {
            return false;
        }
        if (measurementType_ != other.measurementType_)
        {
            return false;
        }
        return true;
    }

}
