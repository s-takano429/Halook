/*
 * Copyright (c) 2004-2010 SMG Co., Ltd. All Rights Reserved.
 * Please read the associated COPYRIGHTS file for more details.
 *
 * THE  SOFTWARE IS  PROVIDED BY  SMG Co., Ltd., WITHOUT  WARRANTY  OF
 * ANY KIND,  EXPRESS  OR IMPLIED,  INCLUDING BUT  NOT LIMITED  TO THE
 * WARRANTIES OF  MERCHANTABILITY,  FITNESS FOR A  PARTICULAR  PURPOSE
 * AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDER BE LIABLE FOR ANY
 * CLAIM, DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
 * OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */
package jp.co.acroquest.endosnipe.web.dashboard.entity.comparator;

import java.io.Serializable;
import java.util.Comparator;
import java.util.Date;

import jp.co.acroquest.endosnipe.web.dashboard.entity.AlarmNotifyEntity;

/**
 * AlarmEntityのComparatorクラスです。
 * @author fujii
 *
 */
public class AlarmEntityComparator implements Comparator<AlarmNotifyEntity>, Serializable
{
    /** シリアルID */
    private static final long serialVersionUID = 2683239014865567L;

    /**
     * {@inheritDoc}
     */
    public int compare(AlarmNotifyEntity entity1, AlarmNotifyEntity entity2)
    {
        Date date1 = entity1.timestamp;
        Date date2 = entity2.timestamp;
        if (date1.getTime() > date2.getTime())
        {
            return 1;
        }
        else if (date1.getTime() < date2.getTime())
        {
            return -1;
        }
        return 0;
    }

}
