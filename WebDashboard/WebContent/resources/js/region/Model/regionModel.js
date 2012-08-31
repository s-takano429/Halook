var RegionModel=Backbone.Model.extend({
	defaults: {
		num : null,
		colnum : null
	},
    idAttribute:"num"
});

var RegionModelCollection = Backbone.Collection.extend({
	model : RegionModel
});

