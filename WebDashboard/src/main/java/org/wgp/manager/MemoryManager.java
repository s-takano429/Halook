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
import java.util.Map;

/**
 * @author nakagawa
 *
 */
public class MemoryManager
{
    private Map<String, Map<String, String>> dataMap_ = new HashMap<String, Map<String,String>>();
    
    private static MemoryManager memoryManager__ = new MemoryManager();
    
    public static MemoryManager getInstance(){
        return memoryManager__;
    }
    
    private MemoryManager(){
        
    }
    
    public void update(String type, String id, String data) {
        Map<String, String> typeMap = dataMap_.get(type);
        if (typeMap == null) {
            typeMap = new HashMap<String, String>();
            dataMap_.put(type, typeMap);
        }
        typeMap.put(id, data);
    }
    
    public void delete(String type, String id) {
        Map<String, String> typeMap = dataMap_.get(type);
        if (typeMap == null) {
            return;
        }
        typeMap.remove(id);
    }
    
    public String select(String type, String id) {
        Map<String, String> typeMap = dataMap_.get(type);
        if (typeMap == null) {
            return "";
        }
        String data = typeMap.get(id);
        if (data == null) {
            data = "";
        }
        return data;
    }
    
}
