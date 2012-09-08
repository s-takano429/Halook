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
package jp.co.acroquest.endosnipe.web.dashboard.config;

import java.util.HashSet;
import java.util.Set;

/**
 * アラーム通知設定のオブジェクトです。
 * @author fujii
 *
 */
public class AlarmSetting
{
    /** 通知したかどうか */
    private boolean      notify_;

    /** エージェントIDを保存するSet */
    private Set<Integer> agentSet_ = new HashSet<Integer>();

    /** 通知要求レベル */
    private int          alarmLevel_;

    /**
     * アラーム通知を行うかどうかを返します。
     * @return アラーム通知を行う場合、<code>true</code>
     */
    public boolean isNotify()
    {
        return this.notify_;
    }

    /**
     * アラーム通知を行うかどうかを返します。
     * @param notify アラーム通知を行う場合、<code>true</code>
     */
    public void setNotify(boolean notify)
    {
        this.notify_ = notify;
    }

    /**
     * アラーム通知対象のエージェントのSetを返します。
     * @return アラーム通知対象のエージェントのSet
     */
    public Set<Integer> getAgentSet()
    {
        return this.agentSet_;
    }

    /**
     * アラーム通知対象のエージェントを設定します。
     * @param agent アラーム通知対象のエージェント
     */
    public void addAgent(Integer agent)
    {
        this.agentSet_.add(agent);
    }

    /**
     * 指定したエージェントを含むかどうか。
     * @param agentId エージェントID
     * @return 指定したエージェントIDを含む場合、<code>true</code>
     */
    public boolean containAgent(Integer agentId)
    {
        return this.agentSet_.contains(agentId);
    }

    /**
     * 通知要求レベルを取得します。
     * @return 通知要求レベル(INFO/WARN/ERROR)
     */
    public int getAlarmLevel()
    {
        return alarmLevel_;
    }

    /**
     * 通知要求レベルを設定します。
     * @param alarmLevel 通知要求レベル(INFO/WARN/ERROR)
     */
    public void setAlarmLevel(int alarmLevel)
    {
        this.alarmLevel_ = alarmLevel;
    }

}
