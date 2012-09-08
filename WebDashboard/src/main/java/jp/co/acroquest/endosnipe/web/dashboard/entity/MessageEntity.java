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
package jp.co.acroquest.endosnipe.web.dashboard.entity;

/**
 * クライアントに送信するメッセージのエンティティです。
 * @author fujii
 *
 */
public class MessageEntity
{
    /** メッセージ生成時刻 */
    private long   receiveTime_;

    /** メッセージ */
    private String message_;

    /**
     * コンストラクです。
     * @param message メッセージ
     */
    public MessageEntity(String message)
    {
        this.message_ = message;
        this.receiveTime_ = System.currentTimeMillis();
    }
    
    /**
     * メッセージを取得します。
     * @return メッセージ
     */
    public String getMessage()
    {
        return this.message_;
    }
    
    /**
     * メッセージがタイムアウトしているかどうかを返します。
     * @param now 現在時刻
     * @param timeout タイムアウト値
     * @return 現在時刻が、メッセージ生成時刻とタイムアウト値を超えるときに、<code>true</code>
     */
    public boolean isTimeout(long now, long timeout)
    {
        if (this.receiveTime_ + timeout < now)
        {
            return true;
        }
        return  false;
    }

}
