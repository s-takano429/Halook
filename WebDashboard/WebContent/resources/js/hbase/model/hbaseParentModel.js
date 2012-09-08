var HbaseParentModel = Backbone.Model.extend({
	defaults:{
		time		: null
	},
	idAttribute		: "time",
});
var HbaseParentCollection = Backbone.Collection.extend({
	//model : wgp.TreeModel
	model	 : HbaseParentModel
});



/*
var object = new HbaseView({
	time		: 0,
	region_num	: 4,
	amount		: 100,
	event		: "split"
});
*/