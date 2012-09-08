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
package jp.co.acroquest.endosnipe.web.dashboard.service.processor;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.co.acroquest.endosnipe.common.logger.ENdoSnipeLogger;
import jp.co.acroquest.endosnipe.web.dashboard.config.DataBaseConfig;
import jp.co.acroquest.endosnipe.web.dashboard.constants.EventConstants;
import jp.co.acroquest.endosnipe.web.dashboard.constants.LogMessageCodes;
import jp.co.acroquest.endosnipe.web.dashboard.listener.javelin.JavelinNotifyListener;
import jp.co.acroquest.endosnipe.web.dashboard.manager.DatabaseManager;
import net.arnx.jsonic.JSON;

/**
 * エージェントIDを取得する処理です。
 * @author kajiwara
 */
public class AgentNotifyProcessor implements EventProcessor, EventConstants
{
    /** ロガー */
    private static final ENdoSnipeLogger LOGGER =
                                                  ENdoSnipeLogger.getLogger(AgentNotifyProcessor.class);

    /**
     * {@inheritDoc}
     */
    public void process(HttpServletRequest request, HttpServletResponse response)
    {
        Map<String, Integer> databaseInfoMap = JavelinNotifyListener.getDatabaseNameMap_();
        List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();

        for (Map.Entry<String, Integer> databaseInfo : databaseInfoMap.entrySet())
        {
            Map<String, String> result = new HashMap<String, String>();
            result.put("serverKind",databaseInfo.getKey());
            result.put("agentId", databaseInfo.getValue().toString());

            resultList.add(result);
        }

        // connect modeを追加
        Map<String, String> mode = new HashMap<String, String>();
        DatabaseManager manager = DatabaseManager.getInstance();
        DataBaseConfig dbConfig = manager.getDataBaseConfig();

        mode.put("connectMode", dbConfig.getConnectionMode());
        resultList.add(mode);

        PrintWriter writer = null;
        try
        {
            String result = JSON.encode(resultList);
            System.out.println(result);
            writer = response.getWriter();
            writer.write(result);
            writer.flush();
            writer.close();
        }
        catch (IOException ex)
        {
            LOGGER.log(LogMessageCodes.COMMUNICATION_ERROR);
        }
        finally
        {
            if (writer != null)
            {
                writer.close();
            }
        }

    }

}
