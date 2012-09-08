
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
	addChildren:function(treeModel){
		var children = this.get("children");
		var after = {};
		after[treeModel.id] = treeModel;
		$.extend(true, after, children);
		this.set({children: after}, wgp.constants.BACKBONE_EVENT.SILENT);
	}
});

var TreeModelList = Backbone.Collection.extend({
	model : wgp.TreeModel
});