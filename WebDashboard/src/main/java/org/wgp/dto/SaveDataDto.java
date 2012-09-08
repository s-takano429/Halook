/*******************************************************************************
 * WGP 0.2 - Web Graphical Platform (https://sourceforge.net/projects/wgp/)
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2012 Acroquest Technology Co.,Ltd.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/

package org.wgp.dto;

/**
 * データ保存用の受信電文
 * @author nakagawa
 *
 */
public class SaveDataDto extends ReceiveDto
{
    /** save data. */
    private String saveData;

    /** type of save data. */
    private String dataType;

    /** ID of save data. */
    private String dataId;

    /**
     * @return the saveData
     */
    public String getSaveData()
    {
        return saveData;
    }

    /**
     * @param saveData the saveData to set
     */
    public void setSaveData(String saveData)
    {
        this.saveData = saveData;
    }

    /**
     * @return the dataType
     */
    public String getDataType()
    {
        return dataType;
    }

    /**
     * @param dataType the dataType to set
     */
    public void setDataType(String dataType)
    {
        this.dataType = dataType;
    }

    /**
     * @return the dataId
     */
    public String getDataId()
    {
        return dataId;
    }

    /**
     * @param dataId the dataId to set
     */
    public void setDataId(String dataId)
    {
        this.dataId = dataId;
    }
}
