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
package jp.co.acroquest.endosnipe.web.dashboard.servlet;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.co.acroquest.endosnipe.common.logger.ENdoSnipeLogger;
import jp.co.acroquest.endosnipe.web.dashboard.constants.EventConstants;
import jp.co.acroquest.endosnipe.web.dashboard.constants.LogMessageCodes;

/**
 * レポート出力用のサーブレットです。
 * @author fujii
 *
 */
public class ReportServlet extends HttpServlet
{

    /** ロガー */
    private static final ENdoSnipeLogger LOGGER           =
                                                            ENdoSnipeLogger.getLogger(ReportServlet.class);

    /** バッファのサイズ */
    private static final int             BUFFER_SIZE      = 1024;

    /** シリアルID */
    private static final long            serialVersionUID = 2070325848334763894L;

    /** ダウンロード用フォルダ */
    private String                       downloadDirectory_;

    /** ファイルのセパレータ */
    private static final String          FOLDER_SEPARATOR = File.separator;

    /**
     * {@inheritDoc}
     */
    public void init()
        throws ServletException
    {
        ServletConfig servletConfig = getServletConfig();
        this.downloadDirectory_ = servletConfig.getInitParameter("report.directory");

    }

    /**
     * {@inheritDoc}
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    {
        doRequest(request, response);
    }

    /**
     * {@inheritDoc}
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
    {
        doRequest(request, response);
    }

    /**
     * クライアントからのレポート出力ダウンロードを受信するためのサーブレットです。
     * @param request {@link HttpServletRequest}オブジェクト
     * @param response {@link HttpServletResponse}オブジェクト
     */
    public void doRequest(HttpServletRequest request, HttpServletResponse response)
    {
        String agentId = request.getParameter(EventConstants.AGENT_ID);
        if (agentId == null)
        {
            LOGGER.log(LogMessageCodes.UNKNOWN_REPORT_AGENT_ID);
            return;
        }

        String fileName = request.getParameter(EventConstants.REPORT_FILE_NAME);
        if (fileName == null)
        {
            LOGGER.log(LogMessageCodes.UNKNOWN_REPORT_FILE_NAME);
            return;
        }

        //パストラバーサルチェック
        boolean isCorrectFileName = RegexFileName(fileName);
        if (isCorrectFileName)
        {

            String reportDirectory = null;
            if (this.downloadDirectory_.endsWith("/") == false
                    && this.downloadDirectory_.endsWith("\\") == false)
            {
                reportDirectory = this.downloadDirectory_ + FOLDER_SEPARATOR;
            }
            String reportFileName = reportDirectory + agentId + FOLDER_SEPARATOR + fileName;
            try
            {
                printOutFile(request, response, reportFileName, fileName);
            }
            catch (IOException ex)
            {
                // Do Nothing.
            }
        }
        else
        {
            //ファイルにアクセスできない旨を表示する。
            response.setContentType("text/html;charset=Shift_JIS");
            try
            {
                PrintWriter httpWriter = response.getWriter();
                httpWriter.println("<HTML><HEAD><TITLE>ENdoSnipeダッシュボード</TITLE></HEAD>");
                httpWriter.println("<BODY>");
                httpWriter.println("<p>ファイルにアクセスできません。</p>");
                httpWriter.println("</BODY><HTML>");
            }
            catch (IOException ex)
            {
                // Do Nothing.
            }
        }
    }

    private void printOutFile(HttpServletRequest req, HttpServletResponse res, String filePath,
            String fileName)
        throws IOException
    {
        OutputStream os = res.getOutputStream();
        try
        {
            FileInputStream hFile = new FileInputStream(filePath);
            BufferedInputStream bis = new BufferedInputStream(hFile);

            //レスポンス設定  
            res.setContentType("application/octet-stream");
            res.setHeader("Content-Disposition", "filename=\"" + fileName + "\"");

            int len = 0;
            byte[] buffer = new byte[BUFFER_SIZE];
            while ((len = bis.read(buffer)) >= 0)
            {
                os.write(buffer, 0, len);
            }

            bis.close();
        }
        catch (IOException ex)
        {
            printOutNotFound(res);
        }
        finally
        {

            if (os != null)
            {
                try
                {
                    os.close();
                }
                catch (IOException ex)
                {
                    LOGGER.log(LogMessageCodes.IO_ERROR);

                }
                finally
                {
                    os = null;
                }
            }
        }
    }

    /**
     * ファイルが見つからない場合
     * @param res {@link HttpServletResponse}
     */
    private void printOutNotFound(HttpServletResponse res)
    {

        try
        {
            OutputStream toClient = res.getOutputStream();
            res.setContentType("text/html;charset=Shift_JIS");
            toClient.write("File not found".getBytes());
            toClient.close();
        }
        catch (IOException ex)
        {
            LOGGER.log(LogMessageCodes.IO_ERROR);
        }
    }

    /**
     * パストラバーサル用の文字列変換処理。
     * 
     * @param beforeFileName 変換前の文字列
     * @return 正規表現を用いて列変換した文字列
     */
    private boolean RegexFileName(String beforeFileName)
    {
        String tmpFileName = beforeFileName.replace("\\", "/");
        tmpFileName = tmpFileName.replace("/../", "/");
        tmpFileName = tmpFileName.replace("/./", "/");
        String afterFileName = tmpFileName.replace("//", "/");
        if (beforeFileName.equals(afterFileName))
        {
            //../が存在している場合と、上記置換により文字列が変化した場合はfalseとする。
            if (afterFileName.indexOf("../") == -1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }

}
