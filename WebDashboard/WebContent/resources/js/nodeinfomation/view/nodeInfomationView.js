var NodeInfomationView = wgp.AbstractView.extend({
	initialize : function() {
		console.log('called initialize parent view');
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.attributes = {};
		// this.collection = new NodeInfomationCollection();
		// this.registerCollectionEvent();

		// div Tagの作成を行う。
		$("#" + this.$el.attr("id")).append('<div id="osCpuGraphView"></div>');

		console.log("#" + this.$el.attr("id"));
		$("#osCpuGraphView").css({
			width : "28%",
			height : "200px",
			margin : "3px",
			float : "left"
		});

		var osCpuGraphView = new ResourceGraphElementView({
			id : "osCpuGraphView",
			rootView : this
		});

		// /////////////////////////////////////////////////////////////////

		// graph用のdiv Tagの作成を行う。//////////////////////////////////////
		$("#" + this.$el.attr("id")).append(
				'<div id="osMemoryGraphView"></div>');
		$("#osMemoryGraphView").css({
			width : "65%",
			height : "200px",
			margin : "3px",
			backgroundColor : "blue",
			float : "left",
		});

		var osMemoryGraphView = new wgp.DygraphElementView({
			id : "osMemoryGraphView",
			rootView : this
		});

		// /////////////////////////////////////////////////////////////////

		this.maxId = 0;

		var realTag = $("#" + this.$el.attr("id"));
		if (this.width == null) {
			this.width = realTag.width();
		}
		if (this.height == null) {
			this.height = realTag.height();
		}

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