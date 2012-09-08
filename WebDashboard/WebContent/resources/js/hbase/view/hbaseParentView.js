/////////////////////////////////////////////////////////
//               Following is constant                 //
/////////////////////////////////////////////////////////

halook.hbase.parent.css = {};
halook.hbase.parent.css.informationArea = {
	fontSize : "14px",
	float : "right",
	width : "180px",
	height : "350px",
	border : "1px #dcdcdc solid",
	margin : "190px 20px 0px 0px"
};
halook.hbase.parent.css.legendArea = {
	height : "40px",
	margin : "5px 5px 5px 5px"
};
halook.hbase.parent.css.annotationLegendArea = {
	margin : "0px 0px 0px 0px",
	padding : "5px 5px 5px 5px"
};
halook.hbase.parent.css.dualSliderArea = {
	float : "left",
	width : "600px",
	margin : "50px 0px 0px 60px",
};
halook.hbase.parent.css.graphArea = {
	float : "left",
	width : "650px",
	margin : "30px 0px 0px 10px"
};

// ///////////////////////////////////////////////////////
// Class //
// ///////////////////////////////////////////////////////
var HbaseParentView = wgp.AbstractView.extend({
	initialize : function() {
		this.viewtype = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new HbaseParentCollection();
		// this.registerCollectionEvent();

		var id = halook.hbase.parent.id;

		// dual slider area (add div and css, and make slider)
		$("#" + this.$el.attr("id")).append(
				'<div id="' + id.dualSliderArea + '"></div>');
		$('#' + id.dualSliderArea).css(halook.hbase.parent.css.dualSliderArea);
		var dualSliderView = new DualSliderView({
			id : id.dualSliderArea,
			rootView : this
		});

		// information area (add div and css)
		$("#" + this.$el.attr("id")).append(
				'<div id="' + id.informationArea + '"></div>');
		$('#' + id.informationArea)
				.css(halook.hbase.parent.css.informationArea);

		// graph legend area (add div and css)
		$('#' + id.informationArea).append(
				'<div id="' + id.legendArea + '"></div>');
		$('#' + id.legendArea).css(halook.hbase.parent.css.legendArea);

		// annotation legend area (add div and css)
		$('#' + id.informationArea).append(
				'<div id="' + id.annotationLegendArea + '"></div>');
		$('#' + id.annotationLegendArea).css(
				halook.hbase.parent.css.annotationLegendArea);

		// graph area (add div and css, and make graph)
		$("#" + this.$el.attr("id")).append(
				'<div id="' + id.graphArea + '"></div>');
		$('#' + id.graphArea).css(halook.hbase.parent.css.graphArea);
		var hbaseView = new HbaseView({
			id : id.graphArea,
			rootView : this
		});

		// associate with the slider and graph
		this.setEventOnDualSlider(dualSliderView, hbaseView);
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
	setEventOnDualSlider : function(dualSliderView, targetView) {
		var dualSliderComponent = dualSliderView.getSliderComponet();
		dualSliderComponent.bind("slidechange", function(event, ui) {
			var fromto = dualSliderView.getFromToAsArray(ui.values);
			targetView.updateDisplaySpan(fromto[0], fromto[1]);
		});
	},

});
