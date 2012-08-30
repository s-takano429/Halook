
wgp.TreeElement = Backbone.Model.extend({
	defaults:{
		treeId : null,
		data : null,
		attr : {},
		parentTreeId : null, 
		children : {}
	},
	idAttribute:"treeId",
	addChildren:function(child){
		this.get("chidlren").concat(child);
	}
});