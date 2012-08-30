var ganttChartModel = Backbone.Model.extend({
	defaults:{
		jobId : null,
		jobName : null,
		status : null,
		submitTime : null,
		startTime : null,
		finishTime : null
	},
	idAttribute:"jobId",
});

var GanttChartModelCollection = Backbone.Collection.extend({
	model : ganttChartModel
});