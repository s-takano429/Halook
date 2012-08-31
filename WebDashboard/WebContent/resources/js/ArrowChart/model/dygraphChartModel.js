var dygraphChartModel = Backbone.Model.extend({
	defaults:{
		time:null,
		counter:null,
	},
	idAttribute:"time",
});

var dygraphModelCollection = Backbone.Collection.extend({
	model : dygraphChartModel
});