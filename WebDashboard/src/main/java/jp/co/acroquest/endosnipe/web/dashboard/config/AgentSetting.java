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

/**
 * Javelin エージェントへの接続設定を保持するクラスです。<br />
 * 
 * @author fujii
 */
public class AgentSetting
{
    /** 接続先ポート番号のデフォルト値 */
    private static final int    DEF_PORT                              = 18000;

    /** BottleneckEye からの接続待ち受けポート番号のデフォルト値 */
    private static final int    DEF_ACCEPT_PORT                       = DEF_PORT + 10000;

    /** エージェント ID */
    public int                  agentId;

    /** データベース名 */
    public String               databaseName;

    /** 接続先ホスト名 */
    public String               hostName;

    /** 接続先ポート番号 */
    public int                  port                                  = DEF_PORT;

    /** BottleneckEye からの接続待ち受けホスト名 */
    public String               acceptHost;

    /** BottleneckEye からの接続待ち受けポート番号 */
    public int                  acceptPort                            = DEF_ACCEPT_PORT;

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString()
    {
        return "Host:" + hostName + " Port:" + port;
    }

}
