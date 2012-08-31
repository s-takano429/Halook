var counter = 0;

function parentTmpDataMock(){
	counter++;
	var  parentTmpData = {
		    type:wgp.constants.CHANGE_TYPE.ADD,
			SubmitTime:"08/28 14:00",
			StartTime:new Date(),
			FinishTime:new Date(),
			JobID:counter+"",
			JobName:"hey",
			Status:"hoi"
	};
	
	var sendData = [{
			windowId :"contents_area_0",
			data : [parentTmpData]
	}]
	
	appView.notifyEvent(sendData);


};
