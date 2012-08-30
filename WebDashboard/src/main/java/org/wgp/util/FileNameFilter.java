/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
package org.wgp.util;

import java.io.File;
import java.io.FileFilter;

/**
 * 繝輔ぃ繧､繝ｫ蜷阪↓繧医ｋ繝輔ぅ繝ｫ繧ｿ繝ｼ繧定｡後↑縺�け繝ｩ繧ｹ
 *
 */
public class FileNameFilter implements FileFilter
{

    /** 繝輔ぃ繧､繝ｫ蜷阪�謗･鬆ｭ霎�*/
    private String startWidthPrefix;

    /** 繝輔ぃ繧､繝ｫ蜷阪�謗･蟆ｾ霎�*/
    private String endWidthSuffix;

    /** 繝輔ぃ繧､繝ｫ縺ｮ諡｡蠑ｵ蟄�*/
    private String extension;

    /**
     * 繝�ヵ繧ｩ繝ｫ繝医さ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ(菴ｿ逕ｨ縺励↑縺�
     */
    private FileNameFilter()
    {
        super();
    }

    /**
     * 繧ｳ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ
     * @param startWidth 繝輔ぃ繧､繝ｫ蜷肴磁鬆ｭ霎�
     * @param endWidth 繝輔ぃ繧､繝ｫ蜷肴磁蟆ｾ霎�
     * @param extension 繝輔ぃ繧､繝ｫ諡｡蠑ｵ蟄�
     */
    public FileNameFilter(String startWidth, String endWidth, String extension)
    {
        this.startWidthPrefix = startWidth;
        this.endWidthSuffix = endWidth;
        this.extension = extension;
    }

    public boolean accept(File pathname)
    {

        boolean startWidthResult = true;
        boolean endWidthResult = true;
        boolean extensionResult = true;

        if (pathname == null)
        {
            return false;
        }
        String fileName = pathname.getName();

        // 謗･鬆ｭ霎槫愛螳�
        if (this.startWidthPrefix != null && this.startWidthPrefix.length() > 0)
        {
            startWidthResult = fileName.startsWith(this.startWidthPrefix);
            if (!startWidthResult)
            {
                return false;
            }
        }

        // 諡｡蠑ｵ蟄舌�.縲阪〒繝輔ぃ繧､繝ｫ蜷阪ｒ蛹ｺ蛻�ｋ
        String[] fileNameTokenArray = fileName.split("\\.");
        int fileNameTokenLength = fileNameTokenArray.length;

        // 謗･蟆ｾ霎槫愛螳�
        if (this.endWidthSuffix != null && this.endWidthSuffix.length() > 0)
        {
            int endWidthIndex = 0;

            // 諡｡蠑ｵ蟄舌�譛臥┌縺ｫ繧医ｊ遒ｺ隱榊ｯｾ雎｡繧､繝ｳ繝�ャ繧ｯ繧ｹ繧貞､峨∴繧�
            if (fileNameTokenLength > 1)
            {
                endWidthIndex = fileNameTokenLength - 2;
            }
            endWidthResult = fileNameTokenArray[endWidthIndex].endsWith(this.endWidthSuffix);
            if (!endWidthResult)
            {
                return false;
            }
        }

        // 諡｡蠑ｵ蟄仙愛螳�
        if (this.extension != null && this.extension.length() > 0)
        {
            // 諡｡蠑ｵ蟄舌′辟｡縺��蜷医�蠖薙※縺ｯ縺ｾ繧峨↑縺�ｂ縺ｮ縺ｨ縺吶ｋ縲�
            if (fileNameTokenLength >= 2)
            {
                extensionResult = fileNameTokenArray[fileNameTokenLength - 1].equals(this.extension);

                if (!extensionResult)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        return true;
    }
}
