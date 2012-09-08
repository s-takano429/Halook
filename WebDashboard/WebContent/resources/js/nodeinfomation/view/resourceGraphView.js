halook.ResourceGraphAttribute = [ "colors", "labels", "valueRange", "xlabel",
		"ylabel", "strokeWidth", "legend", "labelsDiv", "width", "height" ];
halook.nodeinfo.GRAPH_HEIGHT_MARGIN = 50;
halook.ResourceGraphElementView = wgp.DygraphElementView.extend({
	initialize : function(argument, treeSettings) {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new ResourceGraphCollection();
		this.registerCollectionEvent();
		this.parentId = argument["parentId"];
		this.graphId = argument["graphId"];
		this.width = argument["width"];
		this.height = argument["height"];
		this.title = argument["title"];
		this.rootView = argument["rootView"];
		this.graphHeight = this.height - halook.nodeinfo.GRAPH_HEIGHT_MARGIN;
		// console.log(this.height + ":" + this.graphHeight);
		this.attributes = argument["attributes"];
		this.dateWindow = argument["dateWindow"];
		this.noTermData = true;
		// var appView = new wgp.AppView();
		// appView.addView(this, argument.graphId);
		// this.render();

		// if (!this.noTermData) {
		// var startTime = new Date(new Date().getTime() - this.term * 1000);
		// var endTime = new Date();
		// appView.getTermData([ this.graphId ], startTime, endTime);
		// }

		console.log(this.dateWindow);

		this.maxId = 0;

		var dataArray = argument["dataArray"];
		dataArray = this._makeRandomData();

		var realTag = $("#" + this.$el.attr("id"));
		if (this.width == null) {
			this.width = realTag.width();
		} else {
			realTag.width(this.width);
		}
		if (this.height == null) {
			this.height = realTag.height();
		} else {
			realTag.height(this.height);
		}

		this.entity = null;
		this.registerCollectionEvent();
		if (dataArray && dataArray.length > 0) {
			this.addCollection(dataArray);
			this.render();
		}
		$("#" + this.$el.attr("id")).attr("class", "graphbox");
		$("#" + this.$el.attr("id")).css({
			margin : "10px",
			float : "left"
		});
	},
	render : function() {
		var data = this.getData();

		$("#" + this.$el.attr("id")).append("<p>" + this.title + "</p><br>");
		this.entity = new Dygraph(document.getElementById(this.$el.attr("id")),
				data, this.getAttributes(halook.ResourceGraphAttribute));
		console.log(this.height + ":" + this.graphHeight);

		this.entity.resize(this.width, this.graphHeight);
		$("#" + this.$el.attr("id")).prepend("<h2>" + this.title + "</h2>");
		$("#" + this.$el.attr("id")).height(this.height);
		this.getGraphObject().updateOptions({
			dateWindow : this.dateWindow
		});
	},
	_makeRandomData : function() {
		var dataArray = [];
		var today = new Date();
		var agoTime = new Date();
		agoTime.setTime(today.getTime() - 24 * 60 * 60 * 1000);
		while (today.getTime() > agoTime.getTime()) {
			var time = agoTime.getTime() + 60 * 15 * 1000;
			agoTime.setTime(time);
			var setTime = new Date(time);
			dataArray.push([ setTime, parseInt(Math.random() * 100) ]);
		}
		return dataArray;
	},

	onAdd : function(graphModel) {
		var dataArray = [];
		if (this.collection.length > graphMaxNumber) {
			this.collection.shift(wgp.constants.BACKBONE_EVENT.SILENT);
		}

		_.each(this.collection.models, function(model, index) {
			dataArray.push(model.get("data"));
		});
		if (this.entity == null) {
			this.render();
		} else {
			this.entity.updateOptions({
				file : dataArray
			});
		}
	},
	addCollection : function(dataArray) {
		if (dataArray != null) {
			var instance = this;
			_.each(dataArray, function(data, index) {
				var model = new instance.collection.model({
					dataId : instance.maxId,
					data : data
				});
				instance.collection.add(model,
						wgp.constants.BACKBONE_EVENT.SILENT);
				instance.maxId++;
			});
		}
	},
	getData : function() {
		var data = [];
		_.each(this.collection.models, function(model, index) {
			data.push(model.get("data"));
		});
		return data;
	},
	getRegisterId : function() {
		return this.graphId;
	},
	getGraphObject : function() {
		return this.entity;
	},
	updateDisplaySpan : function(from, to) {
		var startDate = new Date().getTime() - from;
		var endDate = new Date().getTime() - to;
		console.log(startDate + "  :  " + endDate);
		this.getGraphObject().updateOptions({
			dateWindow : [ startDate, endDate ]
		});

	}

});