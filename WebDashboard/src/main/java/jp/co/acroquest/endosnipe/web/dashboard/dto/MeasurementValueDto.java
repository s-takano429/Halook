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
package jp.co.acroquest.endosnipe.web.dashboard.dto;

/**
 * 計測項目のDTO。
 * 
 * @author akiba
 */
public class MeasurementValueDto
{
    /** 計測項目ID。 */
    private int    measurementItemId;
    
    /** 計測項目名。 */
    private String measurementItemName;
    
    /** 計測時刻。 */
    private long   measurementTime;
    
    /** 計測項目値。 */
    private String measurementValue;

    /**
     * @return the measurementItemId
     */
    public int getMeasurementItemId()
    {
        return this.measurementItemId;
    }

    /**
     * @param measurementItemId the measurementItemId to set
     */
    public void setMeasurementItemId(int measurementItemId)
    {
        this.measurementItemId = measurementItemId;
    }

    /**
     * @return the measurementItemName
     */
    public String getMeasurementItemName()
    {
        return this.measurementItemName;
    }

    /**
     * @param measurementItemName the measurementItemName to set
     */
    public void setMeasurementItemName(String measurementItemName)
    {
        this.measurementItemName = measurementItemName;
    }

    /**
     * @return the measurementTime
     */
    public long getMeasurementTime()
    {
        return this.measurementTime;
    }

    /**
     * @param measurementTime the measurementTime to set
     */
    public void setMeasurementTime(long measurementTime)
    {
        this.measurementTime = measurementTime;
    }

    /**
     * @return the measurementValue
     */
    public String getMeasurementValue()
    {
        return this.measurementValue;
    }

    /**
     * @param measurementValue the measurementValue to set
     */
    public void setMeasurementValue(String measurementValue)
    {
        this.measurementValue = measurementValue;
    }
}
