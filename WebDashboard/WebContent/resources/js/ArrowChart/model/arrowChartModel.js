var arrowChartModel = Backbone.Model.extend({
	defaults:{
		SubmitTime:null,
		StartTime:null,
		FinishTime:null,
		JobID:null,
		JobName:null,
		Status:null
	},
	idAttribute:"JobID",
});

var arrowModelCollection = Backbone.Collection.extend({
	model : arrowChartModel
});