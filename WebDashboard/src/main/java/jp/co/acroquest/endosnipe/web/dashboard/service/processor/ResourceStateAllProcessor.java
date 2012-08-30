/*
 * Copyright (c) 2004-2010 SMG Co., Ltd. All Rights Reserved.
 * Please read the associated COPYRIGHTS file for more details.
 *
 * THE  SOFTWARE IS  PROVIDED BY  SMG Co., Ltd., WITHOUT  WARRANTY  OF
 * ANY KIND,  EXPRESS  OR IMPLIED,  INCLUDING BUT  NOT LIMITED  TO THE
 * WARRANTIES OF  MERCHANTABILITY,  FITNESS FOR A  PARTICULAR  PURPOSE
 * AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDER BE LIABLE FOR ANY
 * CLAIM, DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
 * OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */
package jp.co.acroquest.endosnipe.web.dashboard.service.processor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.co.acroquest.endosnipe.web.dashboard.manager.ConnectionClient;
import jp.co.smg.endosnipe.communicator.CommunicationClient;
import jp.co.smg.endosnipe.communicator.entity.Header;
import jp.co.smg.endosnipe.communicator.entity.Telegram;
import jp.co.smg.endosnipe.communicator.entity.TelegramConstants;

/**
 * エージェント一覧取得要求を処理するクラスです。
 * @author ochiai
 *
 */
public class ResourceStateAllProcessor implements EventProcessor
{
    /**
     * {@inheritDoc}
     */
    public void process(HttpServletRequest request, HttpServletResponse response)
    {
        // 電文の作成
        Header header = new Header();
        header.setByteTelegramKind(TelegramConstants.BYTE_TELEGRAM_RESOURCE_ALARM);
        header.setByteRequestKind(TelegramConstants.BYTE_REQUEST_KIND_REQUEST);
        Telegram telegram = new Telegram();
        telegram.setObjHeader(header);

        // 電文のDataCollector への送信
        sendTelegram(telegram);
        
    }

    private void sendTelegram(final Telegram telegram)
    {
        // コミュニケーションクライアントのリストを取得
        ConnectionClient connectionClient = ConnectionClient.getInstance();
        List<CommunicationClient> clientList = connectionClient.getClientList(); 
        
        // リソース取得要求を送る
        for (CommunicationClient client : clientList)
        {
            client.sendTelegram(telegram);
        }
    }
}