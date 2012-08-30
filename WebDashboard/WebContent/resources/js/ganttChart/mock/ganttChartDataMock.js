var id=0;
function GanttChartDataMock() {
	id++;
	var ganttChart = {
		    type : wgp.constants.CHANGE_TYPE.ADD,
			jobId : id,
			jobName : "job",
			status : "success",
			submitTime : "2012-08-27 00:00:00",
			startTime : "2012-08-27 00:01:00",
			finishTime : "2012-08-27 00:10:00",
			time : new Date(),
			value : "hoge"
		};
	var sendModel = [{
		windowId : "contents_area_0",
		data:[ganttChart]
	}];
	appView.notifyEvent(sendModel);

};