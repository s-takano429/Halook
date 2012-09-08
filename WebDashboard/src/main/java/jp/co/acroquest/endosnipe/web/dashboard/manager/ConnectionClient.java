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

import java.util.ArrayList;
import java.util.List;

import jp.co.acroquest.endosnipe.communicator.CommunicationClient;


/**
 * DataCollector と通信するコミュニケーションクライアントのリストを保持するクラス
 * @author ochiai
 *
 */
public final class ConnectionClient
{
    /** ConnectionClientのインスタンス */
    private static ConnectionClient singleton__ = new ConnectionClient();
    
    private List<CommunicationClient> clientList_ = new ArrayList<CommunicationClient>();
    
    private ConnectionClient()
    {
        // singleton
    }
    
    /**
     * ConnectionClientのインスタンスを返す
     * @return ConnectionClientのインスタンス
     */
    public static ConnectionClient getInstance()
    {
        return singleton__;
    }
    
    /**
     * コミュニケーションクライアントのリストを返す
     * @return コミュニケーションクライアントのリスト
     */
    public List<CommunicationClient> getClientList()
    {
        return this.clientList_;
    }
}
