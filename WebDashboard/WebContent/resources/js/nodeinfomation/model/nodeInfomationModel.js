var NodeInfomationModel = Backbone.Model.extend({
	defaults : {
		time : null,
		value : null
	},
	idAttribute : "time",
	addChildren : function(child) {
		this.get("chidlren").concat(child);
	}
});

var NodeInfomationCollection = Backbone.Collection.extend({
	model : NodeInfomationModel
});