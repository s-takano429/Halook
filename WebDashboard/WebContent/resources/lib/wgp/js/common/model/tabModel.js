
wgp.TabModel = Backbone.Model.extend({
	defaults:{
		tabId : null,
		viewClassName : "",
		tabTitle : "",
		collection : new Backbone.Collection()
	},
	idAttribute:"tabId"
});

var TabModelList = Backbone.Collection.extend({
	model : wgp.TabModel
})