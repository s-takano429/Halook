package org.wgp.dto;

import java.util.Map;

import org.wgp.manager.WgpBufferManager.UpdateType;

public class BufferDto {
	
	private UpdateType type;
	
	private Map<String, String> updateData;

	public UpdateType getType() {
		return type;
	}

	public void setType(UpdateType type) {
		this.type = type;
	}

	public Map<String, String> getUpdateData() {
		return updateData;
	}

	public void setUpdateData(Map<String, String> updateData) {
		this.updateData = updateData;
	}
	
	
}
