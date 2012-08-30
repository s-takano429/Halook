package org.wgp.exception;

public class WGPRuntimeException extends RuntimeException {

	private String message = null;
	
	public WGPRuntimeException(){
		
	}
	
	public WGPRuntimeException(String message) {
		this.message = message;
	}
}
