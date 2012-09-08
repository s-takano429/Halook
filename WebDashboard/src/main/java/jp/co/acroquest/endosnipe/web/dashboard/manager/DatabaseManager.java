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

import java.util.List;
import java.util.Map;

import jp.co.acroquest.endosnipe.web.dashboard.config.AgentSetting;
import jp.co.acroquest.endosnipe.web.dashboard.config.DataBaseConfig;
import jp.co.acroquest.endosnipe.web.dashboard.listener.javelin.JavelinNotifyListener;

/**
 * DBを管理するクラス
 * @author fujii
 *
 */
public final class DatabaseManager
{
    /** イスタンス */
    private static DatabaseManager instance__ = new DatabaseManager();

    /** データベース名 */
    private String                 dbName_;

    /** データベースの設定オブジェクト */
    private DataBaseConfig         dbConfig_;

    /**
     * インスタンス化を阻止するプライベートコンストラクタ。
     */
    private DatabaseManager()
    {
        // Do Nothing.
    }

    /**
     * インスタンスを取得します。
     * @return {@link DatabaseManager}オブジェクト
     */
    public static DatabaseManager getInstance()
    {
        return instance__;
    }

    /**
     * データベース名を取得する。
     * @return データベース名
     */
    public String getDBName()
    {
        return this.dbName_;
    }

    /**
     * データベース名を設定する。
     * @param dbName データベース名
     */
    public void setDBName(String dbName)
    {
        this.dbName_ = dbName;
    }

    /**
     * DataBaseの設定オブジェクトを保持します。
     * @param dbConfig DataBaseの設定オブジェクト
     */
    public void setDataBaseConfig(DataBaseConfig dbConfig)
    {
        this.dbConfig_ = dbConfig;
    }

    /**
     * DataBaseの設定情報を取得します。
     * @return DataBaseの設定情報
     */
    public DataBaseConfig getDataBaseConfig()
    {
        return this.dbConfig_;
    }

    /**
     * 指定したエージェントIDに対応するデータベース名を取得します。
     * @param agentId エージェントID
     * @return 指定したエージェントIDに対応するデータベース名
     */
    public String getDataBaseName(int agentId)
    {
        if (this.dbConfig_ == null)
        {
            return null;
        }

        if ("server".equals(dbConfig_.getConnectionMode()))
        {
            for (Map.Entry<String, Integer> agentInfo : JavelinNotifyListener.getDatabaseNameMap_().entrySet())
            {
                if (agentInfo.getValue() == agentId)
                {
                    return agentInfo.getKey();
                }
            }
            return null;

        }
        else
        {

            List<AgentSetting> agentSettings = this.dbConfig_.getAgentSettingList();

            if (agentSettings.size() < agentId)
            {
                return null;
            }
            AgentSetting setting = agentSettings.get(agentId - 1);
            return setting.databaseName;
        }
    }

}
