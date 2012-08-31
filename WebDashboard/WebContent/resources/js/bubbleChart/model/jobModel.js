var jobModel = Backbone.Model.extend({
	defaults:{
		SubmitTime: null,
		StartTime: null,
		FinishTime: null,
		JobID: null,
		JobName: null
	},
	idAttribute:"JobID"
});