package jp.co.acroquest.endosnipe.web.dashboard.entity;

import java.util.Arrays;

/**
 * 計測項目自動通知開始要求オブジェクト
 * @author fujii
 *
 */
public class MeasurementEntity
{
    /** イベントID */
    public long  event_id;

    /** グラフID */
    public int   graph_id;

    /** サーバID */
    public int[] server_ids;

    /** 計測値の値 */
    public int[] measurement_types;

    /** 通知間隔 */
    public long  interval;

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "MeasurementEntity [event_id=" + event_id + ", graph_id="
                + graph_id + ", server_ids=" + Arrays.toString(server_ids)
                + ", measurement_types=" + Arrays.toString(measurement_types)
                + ", interval=" + interval + "]";
    }

}
