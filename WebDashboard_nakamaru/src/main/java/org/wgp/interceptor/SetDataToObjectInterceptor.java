package org.wgp.interceptor;

import org.aspectj.lang.JoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wgp.manager.WgpBufferManager;

@Component
public class SetDataToObjectInterceptor{

	@Autowired
	WgpBufferManager wgpBufferManager;
	
	public void before(JoinPoint jp)
			throws Throwable {
		System.out.println("test2");
		//		BufferIdDataDto dto = wgpBufferManager.getBufferIdData(target);
//		
//		UpdateType type = UpdateType.UPDATE;
//		String methodName = method.getName();
//		String propertyName = DataConvertUtil.getFieldName(methodName);
//		
//		Object setData = argument[0];
//		String value = setData.toString();
//		Map<String, String> updateData = new HashMap<String, String>();
//		updateData.put(propertyName, value);
//		wgpBufferManager.setChangeData(dto.getObjectGroupId(), dto.getObjectId(), type, updateData);
	}
}
