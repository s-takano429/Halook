
wgp.ViewModel = Backbone.Model.extend({
	defaults:{
		viewId : null,
		viewClassName : "",
		viewAttribute : {}
	},
	idAttribute:"viewId"
});

wgp.ViewModelList = Backbone.Collection.extend({
	model : wgp.ViewModel
});