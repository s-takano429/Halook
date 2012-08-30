package jp.co.acroquest.endosnipe.web.dashboard.entity;

/**
 * 計測項目詳細オブジェクト
 * @author fujii
 *
 */
public class MeasurementData
{
    /** タイムスタンプ */
    public long                  timestamp;

    /** 計測項目詳細 */
    public MeasurementDetailData measurement_item;

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "MeasurementData [measurement_item="
                + measurement_item.toString() + ", timestamp=" + timestamp
                + "]";
    }

}
