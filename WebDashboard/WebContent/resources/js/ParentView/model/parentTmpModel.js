var parentTmpModel = Backbone.Model.extend({
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

var parentTmpModelCollection = Backbone.Collection.extend({
	model : parentTmpModel
});