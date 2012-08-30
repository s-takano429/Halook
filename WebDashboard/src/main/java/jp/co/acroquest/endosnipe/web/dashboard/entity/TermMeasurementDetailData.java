package jp.co.acroquest.endosnipe.web.dashboard.entity;

import java.util.List;

/**
 * �v�����ڏڍ׃I�u�W�F�N�g
 * @author fujii
 *
 */
public class TermMeasurementDetailData
{
    /** �v������ID */
    public long         measurement_id = -1;

    /** ���ږ� */
    public String      item_name;

    /** �v�����ڃ^�C�v */
    public int          measurement_type;

    /** �v�����ڒl(String�ɕϊ����Ďg������) */
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
