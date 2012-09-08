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
package jp.co.acroquest.endosnipe.web.dashboard.exception;

/**
 * サービス初期化エラーのための例外クラスです。<br />
 * 
 * @author y-komori
 */
public class InitializeException extends Exception
{
    private static final long serialVersionUID = -1114506435525447808L;

    /**
     * {@link InitializeException} を構築します。<br />
     * 
     * @param messageCode メッセージコード
     * @param args メッセージ引数
     */
    public InitializeException(final String messageCode, final Object... args)
    {
    	//TODO this(MessageFormatter.getMessage(messageCode, args));
    	this("");
    }

    /**
     * {@link InitializeException} を構築します。<br />
     * 
     * @param message 例外メッセージ
     */
    private InitializeException(final String message)
    {
        super(message);
    }

    /**
     * {@link InitializeException} を構築します。<br />
     * 
     * @param cause 原因となる例外オブジェクト
     */
    public InitializeException(final Throwable cause)
    {
        super(cause);
    }
}
