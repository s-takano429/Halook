/*******************************************************************************
 * WGP 0.2 - Web Graphical Platform (https://sourceforge.net/projects/wgp/)
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2012 Acroquest Technology Co.,Ltd.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
package org.wgp.servlet;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.arnx.jsonic.JSON;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;
import org.wgp.manager.MessageInboundManager;

public class WgpMessageInbound extends MessageInbound {
	private static final String EVENT_TYPE_KEY = "eventType";

	private static final String GROUP_ID_KEY = "groupId";

	private static final String SEND_DATA_KEY = "data";

	private static final String EVENT_TPYE_ADD = "add";

	private static final String EVENT_TYPE_REMOVE = "remove";

	private WsOutbound myoutbound;

	private Set<String> listeners = new HashSet<String>();

	@Override
	public void onOpen(WsOutbound outbound) {
		this.myoutbound = outbound;
		MessageInboundManager manager = MessageInboundManager.getInstance();
		manager.addMessageInbound(this);
	}

	@Override
	public void onClose(int status) {
		MessageInboundManager manager = MessageInboundManager.getInstance();
		manager.remove(this);
	}

	@Override
	public void onTextMessage(CharBuffer cb) throws IOException {
		String message = cb.toString();
		Map<String, Object> messageMap = JSON.decode(message, Map.class);
		Object eventType = messageMap.get(EVENT_TYPE_KEY);
		Object groupIdList = messageMap.get(GROUP_ID_KEY);
		if (eventType == null || groupIdList == null) {
			return;
		}
		if (EVENT_TPYE_ADD.equals(eventType) && groupIdList instanceof List) {
			this.listeners.addAll((List) groupIdList);
		} else if (EVENT_TYPE_REMOVE.equals(eventType)
				&& groupIdList instanceof List) {
			this.listeners.removeAll((List) groupIdList);
		}
	}

	@Override
	public void onBinaryMessage(ByteBuffer bb) throws IOException {
		// Do Nothing.
	}

	public boolean notifyListener(String data) {
		sendResponse(data);
		return true;
	}

	private void sendResponse(String data) {
		CharBuffer buffer = CharBuffer.wrap(data);
		try {
			myoutbound.writeTextMessage(buffer);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	public Set<String> getListeners() {
		return listeners;
	}

	public void setListeners(Set<String> listeners) {
		this.listeners = listeners;
	}
}
