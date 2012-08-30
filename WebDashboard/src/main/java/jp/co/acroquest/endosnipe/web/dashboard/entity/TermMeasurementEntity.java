package jp.co.acroquest.endosnipe.web.dashboard.entity;

import java.util.Date;
import java.util.List;

import net.arnx.jsonic.JSONHint;

/**
 * �v�����ڎ����ʒm�J�n�v���I�u�W�F�N�g
 * @author fujii
 *
 */
public class TermMeasurementEntity
{
    /** �C�x���gID */
    public long                      event_id;

    /** �O���tID */
    public long                      graph_id;

    /** �v�������̃��X�g */
    @JSONHint(format="yyyy/MM/dd HH:mm:ss")
    public List<Date>                timestamps;

    /** �G�[�W�F���g���̌v���f�[�^ */
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
