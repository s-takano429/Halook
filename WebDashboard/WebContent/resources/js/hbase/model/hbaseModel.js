var HbaseModel = Backbone.Model.extend({
	defaults:{
		time		: null,
		region_num	: null,
		amount		: null,
		event		: null
	},
	idAttribute		: "time",
});
var HbaseCollection = Backbone.Collection.extend({
	//model : wgp.TreeModel
	model	 : HbaseModel
});



/*
var object = new HbaseView({
	time		: 0,
	region_num	: 4,
	amount		: 100,
	event		: "split"
});
*/