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
