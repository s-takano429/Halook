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
package jp.co.acroquest.endosnipe.web.dashboard.dto;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import jp.co.acroquest.endosnipe.web.dashboard.constants.LogMessageCodes;
import jp.co.acroquest.endosnipe.common.logger.ENdoSnipeLogger;

import org.apache.catalina.comet.CometEvent;
import org.apache.catalina.comet.CometEvent.EventType;

/**
 * コメットイベントのラッパークラスです。
 * @author fujii
 *
 */
public class CometEventWrapper
{
    /** ロガー */
    private static final ENdoSnipeLogger LOGGER =
                                                  ENdoSnipeLogger.getLogger(CometEventWrapper.class);

    private HttpServletResponse response_;

    private CometEvent event_;

    /**
     * コンストラクタです。
     * @param event {@link CometEvent}オブジェクト
     * @param response {@link HttpServletResponse}オブジェクト
     */
    public CometEventWrapper(CometEvent event, HttpServletResponse response)
    {
        this.event_ = event;
        this.response_ = response;
    }

    /**
     * クローズ処理を行う。
     */
    public void close()
    {
        try
        {
            this.event_.close();
        }
        catch (IOException ex)
        {
            LOGGER.log(LogMessageCodes.COMET_ERROR, ex);
        }
        catch (IllegalStateException ex)
        {
            LOGGER.log(LogMessageCodes.COMET_ERROR, ex);
        }
    }

    /**
     * イベントタイプを取得します。
     * @return イベントタイプ(BEGIN,READ,END,ERROR)
     */
    public EventType getEventType()
    {
        return this.event_.getEventType();
    }

    /**
     * レスポンスを取得します。
     * @return イベントタイプ(BEGIN,READ,END,ERROR)
     */
    public HttpServletResponse getResponse()
    {
        return this.response_;
    }

    /**
     * レスポンスが有効かどうかを返します。
     * @return レスポンスが有効な場合はtrue、そうでない場合はfalse
     */
    public boolean isValidResponse()
    {
        boolean valid = true;
        try
        {
            this.event_.getHttpServletResponse();
        }
        catch (Exception ex)
        {
            LOGGER.log(LogMessageCodes.COMET_ERROR, ex);
            valid = false;
        }
        return valid;
    }

}
