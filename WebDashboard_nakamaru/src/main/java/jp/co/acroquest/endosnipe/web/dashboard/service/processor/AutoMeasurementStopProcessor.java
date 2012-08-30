package jp.co.acroquest.endosnipe.web.dashboard.service.processor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.co.acroquest.endosnipe.web.dashboard.config.MeasurementSetting;
import jp.co.acroquest.endosnipe.web.dashboard.constants.EventConstants;
import jp.co.acroquest.endosnipe.web.dashboard.constants.LogMessageCodes;
import jp.co.acroquest.endosnipe.web.dashboard.manager.EventManager;
import jp.co.smg.endosnipe.common.logger.ENdoSnipeLogger;

/**
 * 計測項目自動通知終了要求を処理するクラスです。
 * @author fujii
 *
 */
public class AutoMeasurementStopProcessor implements EventProcessor
{
    /** ロガー */
    private static final ENdoSnipeLogger LOGGER = ENdoSnipeLogger.getLogger(AutoMeasurementStopProcessor.class);

    /**
     * 計測項目自動通知終了要求を処理します。
     * @param request {@link HttpServletRequest}オブジェクト
     * @param response {@link HttpServletResponse}オブジェクト
     */
    public void process(HttpServletRequest request, HttpServletResponse response)
    {
        String graphIdStr = request.getParameter(EventConstants.GRAPH_ID);
        String clientId = request.getParameter(EventConstants.CLIENT_ID);

        if (graphIdStr == null)
        {
            LOGGER.log(LogMessageCodes.UNKNOWN_GRAPH_ID);
            return;
        }
        if (clientId == null)
        {
            LOGGER.log(LogMessageCodes.NO_CLIENT_ID);
            return;
        }

        Integer graphId = null;
        try
        {
            graphId = Integer.valueOf(graphIdStr);
        }
        catch (NumberFormatException ex)
        {
            LOGGER.log(LogMessageCodes.UNKNOWN_GRAPH_ID, graphId);
            return;
        }

        EventManager manager = EventManager.getInstance();
        MeasurementSetting setting = manager.getMeasurementSettings(clientId);
        if (setting == null)
        {
            return;
        }
        // 計測項目自動通知を終了します。
        setting.setAutoNotify(graphId, false);
    }

}
