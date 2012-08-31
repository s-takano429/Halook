
HDFSModel = Backbone.Model.extend({
	defaults:{
		timestamp : "",
		data : "",
		event : ""
	},
	idAttribute:"timestamp"
});

var HDFSModelCollection = Backbone.Collection.extend({
	model : HDFSModel
});