/////////////////////////////////////////////////////////
//               Following is constant                 //
/////////////////////////////////////////////////////////
halook.nodeinfo = {};
halook.nodeinfo.parent = {};
halook.nodeinfo.parent.css = {};
halook.nodeinfo.parent.css.informationArea = {
	fontSize : "14px",
	float : "right",
	width : "180px",
	height : "350px",
	border : "1px #dcdcdc solid",
	margin : "190px 20px 0px 0px"
};
halook.nodeinfo.parent.css.legendArea = {
	height : "40px",
	margin : "5px 5px 5px 5px"
};
halook.nodeinfo.parent.css.annotationLegendArea = {
	margin : "0px 0px 0px 0px",
	padding : "5px 5px 5px 5px"
};
halook.nodeinfo.parent.css.dualSliderArea = {
	float : "left",
	width : "600px",
	margin : "50px 0px 0px 60px",
};
halook.nodeinfo.parent.css.graphArea = {
	float : "left",
	width : "650px",
	margin : "30px 0px 0px 10px"
};

// ///////////////////////////////////////////////////////
// Class //
// ///////////////////////////////////////////////////////
halook.NodeInfoParentView = wgp.AbstractView.extend({
	initialize : function(argument) {
		this.viewtype = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new HbaseParentCollection();
		// this.registerCollectionEvent();

		var id = argument["ids"];

		// dual slider area (add div and css, and make slider)
		$("#" + this.$el.attr("id")).append(
				'<div id="' + id.dualSliderArea + '"></div>');
		$('#' + id.dualSliderArea).css(
				halook.nodeinfo.parent.css.dualSliderArea);
		var dualSliderView = new DualSliderView({
			id : id.dualSliderArea,
			rootView : this
		});


		// graph legend area (add div and css)
		$('#' + id.informationArea).append(
				'<div id="' + id.legendArea + '"></div>');
		$('#' + id.legendArea).css(halook.nodeinfo.parent.css.legendArea);

		// annotation legend area (add div and css)
		$('#' + id.informationArea).append(
				'<div id="' + id.annotationLegendArea + '"></div>');
		$('#' + id.annotationLegendArea).css(
				halook.nodeinfo.parent.css.annotationLegendArea);

		// graph area (add div and css, and make graph)
		$("#" + this.$el.attr("id")).append(
				'<div id="' + id.graphArea + '"></div>');
		$('#' + id.graphArea).css(halook.nodeinfo.parent.css.graphArea);
		var nodeView = new halook.ResourceGraphElementView({
			id : id.graphArea,
			rootView : this,
			graphId : "Memory",
			title : "test title",
			width: 300,
			height: 300

		});

		// associate with the slider and graph
		this.setEventOnDualSlider(dualSliderView, nodeView);
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
