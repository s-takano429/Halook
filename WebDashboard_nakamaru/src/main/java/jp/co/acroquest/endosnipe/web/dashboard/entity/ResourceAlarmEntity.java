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
package jp.co.acroquest.endosnipe.web.dashboard.entity;

/**
 * 臒l���߃A���[���ʒm�I�u�W�F�N�g
 * @author fujii
 *
 */
public class ResourceAlarmEntity
{
    /** �C�x���gID */
    public long event_id;

    /** �G�[�W�F���gID */
    public int agent_id;

    /** �A���[���̃��x�� */
    public int[] alarm_levels;

    /** �A���[���̎�� */
    public int[] alarm_types;

    /** �v��ID */
    public int[] measurement_types;

}
