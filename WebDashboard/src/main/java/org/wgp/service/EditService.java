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
package org.wgp.service;

import org.springframework.stereotype.Service;
import org.wgp.manager.MemoryManager;
import org.wgp.manager.MessageInboundManager;

@Service
public class EditService
{

    /**
     * データ取得を行う。
     * @return
     */
    public String getData(String dataType, String dataId)
    {
        MemoryManager memoryManager = MemoryManager.getInstance();
        String data = memoryManager.select(dataType, dataId);
        return data;
    }

    /**
     * 更新処理を行う。
     * @return
     */
    public void updateData(String dataType, String dataId, String updateData)
    {
        MemoryManager memoryManager = MemoryManager.getInstance();
        memoryManager.update(dataType, dataId, updateData);
        MessageInboundManager inboundManager = MessageInboundManager.getInstance();
//        inboundManager.notifyMessage(dataType, updateData);
        
    }

    /**
     * 削除処理を行う。
     * @return
     */
    public void deleteData(String dataType, String dataId)
    {
        MemoryManager memoryManager = MemoryManager.getInstance();
        memoryManager.delete(dataType, dataId);
    }
}
