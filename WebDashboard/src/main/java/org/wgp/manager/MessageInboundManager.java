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
package org.wgp.manager;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

import net.arnx.jsonic.JSON;

import org.wgp.dto.BufferDto;
import org.wgp.servlet.WgpMessageInbound;

public class MessageInboundManager
{
    private static MessageInboundManager instance__ = new MessageInboundManager();

    private static List<WgpMessageInbound> inboundList = new CopyOnWriteArrayList<WgpMessageInbound>();

    /**
     * 
     */
    private MessageInboundManager()
    {
        // Do Nothing.
    }

    public static MessageInboundManager getInstance()
    {
        return instance__;
    }

    public void addMessageInbound(WgpMessageInbound messageInbound)
    {
        inboundList.add(messageInbound);
    }

    public void remove(WgpMessageInbound messageInbound)
    {
        inboundList.remove(messageInbound);
    }

    public List<WgpMessageInbound> getMessageInboundList()
    {
        return inboundList;
    }

    public synchronized void notifyMessage(Map<String, Map<String, BufferDto>> dataMap)
    {
        for (WgpMessageInbound inbound : inboundList)
        {
        	Set<String> groupIdList = new HashSet<String>(inbound.getListeners());
        	Map<String, Map<String, BufferDto>> sendMap = new HashMap<String, Map<String, BufferDto>>();
        	for (String groupId : groupIdList) {
        		Map<String, BufferDto> dtoMap = dataMap.get(groupId);
        		if (dtoMap != null) {
        			sendMap.put(groupId, dtoMap);
        		}
        	}
        	if (sendMap.size() != 0) {
                inbound.notifyListener(JSON.encode(sendMap));        		
        	}
        }
    }
}
