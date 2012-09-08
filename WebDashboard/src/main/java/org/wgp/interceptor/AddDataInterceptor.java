/**
 * 
 */
package org.wgp.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wgp.manager.WgpBufferManager;

/**
 * @author nakagawa
 * 
 */
@Component
public class AddDataInterceptor{

	private static int DATA_GROUP_ID_INDEX = 0;

	private static int OBJECT_ID_INDEX = 1;

	private static int DATA_INDEX = 2;
	
	@Autowired
	WgpBufferManager wgpBufferManager;

	/*
	 * (non-Javadoc
	 * 
	 * @see
	 * org.aopalliance.intercept.MethodInterceptor#invoke(org.aopalliance.intercept
	 * .MethodInvocation)
	 */
	public void before(String dataGroupId, String objectId, Object wgpData) throws Throwable	 {
		System.out.println("test");
//		// get object before change.
//		String dataGroupId = (String) argumentArray[DATA_GROUP_ID_INDEX];
//		String objectId = (String) argumentArray[OBJECT_ID_INDEX];
//		Object wgpData = argumentArray[DATA_INDEX];
//		
//		// create data from Map type.
//		UpdateType type = UpdateType.INSERT;
//		Map<String, String> updateData = DataConvertUtil.getPropertyList(wgpData);
//		// add Buffer to chage data.
//		wgpBufferManager.setChangeData(dataGroupId, objectId, type, updateData);
	}

}
