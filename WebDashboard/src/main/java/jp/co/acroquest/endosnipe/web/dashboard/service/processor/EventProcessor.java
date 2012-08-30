package jp.co.acroquest.endosnipe.web.dashboard.service.processor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * イベントを処理するオブジェクトの処理インタフェースです。
 * @author fujii
 *
 */
public interface EventProcessor 
{
    /**
     * イベント処理を行います。
     * @param request {@link HttpServletRequest}オブジェクト
     * @param response {@link HttpServletResponse}オブジェクト
     */
    void process(HttpServletRequest request, HttpServletResponse response);
}
