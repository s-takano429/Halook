
wgp.TreeModel = Backbone.Model.extend({
	defaults:{
		treeId : null,
		data : null,
		attr : {},
		parentTreeId : null,
		children : {},
		element : null
	},
	idAttribute:"treeId",
	addChildren:function(child){
		this.get("chidlren").concat(child);
	}
});

var TreeModelList = Backbone.Collection.extend({
	model : wgp.TreeModel
});