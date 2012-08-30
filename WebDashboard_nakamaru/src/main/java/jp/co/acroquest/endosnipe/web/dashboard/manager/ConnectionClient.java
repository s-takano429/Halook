package jp.co.acroquest.endosnipe.web.dashboard.manager;

import java.util.ArrayList;
import java.util.List;

import jp.co.smg.endosnipe.communicator.CommunicationClient;


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
