
wgp.AbstractView = Backbone.View.extend({
	initialize: function(){
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new wgp.AbstractCollection();
		this.attributes = {};
		console.log('called initialize');
	},
	render : function(){
		console.log('call render');
	},
	onAdd : function(element){
		console.log('call onAdd');
	},
	onChange : function(element){
		console.log('called changeModel');
	},
	onRemove : function(element){
		console.log('called removeModel');
	},
	registerCollectionEvent : function(){

		// When Collection Add Model
		this.collection.on('add', this.onAdd, this);

		// When Collection Change Model
		this.collection.on('change', this.onChange, this);

		// When Collection Remove Model
		this.collection.on('remove', this.onRemove, this);
	},
	getAttributes : function(attributesKey){
		var attributes = this.attributes;
		var attributeValues = {};

		if(attributes == null || attributes == undefined){
			return attributeValues;
		}
		
		_.each(attributesKey, function(attribute, index){
			var value = attributes[attribute];
			if(value != null && value != undefined){
				attributeValues[attribute] = value;
			}
		})
		return attributeValues;
	},
	getRegisterViews : function(){
		return [this];
	},
	getRegisterId : function(){
		return this.$el.attr("id");
	}
});