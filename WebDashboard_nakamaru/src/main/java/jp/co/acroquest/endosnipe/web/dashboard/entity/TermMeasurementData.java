package jp.co.acroquest.endosnipe.web.dashboard.entity;

import java.util.List;

/**
 * �G�[�W�F���g���̌v�����ڂ�ێ�����I�u�W�F�N�g
 * @author fujii
 *
 */
public class TermMeasurementData
{
    /** �ʒm�v���G�[�W�F���gID */
    public int                             agent_id;

    /** �v�����ڏڍ� */
    public List<TermMeasurementDetailData> measurement_items;

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "TermMeasurementData [agent_id=" + agent_id
                + ", measurement_items=" + measurement_items.toString() + "]";
    }

}
