/**
 * 
 */
package org.wgp.manager;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.wgp.dto.BufferDto;
import org.wgp.dto.BufferIdDataDto;
import org.wgp.exception.WGPRuntimeException;

/**
 * this class have telegram data for realtime connection.
 * 
 * @author nakagawa
 */
@Service
@Scope("singleton")
public class WgpBufferManager {

	private Map<String, Map<String, BufferDto>> bufferDataMap;

	private Map<Object, BufferIdDataDto> bufferObjectIdMap = new ConcurrentHashMap<Object, BufferIdDataDto>();

	/**
	 * if you put your map, this constructor use.
	 * 
	 * @param map
	 */
	public WgpBufferManager(Map<String, Map<String, BufferDto>> map) {
		bufferDataMap = map;
	}

	/**
	 * default constructor.
	 */
	public WgpBufferManager() {
		bufferDataMap = new HashMap<String, Map<String, BufferDto>>();
	}

	/**
	 * set telegram data.
	 * 
	 * @param objectGroupId
	 *            group id.
	 * @param objectId
	 *            objectId.
	 * @param type
	 *            update type.
	 * @param updateData
	 *            data.
	 */
	public void setChangeData(String objectGroupId, String objectId,
			UpdateType type, Map<String, String> updateData) {
		BufferDto dto = new BufferDto();
		dto.setType(type);
		dto.setUpdateData(updateData);
		synchronized (this.bufferDataMap) {
			Map<String, BufferDto> unitMap = this.bufferDataMap
					.get(objectGroupId);
			if (unitMap == null) {
				unitMap = new ConcurrentHashMap<String, BufferDto>();
				this.bufferDataMap.put(objectGroupId, unitMap);
			}
			BufferDto beforeDto = unitMap.get(objectId);
			if (beforeDto == null) {
				unitMap.put(objectId, dto);
				if (UpdateType.UPDATE.equals(type)) {
					dto.setType(UpdateType.INSERT);
				}
				// insert data for object - id mapping.
				BufferIdDataDto idData = new BufferIdDataDto();
				idData.setObjectGroupId(objectGroupId);
				idData.setObjectId(objectId);
				bufferObjectIdMap.put(dto, idData);
			} else {
				UpdateType beforeUpdateType = beforeDto.getType();
				if (UpdateType.DELETE.equals(beforeUpdateType)) {
					throw new WGPRuntimeException();
				} else if (UpdateType.UPDATE.equals(beforeUpdateType)) {
					if (UpdateType.INSERT.equals(type)) {
						throw new WGPRuntimeException();
					}
				} else if (UpdateType.INSERT.equals(beforeUpdateType)) {
					if (UpdateType.INSERT.equals(type)) {
						throw new WGPRuntimeException();
					}
				}

				if (UpdateType.DELETE.equals(type)) {
					beforeDto.setType(type);
					beforeDto.setUpdateData(new HashMap<String, String>());
				} else if (UpdateType.UPDATE.equals(type)) {
					Map<String, String> destMap = beforeDto.getUpdateData();
					for (Entry<String, String> entry : updateData.entrySet()) {
						destMap.put(entry.getKey(), entry.getValue());
					}
				}
			}
		}
	}

	public Map<String, Map<String, BufferDto>> getBufferDataMap() {
		return bufferDataMap;
	}

	public void setBufferDataMap(
			Map<String, Map<String, BufferDto>> bufferDataMap) {
		synchronized (this.bufferDataMap) {
			this.bufferDataMap = bufferDataMap;			
		}
	}
	
	public Map<String, Map<String, BufferDto>> extractBufferData(){
		Map<String, Map<String, BufferDto>> bufferMap = null;
		synchronized (this.bufferDataMap) {
			bufferMap = this.bufferDataMap;
			this.bufferDataMap = new HashMap<String, Map<String, BufferDto>>();
		}
		return bufferMap;
	}

	/**
	 * get BufferIdData object.
	 * 
	 * @param object
	 *            object.
	 * @return idData.
	 */
	public BufferIdDataDto getBufferIdData(Object object) {
		return this.bufferObjectIdMap.get(object);
	}

	/**
	 * update type.
	 * 
	 * @author nakagawa
	 */
	public enum UpdateType {
		UPDATE, DELETE, INSERT;

		public String toString() {
			if (UPDATE.equals(this)) {
				return "update";
			} else if (DELETE.equals(this)) {
				return "delete";
			} else {
				return "insert";
			}
		}
	}

}
