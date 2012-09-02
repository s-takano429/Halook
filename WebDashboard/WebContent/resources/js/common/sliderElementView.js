var SliderElementView = wgp.AbstractView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;

		//
		this.fromIdName = "valueA";
		this.toIdName = "valueB";

		 $("#" + this.$el.attr("id")).slider({
		 range : true,
		 values : [ 10, 20 ],
		 min : 0,
		 max : 100

		 });

//		$("#" + this.$el.attr("id")).dateRangeSlider();

		// // hide pull down menu
		// $("select").hide();

		console.log(this.test);
		console.log('called initialize parent view');
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
	},
	//
	setEventOnFrom : function(func) {
		// alert("select#" + this.fromIdName)
		// $("select#" + this.fromIdName).bind("click", func);
		$("#handle_" + this.fromIdName).bind("click", func);
		$("select#" + this.fromIdName).change(func);
		// $("#handle_" + this.fromIdName).change(func);
		$(".ui-slider-tic").bind("click", func);
		$(".ui-slider-scale").bind("click", func);
		$(".ui-slider").bind("click", func);
		$("#valueA").change(func);

	}

});
