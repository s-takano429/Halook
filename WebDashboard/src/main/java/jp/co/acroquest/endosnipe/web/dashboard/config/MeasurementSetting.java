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

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * 計測項目の設定オブジェクトです。
 * @author fujii
 *
 */
public class MeasurementSetting
{
    /** グラフごとの計測項目 */
    private Map<Integer, Map<Integer, Map<Integer, String>>> graphMap_      =
                                                                              new HashMap<Integer, Map<Integer, Map<Integer, String>>>();

    /** 自動通知を行うかどうかを保存するMap */
    private Map<Integer, Boolean>                            autoNotifyMap_ =
                                                                              new HashMap<Integer, Boolean>();

    /**
     * エージェント毎の計測項目情報を取得します。
     * @return エージェント毎の計測項目情報
     */
    public Map<Integer, Map<Integer, Map<Integer, String>>> getGraphMap()
    {
        return Collections.unmodifiableMap(this.graphMap_);
    }

    /**
     * 指定したグラフIDに対応するエージェントの計測項目をMapとして取得します。
     * @param graphId グラフID
     * @return グラフ毎の計測項目
     */
    public Map<Integer, Map<Integer, String>> getAgentMap(Integer graphId)
    {
        return this.graphMap_.get(graphId);
    }

    /**
     * 計測項目を追加します。
     * @param graphId 通知先グラフID
     * @param agentId 通知要求エージェントID
     * @param measurementTypes 通知要求計測IDのリスト
     */
    public void addMeasurementType(Integer graphId, Integer agentId,
            List<Integer> measurementTypes, String itemName)
    {
        // グラフの情報が存在しない場合
        if (this.graphMap_ == null)
        {
            this.graphMap_ = new HashMap<Integer, Map<Integer, Map<Integer, String>>>();
        }
        Map<Integer, Map<Integer, String>> agentMap = this.graphMap_.get(graphId);

        // 通知要求エージェントが存在しない場合
        if (agentMap == null)
        {
            agentMap = new HashMap<Integer, Map<Integer, String>>();
            this.graphMap_.put(graphId, agentMap);
        }
        Map<Integer, String> measurementMap = agentMap.get(agentId);

        // 計測項目が存在しない場合
        if (measurementMap == null)
        {
            measurementMap = new TreeMap<Integer, String>();
            agentMap.put(agentId, measurementMap);
        }
        for (Integer measurementType : measurementTypes)
        {
            measurementMap.put(measurementType, itemName);

        }
    }

    /**
     * 計測項目を追加します。
     * @param graphId 通知先グラフID
     * @param agentId 通知要求エージェントID
     * @param measurementType 通知要求計測ID
     */
    public void addMeasurementType(Integer graphId, Integer agentId, Integer measurementType, String itemName)
    {
        List<Integer> measurementTypeList = new ArrayList<Integer>();
        measurementTypeList.add(measurementType);
        addMeasurementType(graphId, agentId, measurementTypeList, itemName);
    }

    /**
     *  通知先グラフIDを削除します。
     * @param graphId 通知先グラフID
     */
    public void removeGraphId(Integer graphId)
    {
        // 通知要求エージェントが存在しない場合
        if (this.graphMap_ != null)
        {
            this.graphMap_.remove(graphId);
            this.autoNotifyMap_.remove(graphId);
        }
    }

    /**
     * グラフIDが自動設定を行うかどうかを設定します。
     * @param graphId グラフID
     * @param autoNotify 自動設定を行うかどうか
     */
    public void setAutoNotify(Integer graphId, boolean autoNotify)
    {
        this.autoNotifyMap_.put(graphId, autoNotify);
    }

    /**
     * グラフIDが自動設定を行うかどうかを返します。
     * @param graphId グラフID
     * @return 自動設定を行う場合、<code>true</code>
     */
    public boolean isAutoNotify(Integer graphId)
    {
        return this.autoNotifyMap_.get(graphId).booleanValue();
    }

}
