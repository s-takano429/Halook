/*
 * Copyright (c) 2012 Acroquest Technology Co., Ltd. All Rights Reserved.
 * Please read the associated COPYRIGHTS file for more details.
 *
 * THE SOFTWARE IS PROVIDED BY Acroquest Technology Co., Ltd., WITHOUT
 * WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDER BE LIABLE FOR ANY
 * CLAIM, DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
 * OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */
package jp.co.acroquest.endosnipe.web.dashboard.manager;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.acroquest.endosnipe.web.dashboard.config.AlarmSetting;
import jp.co.acroquest.endosnipe.web.dashboard.config.MeasurementSetting;
import jp.co.acroquest.endosnipe.web.dashboard.config.ResourceAlarmSetting;

import org.wgp.manager.WgpDataManager;

/**
 * イベントを管理するシングルトンです。
 * @author fujii
 *
 */
public final class EventManager
{
    /** シングルトンインスタンス */
    private static EventManager instance__ = new EventManager();

    private final Map<String, MeasurementSetting> clientMap_ =
                                                               new ConcurrentHashMap<String, MeasurementSetting>();

    /** アラーム通知を行うクライアント設定 */
    private final Map<String, AlarmSetting> alarmClientMap_ =
                                                              new ConcurrentHashMap<String, AlarmSetting>();

    /** 閾値超過アラーム通知を行うクライアント設定 */
    private final Map<String, ResourceAlarmSetting> resourceAlarmMap_ =
                                                                        new ConcurrentHashMap<String, ResourceAlarmSetting>();

    /** WGPDataManager */
    private WgpDataManager wgpDataManager;

    /** ResourceSender */
    private ResourceSender resourceSender;

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
    public MeasurementSetting getMeasurementSettings(final String clientId)
    {
        return this.clientMap_.get(clientId);
    }

    /**
     * クライアントの計測項目情報を設定します。
     * @param clientId クライアントID
     * @param setting 計測項目情報
     */
    public void addMeasurementSetting(final String clientId, final MeasurementSetting setting)
    {
        synchronized (this.clientMap_)
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
    public void removeClientSetting(final String clientId)
    {
        synchronized (this.clientMap_)
        {
            this.clientMap_.remove(clientId);
        }
    }

    /**
     * クライアントのアラーム通知情報を取得します。
     * @param clientId クライアントID
     * @return クライアントのアラーム通知情報
     */
    public AlarmSetting getAlarmSetting(final String clientId)
    {
        return this.alarmClientMap_.get(clientId);
    }

    /**
     * クライアントのアラーム通知情報を設定します。
     * @param clientId クライアントID
     * @param setting アラーム通知情報
     */
    public void addAlarmSetting(final String clientId, final AlarmSetting setting)
    {
        synchronized (this.alarmClientMap_)
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
    public void removeAlarmSetting(final String clientId)
    {
        synchronized (this.alarmClientMap_)
        {
            this.alarmClientMap_.remove(clientId);
        }
    }

    /**
     * 閾値超過アラーム通知情報を取得します。
     * @param clientId クライアントID
     * @return クライアントの閾値超過アラーム通知情報
     */
    public ResourceAlarmSetting getResourceAlarmSetting(final String clientId)
    {
        return this.resourceAlarmMap_.get(clientId);
    }

    /**
     * 閾値超過アラーム通知情報を設定します。
     * @param clientId クライアントID
     * @param setting 閾値超過アラーム通知情報
     */
    public void addResourceAlarmSetting(final String clientId, final ResourceAlarmSetting setting)
    {
        synchronized (this.resourceAlarmMap_)
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
    public void removeResourceAlarmSetting(final String clientId)
    {
        synchronized (this.resourceAlarmMap_)
        {
            this.resourceAlarmMap_.remove(clientId);
        }
    }

    public void setWgpDataManager(final WgpDataManager wgpDataManager)
    {
        this.wgpDataManager = wgpDataManager;
    }

    public WgpDataManager getWgpDataManager()
    {
        return this.wgpDataManager;
    }

    public void setResourceSender(final ResourceSender resourceSender)
    {
        this.resourceSender = resourceSender;
    }

    public ResourceSender getResourceSender()
    {
        return this.resourceSender;
    }

}
