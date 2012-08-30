package jp.co.acroquest.endosnipe.web.dashboard.entity;

import java.util.Arrays;

/**
 * 計測項目変更通知オブジェクト
 * @author fujii
 *
 */
public class MeasurementNotifyEntity
{
    /** イベントID */
    public long              event_id;

    /** グラフID */
    public int               graph_id;

    /** サーバID */
    public int[]             server_ids;

    /** 計測値の値 */
    public MeasurementData[] measurement_data;

    /**
     * 計測項目一覧を出力する処理。
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "MeasurementNotifyEntity [event_id=" + event_id + ", graph_id="
                + graph_id + ", measurement_data="
                + Arrays.toString(measurement_data) + ", server_ids="
                + Arrays.toString(server_ids) + "]";
    }

}
