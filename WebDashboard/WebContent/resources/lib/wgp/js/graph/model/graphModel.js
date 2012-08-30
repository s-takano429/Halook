wgp.GraphModel = Backbone.Model.extend({
	defaults:{
		dataId : null,
		data : []
	},
	idAttribute:"dataId"
});

var GraphModelList = Backbone.Collection.extend({
	model : wgp.GraphModel
});