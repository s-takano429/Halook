var bubbleChartModel = Backbone.Model.extend({
	defaults:{
		TaskAttemptID: null,
		StartTime: null,
		FinishTime: null,
		Status: null,
		HostName: null
	},
	idAttribute:"TaskAttemptID"
});

/*
var object = new bubbleChartModel({
	taskAttemptID : 1,
});
*/

var BubbleModelCollection = Backbone.Collection.extend({
	model : bubbleChartModel
});