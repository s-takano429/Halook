var taskAttemptID = 0;
function bubbleChartMock() {
	taskAttemptID++;
	var data = {
		type : wgp.constants.CHANGE_TYPE.ADD,
		TaskAttemptID : taskAttemptID,
		StartTime : Math.floor( Math.random() * 100 ),
		FinishTime : new Date(),
		Status : "Success",
		HostName : "192.168.11.1"
	};

	var sendBubbleChartMockData = [ {
		windowId : "contents_area_0",
		data : [ data ]
	} ];
	appView.notifyEvent(sendBubbleChartMockData);
};