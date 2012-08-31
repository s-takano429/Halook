var counter = 0;
var counter2 = 8280000

function dygraphChartDataMock(){
	counter++;
	counter2+=100;
	var  arrowData = {
		    type:wgp.constants.CHANGE_TYPE.ADD,
			time:counter2+"",
			counter:counter+""
	};
	
	var sendData = [{
			windowId :"taskGraph",
			data : [arrowData]
	}]
	
	appView.notifyEvent(sendData);


};
