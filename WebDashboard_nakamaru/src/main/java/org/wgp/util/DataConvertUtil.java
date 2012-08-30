package org.wgp.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;

import org.springframework.beans.BeanUtils;
import org.springframework.util.StringUtils;

public class DataConvertUtil {
	
	private static final String SET_NAME = "set";
	
	private static final int FIELD_NAME_POSITION = 3;
	
	private static final String FIELD_NAME_CLASS = "class";
	
	public static void copyObjectNotNull(Object source, Object dest){
		PropertyDescriptor[] descriptorArray = BeanUtils.getPropertyDescriptors(dest.getClass());
		List<String> ignoreProperties = new ArrayList<String>();
		for (PropertyDescriptor descriptor : descriptorArray) {
			Object updateValue = readField(descriptor, dest);
			if (updateValue instanceof Class) {
				continue;
			}
			if (updateValue == null) {
				ignoreProperties.add(descriptor.getName());
			}
		}
		String[] ignorePropertyArray = ignoreProperties.toArray(new String[0]);
		BeanUtils.copyProperties(dest, source, ignorePropertyArray);
	}
	
	public static Object readField(PropertyDescriptor descriptor, Object dest){

		Method method = descriptor.getReadMethod();
		if (method == null) {
			return null;
		}
		Object value = null;
		try {
			value = method.invoke(dest);
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return value;
	}
	
	public static Map<String, String> getPropertyList(Object source) {
		PropertyDescriptor[] descriptorArray = BeanUtils.getPropertyDescriptors(source.getClass());
		Map<String, String> propertyMap = new HashMap<String, String>();
		for (PropertyDescriptor descriptor : descriptorArray) {
			Object value = readField(descriptor, source);
			if (value == null) {
				continue;
			} else if (FIELD_NAME_CLASS.equals(descriptor.getName())) {
				// do nothing.
			} else {
				propertyMap.put(descriptor.getName(), value.toString());
			}
		}
		return propertyMap;
	}
	
	public static String getFieldName(String methodName){
		if (!methodName.startsWith(SET_NAME)) {
			return null;
		}
		String tmpFiledName = methodName.substring(FIELD_NAME_POSITION);
		String fieldName = StringUtils.uncapitalize(tmpFiledName);
		return fieldName;
	}
	
}
