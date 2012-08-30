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
import java.util.ArrayList;
import java.util.List;

/**
 * ファイルパスに関する処理を行うユーティリティクラス
 *
 */
public class FilePathUtil
{

    /**
     * デフォルトコンストラクタ
     */
    private FilePathUtil()
    {
        super();
    }

    /**
     * ルートディレクトリ名として指定したディレクトリ配下のパスを
     * 文字列として返却する。(最下層からの検索)
     * 
     * @param rootDirectoryName ルートディレクトリ名
     * @param file ファイル名
     * @return　ファイルパス名
     */
    public static String getRootPathFromEnd(String rootDirectoryName, File file)
    {

        if (rootDirectoryName == null || file == null)
        {
            return null;
        }

        List<String> directoryList = new ArrayList<String>();
        do
        {
            // ファイル名を取得してリストに加える
            directoryList.add(file.getName());

            // 一つ上の階層に移動する
            file = file.getParentFile();
        }
        while (file != null && !rootDirectoryName.equals(file.getName()));

        int directoryListSize = directoryList.size();
        StringBuilder builder = new StringBuilder();

        // 取得したファイル名のリストを基にパスを構築する。
        for (int direcotyListIndex = directoryListSize - 1; direcotyListIndex >= 0; direcotyListIndex--)
        {
            builder.append(directoryList.get(direcotyListIndex));

            if (direcotyListIndex > 0)
            {
                builder.append("/");
            }
        }
        return builder.toString();
    }

    /**
     * 指定したフォルダ配下にあるファイルのうち、filterで指定したファイルを取得する。
     * @param folder　フォルダ名
     * @param filter フィルタ
     * @return フォルダ配下のファイル
     */
    public static List<File> getAllFilePath(File folder, FileNameFilter filter)
    {
        File[] childJsFile = folder.listFiles(filter);
        List<File> childFileList = new ArrayList<File>();
        if (childJsFile != null)
        {
            for (File jsFile : childJsFile) {
                childFileList.add(jsFile);
            }
        }

        File[] childFolders = folder.listFiles();
        if (childFolders == null)
        {
            return childFileList;
        }

        for (File childFolder : childFolders)
        {
            if (childFolder.isDirectory())
            {
                List<File> granChildFileList = getAllFilePath(childFolder,
                        filter);
                childFileList.addAll(new ArrayList<File>(granChildFileList));
            }
        }

        return childFileList;
    }
}
