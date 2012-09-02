var DraggableWindowElementView = wgp.AbstractView.extend({
	initialize : function() {
		console.log('called initialize Draggable');
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.attributes = {};

		$("#" + this.$el.attr("id")).css({
			clear : "left"
		});

		this.maxId = 0;
	},
	render : function() {
		console.log('call render');
	},
	onAdd : function(element) {
		console.log('call onAdd');
	},
	onChange : function(element) {
		console.log('called changeModel');
	},
	onRemove : function(element) {
		console.log('called removeModel');
	}

});