package jp.co.acroquest.endosnipe.web.dashboard.service.processor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.co.acroquest.endosnipe.web.dashboard.constants.EventConstants;
import jp.co.acroquest.endosnipe.web.dashboard.constants.LogMessageCodes;
import jp.co.acroquest.endosnipe.web.dashboard.manager.EventManager;
import jp.co.smg.endosnipe.common.logger.ENdoSnipeLogger;

/**
 * 計測項目自動通知終了要求を処理するクラスです。
 * クライアントがグラフ画面を閉じるときやグラフ画面から別の画面に遷移するときに呼び出されます。
 * @author fujii
 *
 */
public class AutoMeasurementEndProcessor implements EventProcessor
{
    /** ロガー */
    private static final ENdoSnipeLogger LOGGER =
                                                  ENdoSnipeLogger.getLogger(AutoMeasurementEndProcessor.class);

    /**
     * 計測項目自動通知終了要求を処理します。
     * @param request {@link HttpServletRequest}オブジェクト
     * @param response {@link HttpServletResponse}オブジェクト
     */
    public void process(HttpServletRequest request, HttpServletResponse response)
    {
        String clientId = request.getParameter(EventConstants.CLIENT_ID);

        if (clientId == null)
        {
            LOGGER.log(LogMessageCodes.NO_CLIENT_ID);
            return;
        }

        EventManager manager = EventManager.getInstance();
        manager.removeClientSetting(clientId);
    }

}
