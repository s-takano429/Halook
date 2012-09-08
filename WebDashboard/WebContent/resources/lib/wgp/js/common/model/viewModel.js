
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

wgp.WgpModel = Backbone.Model.extend({
	destroy : function(){
		this.trigger(destroy, this);
	}
});

wgp.WgpCollection = Backbone.Collection.extend({
	model : wgp.WgpModel
});