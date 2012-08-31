var counter = 0;

function arrowChartDataMock(){
	counter++;
	var  arrowData = {
		    type:wgp.constants.CHANGE_TYPE.ADD,
			SubmitTime:"08/28 14:00",
			StartTime:new Date(),
			FinishTime:new Date(),
			JobID:counter+"",
			JobName:"hey",
			Status:"hoi"
	};
	
	var sendData = [{
			windowId :"taskGraph",
			data : [arrowData]
	}]
	
	appView.notifyEvent(sendData);


};
