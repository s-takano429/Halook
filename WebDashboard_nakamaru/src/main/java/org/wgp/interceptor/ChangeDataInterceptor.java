/**
 * 
 */
package org.wgp.interceptor;

import java.util.Map;

import org.aspectj.lang.JoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wgp.manager.WgpBufferManager;
import org.wgp.manager.WgpBufferManager.UpdateType;
import org.wgp.util.DataConvertUtil;

/**
 * @author nakagawa
 * 
 */
@Component
public class ChangeDataInterceptor {

	private static int DATA_GROUP_ID_INDEX = 0;

	private static int OBJECT_ID_INDEX = 1;

	private static int DATA_INDEX = 2;

	@Autowired
	WgpBufferManager wgpBufferManager;

	/**
	 * 
	 * @param joinPoint
	 */
	public void addInterceptor(JoinPoint joinPoint) {
		Object[] argumentArray = joinPoint.getArgs();
		// get object before change.
		String dataGroupId = (String) argumentArray[DATA_GROUP_ID_INDEX];
		String objectId = (String) argumentArray[OBJECT_ID_INDEX];
		Object wgpData = argumentArray[DATA_INDEX];

		// create data from Map type.
		UpdateType type = UpdateType.INSERT;
		Map<String, String> updateData = DataConvertUtil
				.getPropertyList(wgpData);
		// add Buffer to chage data.
		wgpBufferManager.setChangeData(dataGroupId, objectId, type, updateData);
	}

	/**
	 * 
	 * @param joinPoint
	 */
	public void updateInterceptor(JoinPoint joinPoint) {

		Object[] argumentArray = joinPoint.getArgs();
		// get object before change.
		String dataGroupId = (String) argumentArray[DATA_GROUP_ID_INDEX];
		String objectId = (String) argumentArray[OBJECT_ID_INDEX];
		Object wgpData = argumentArray[DATA_INDEX];

		UpdateType type = UpdateType.UPDATE;
		Map<String, String> updateDataMap = DataConvertUtil
				.getPropertyList(wgpData);
		wgpBufferManager.setChangeData(dataGroupId, objectId, type,
				updateDataMap);

	}
}
