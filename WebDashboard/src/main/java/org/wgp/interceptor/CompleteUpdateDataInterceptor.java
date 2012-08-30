package org.wgp.interceptor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.wgp.dto.BufferDto;
import org.wgp.manager.MessageInboundManager;
import org.wgp.manager.WgpBufferManager;

@Component
public class CompleteUpdateDataInterceptor {

	@Autowired
	WgpBufferManager wgpBufferManager;
	
	/**
	 * 
	 * @param joinPoint
	 */
	public void completeInterceptor() {
		Map<String, Map<String, BufferDto>> bufferData = wgpBufferManager.extractBufferData();
		MessageInboundManager messageInboundManager = MessageInboundManager.getInstance();
		if (bufferData != null) {
			messageInboundManager.notifyMessage(bufferData);			
		}
	}
}
