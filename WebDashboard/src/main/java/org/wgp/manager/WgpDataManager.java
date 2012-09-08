package org.wgp.manager;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.wgp.exception.WGPRuntimeException;

/**
 * WGP用のオブジェクトを管理するクラス。
 * 
 * @author nakagawa
 *
 */
@Service
@Scope("singleton")
public class WgpDataManager
{

    private final Map<String, Map<String, Object>> dataMap;

    private static final String ADD_ERROR_MESSAGE = "this objectId is already added.";

    private static final String UPDATE_ERROR_MESSAGE = "update process failed.";

    /**
     * If you want set your map, you use this constructor.
     * @param initMap init map.
     */
    public WgpDataManager(final Map<String, Map<String, Object>> initMap)
    {
        dataMap = initMap;
    }

    /**
     * Initialize map of ConcurrentHashMap.
     */
    public WgpDataManager()
    {
        dataMap = new ConcurrentHashMap<String, Map<String, Object>>();
    }

    /**
     * If you want set your map, you use this method.
     * @param dataGroupId set Map of dataGroupId
     * @param unitMap set target.
     */
    public void initDataMap(final String dataGroupId, final Map<String, Object> unitMap)
    {
        this.dataMap.put(dataGroupId, unitMap);
    }

    /**
     * Get WGP data.
     * if data is nothing, return null.
     * @param dataGroupId set Map of dataGroupId
     * @param unitMap set target.
     */
    public Object getData(final String dataGroupId, final String objectId)
    {
        Map<String, Object> unitMap = this.dataMap.get(dataGroupId);
        if (unitMap == null)
        {
            return null;
        }
        return unitMap.get(objectId);
    }

    /**
     * add or update data.
     * @param dataGroupId group id.
     * @param objectId object id with group of dataGroupId.
     * @param wgpData add or update target.
     */
    public void setData(final String dataGroupId, final String objectId, final Object wgpData)
    {
        Map<String, Object> unitMap = this.dataMap.get(dataGroupId);
        if (unitMap == null)
        {
            unitMap = new ConcurrentHashMap<String, Object>();
            this.dataMap.put(dataGroupId, unitMap);
        }
        Object updateTarget = unitMap.get(objectId);
        if (updateTarget == null)
        {
            unitMap.put(objectId, wgpData);
        }
        else
        {
            throw new WGPRuntimeException(ADD_ERROR_MESSAGE);
        }
    }

    /**
     * remove data from WgpDataManager
     * @param dataGroupId groups id
     * @param objectId object id with group of dataGroupId
     */
    public void removeData(final String dataGroupId, final String objectId)
    {
        Map<String, Object> unitMap = this.dataMap.get(dataGroupId);
        if (unitMap == null)
        {
            return;
        }
        unitMap.remove(objectId);
    }

    public void updateData(final String dataGroupId, final String objectId, final Object wgpData)
    {
        Map<String, Object> unitMap = this.dataMap.get(dataGroupId);
        if (unitMap == null)
        {
            return;
        }
        Object updateTarget = unitMap.get(objectId);
        if (updateTarget == null)
        {
            return;
        }

        // if updateTarget is exist, execute update process.
        PropertyDescriptor[] descriptorArray = BeanUtils.getPropertyDescriptors(wgpData.getClass());
        List<String> ignoreProperties = new ArrayList<String>();
        for (PropertyDescriptor descriptor : descriptorArray)
        {
            Method method = descriptor.getReadMethod();
            if (method == null)
            {
                continue;
            }
            Object updateValue = null;
            try
            {
                updateValue = method.invoke(wgpData);
            }
            catch (IllegalArgumentException e)
            {
                throw new WGPRuntimeException(UPDATE_ERROR_MESSAGE);
            }
            catch (IllegalAccessException e)
            {
                throw new WGPRuntimeException(UPDATE_ERROR_MESSAGE);
            }
            catch (InvocationTargetException e)
            {
                throw new WGPRuntimeException(UPDATE_ERROR_MESSAGE);
            }
            if (updateValue instanceof Class)
            {
                continue;
            }
            if (updateValue == null)
            {
                ignoreProperties.add(descriptor.getName());
            }
        }
        String[] ignorePropertyArray = ignoreProperties.toArray(new String[0]);
        BeanUtils.copyProperties(wgpData, updateTarget, ignorePropertyArray);
    }
}
