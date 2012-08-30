package jp.co.acroquest.endosnipe.web.dashboard.manager;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.acroquest.endosnipe.web.dashboard.config.AlarmSetting;
import jp.co.acroquest.endosnipe.web.dashboard.config.MeasurementSetting;
import jp.co.acroquest.endosnipe.web.dashboard.config.ResourceAlarmSetting;

/**
 * イベントを管理するシングルトンです。
 * @author fujii
 *
 */
public final class EventManager
{
    /** シングルトンインスタンス */
    private static EventManager               instance__        = new EventManager();

    private Map<String, MeasurementSetting>   clientMap_        =
                                                                  new ConcurrentHashMap<String, MeasurementSetting>();

    /** アラーム通知を行うクライアント設定 */
    private Map<String, AlarmSetting>         alarmClientMap_   =
                                                                  new ConcurrentHashMap<String, AlarmSetting>();

    /** 閾値超過アラーム通知を行うクライアント設定 */
    private Map<String, ResourceAlarmSetting> resourceAlarmMap_ =
                                                                  new ConcurrentHashMap<String, ResourceAlarmSetting>();

    /**
     * インスタンス化を阻止するプライベートコンストラクタです。
     */
    private EventManager()
    {
        // Do Nothing.
    }

    /**
     * シングルトンインスタンスを取得します。
     * @return {@link EventManager}オブジェクト
     */
    public static EventManager getInstance()
    {
        return instance__;
    }

    /**
     * クライアントの計測項目情報を取得します。
     * @param clientId クライアントID
     * @return クライアントの計測項目情報
     */
    public MeasurementSetting getMeasurementSettings(String clientId)
    {
        return this.clientMap_.get(clientId);
    }

    /**
     * クライアントの計測項目情報を設定します。
     * @param clientId クライアントID
     * @param setting 計測項目情報
     */
    public void addMeasurementSetting(String clientId, MeasurementSetting setting)
    {
        synchronized(this.clientMap_)
        {
            this.clientMap_.put(clientId, setting);
        }
    }

    /**
     * クライアント毎に保持している計測項目情報を取得します。
     * @return クライアント毎に保持している計測項目情報
     */
    public Map<String, MeasurementSetting> getCliantSettings()
    {
        return Collections.unmodifiableMap(this.clientMap_);
    }

    /**
     * クライアントの設定情報を削除します。
     * @param clientId クライアントID
     */
    public void removeClientSetting(String clientId)
    {
        synchronized(this.clientMap_)
        {
            this.clientMap_.remove(clientId);
        }
    }

    /**
     * クライアントのアラーム通知情報を取得します。
     * @param clientId クライアントID
     * @return クライアントのアラーム通知情報
     */
    public AlarmSetting getAlarmSetting(String clientId)
    {
        return this.alarmClientMap_.get(clientId);
    }

    /**
     * クライアントのアラーム通知情報を設定します。
     * @param clientId クライアントID
     * @param setting アラーム通知情報
     */
    public void addAlarmSetting(String clientId, AlarmSetting setting)
    {
        synchronized(this.alarmClientMap_)
        {
            this.alarmClientMap_.put(clientId, setting);
        }
    }

    /**
     * クライアント毎に保持しているアラーム通知情報を取得します。
     * @return クライアント毎に保持しているアラーム通知情報
     */
    public Map<String, AlarmSetting> getAlarmSettings()
    {
        return Collections.unmodifiableMap(this.alarmClientMap_);
    }

    /**
     * クライアントのアラーム通知情報を削除します。
     * @param clientId クライアントID
     */
    public void removeAlarmSetting(String clientId)
    {
        synchronized(this.alarmClientMap_)
        {
            this.alarmClientMap_.remove(clientId);
        }
    }

    /**
     * 閾値超過アラーム通知情報を取得します。
     * @param clientId クライアントID
     * @return クライアントの閾値超過アラーム通知情報
     */
    public ResourceAlarmSetting getResourceAlarmSetting(String clientId)
    {
        return this.resourceAlarmMap_.get(clientId);
    }

    /**
     * 閾値超過アラーム通知情報を設定します。
     * @param clientId クライアントID
     * @param setting 閾値超過アラーム通知情報
     */
    public void addResourceAlarmSetting(String clientId, ResourceAlarmSetting setting)
    {
        synchronized(this.resourceAlarmMap_)
        {
            this.resourceAlarmMap_.put(clientId, setting);
        }
    }

    /**
     * クライアント毎に保持している閾値超過アラーム通知情報を取得します。
     * @return クライアント毎に保持している閾値超過アラーム通知情報
     */
    public Map<String, ResourceAlarmSetting> getResourceAlarmSettings()
    {
        return Collections.unmodifiableMap(this.resourceAlarmMap_);
    }

    /**
     * クライアントの閾値超過アラーム通知情報を削除します。
     * @param clientId クライアントID
     */
    public void removeResourceAlarmSetting(String clientId)
    {
        synchronized(this.resourceAlarmMap_)
        {
            this.resourceAlarmMap_.remove(clientId);
        }
    }
}
