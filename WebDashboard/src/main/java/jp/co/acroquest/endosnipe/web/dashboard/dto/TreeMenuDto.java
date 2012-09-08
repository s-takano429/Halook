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

public class TreeMenuDto
{
    /** 表示名 */
    private String data;

    /** ツリーID */
    private String treeId;
    
    /** 親ツリーID */
    private String parentTreeId;

    /** ID */
    private String id;

    public String getData()
    {
        return data;
    }

    public void setData(final String data)
    {
        this.data = data;
    }

    public String getTreeId(){
    	return treeId;
    }

    public void setTreeId(final String treeId){
    	this.treeId = treeId;
    }

    public String getParentTreeId()
    {
        return parentTreeId;
    }

    public void setParentTreeId(final String parentTreeId)
    {
        this.parentTreeId = parentTreeId;
    }

    public String getId()
    {
        return id;
    }

    public void setId(final String id)
    {
        this.id = id;
    }

    public String getMeasurementUnit()
    {
        return measurementUnit;
    }

    public void setMeasurementUnit(final String measurementUnit)
    {
        this.measurementUnit = measurementUnit;
    }

    /** 計測単位 */
    private String measurementUnit;

    @Override
    public String toString()
    {
        return "TreeMenuDto [data=" + data + ", parentId=" + parentTreeId + ", id=" + id
                + ", measurementUnit=" + measurementUnit + "]";
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((data == null) ? 0 : data.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((measurementUnit == null) ? 0 : measurementUnit.hashCode());
        result = prime * result + ((parentTreeId == null) ? 0 : parentTreeId.hashCode());
        return result;
    }

    @Override
    public boolean equals(final Object obj)
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
        TreeMenuDto other = (TreeMenuDto)obj;
        if (data == null)
        {
            if (other.data != null)
            {
                return false;
            }
        }
        else if (!data.equals(other.data))
        {
            return false;
        }
        if (id == null)
        {
            if (other.id != null)
            {
                return false;
            }
        }
        else if (!id.equals(other.id))
        {
            return false;
        }
        if (measurementUnit == null)
        {
            if (other.measurementUnit != null)
            {
                return false;
            }
        }
        else if (!measurementUnit.equals(other.measurementUnit))
        {
            return false;
        }
        if (parentTreeId == null)
        {
            if (other.parentTreeId != null)
            {
                return false;
            }
        }
        else if (!parentTreeId.equals(other.parentTreeId))
        {
            return false;
        }
        return true;
    }
}
