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
package jp.co.acroquest.endosnipe.web.dashboard.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import jp.co.acroquest.endosnipe.data.dao.JavelinMeasurementItemDao;
import jp.co.acroquest.endosnipe.data.entity.JavelinMeasurementItem;
import jp.co.acroquest.endosnipe.web.dashboard.dto.TreeMenuDto;
import jp.co.acroquest.endosnipe.web.dashboard.manager.DatabaseManager;

import org.springframework.stereotype.Service;

/**
 * ツリーメニューに関する操作を行うクラスです。
 * 
 * @author fujii
 * 
 */
@Service
public class TreeMenuService
{
    /** ツリー階層の区切り文字 */
    private static final String TREE_SEPARATOR = "/";

    /** ツリー階層のセパレートパターン */
    private static final Pattern TREE_SEPARATE_PATTERN = Pattern.compile(TREE_SEPARATOR);

    /** 単位の区切り文字 */
    private static final String UNIT_SEPARATOR = ":";

    /**
     * 初期化を行う。
     * @return　初期描画時のツリーメニュー
     */
    public List<TreeMenuDto> initialize()
    {
        DatabaseManager dbMmanager = DatabaseManager.getInstance();
        // TODO エージェントIDは0固定
        String dbName = dbMmanager.getDataBaseName(1);
        List<JavelinMeasurementItem> javelinMeasurementItemList = null;
        List<TreeMenuDto> treeMenuDtoList = new ArrayList<TreeMenuDto>();
        Map<String, TreeMenuDto> treeMenuMap = new LinkedHashMap<String, TreeMenuDto>();
        try
        {
            javelinMeasurementItemList = JavelinMeasurementItemDao.selectAll(dbName);
        }
        catch (SQLException ex)
        {

        }
        if (javelinMeasurementItemList == null)
        {
            return treeMenuDtoList;
        }
        // TODO ツリー階層を作成すること。
        for (JavelinMeasurementItem javelinMeasurementItem : javelinMeasurementItemList)
        {
            String itemName = javelinMeasurementItem.itemName;
            addTreeData(treeMenuMap, itemName);
        }
        treeMenuDtoList = new ArrayList<TreeMenuDto>(treeMenuMap.values());
        return treeMenuDtoList;
    }

    private void addTreeData(final Map<String, TreeMenuDto> treeMenuDtoMap, final String itemName)
    {
        String[] itemList = TREE_SEPARATE_PATTERN.split(itemName);
        if (itemList.length < 1)
        {
            return;
        }
        String currentId = TREE_SEPARATOR;
        for (int cnt = 1; cnt < itemList.length; cnt++)
        {
            addTree(treeMenuDtoMap, currentId, itemList[cnt]);
            currentId += itemList[cnt] + TREE_SEPARATOR;
        }
    }

    private void addTree(final Map<String, TreeMenuDto> treeMenuDtoMap, final String parentId,
            final String itemName)
    {
        String currentItemName = itemName;
        String unitName = "";
        int unitPosition = itemName.indexOf(UNIT_SEPARATOR);
        if (unitPosition > 0)
        {
            unitName = itemName.substring(unitPosition + 1);
        }
        String currentId = parentId + currentItemName;
        TreeMenuDto menuDto = treeMenuDtoMap.get(currentId);
        if (menuDto != null)
        {
            return;
        }
        menuDto = new TreeMenuDto();
        menuDto.setId(currentId);
        menuDto.setTreeId(currentId);
        menuDto.setData(currentItemName);
        menuDto.setMeasurementUnit(unitName);
        menuDto.setParentTreeId(parentId.substring(0, parentId.length() - 1));
        treeMenuDtoMap.put(currentId, menuDto);

    }

}
