var ResourceGraphAttribute = [ "colors", "labels", "valueRange", "xlabel",
		"ylabel", "strokeWidth", "legend", "labelsDiv", "width", "height" ];
halook.GraphHeightMargin = 50;
halook.ResourceGraphElementView = wgp.DygraphElementView.extend({
	initialize : function(argument) {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new ResourceGraphCollection();

		this.parentId = argument["parentId"];
		this.graphId = argument["graphId"];
		this.width = argument["width"];
		this.height = argument["height"];
		this.title = argument["title"];
		this.rootView = argument["rootView"];
		this.graphHeight = this.height - halook.GraphHeightMargin;
		this.attributes = argument["attributes"];
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
		// $("#" + this.$el.attr("id")).prepend("<h2>" + this.title + "</h2>");
		$("#" + this.$el.attr("id")).css({
			margin : "10px",
			float : "left"
		});

	},
	render : function() {
		var data = this.getData();

		$("#" + this.$el.attr("id")).append("<p>" + this.title + "</p><br>");
		this.entity = new Dygraph(document.getElementById(this.$el.attr("id")),
				data, this.getAttributes(ResourceGraphAttribute));

		this.entity.resize(this.width, this.graphHeight);
		$("#" + this.$el.attr("id")).prepend("<h2>" + this.title + "</h2>");
		$("#" + this.$el.attr("id")).height(this.height);
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
			dataArray.push([ setTime, parseInt(Math.random() * 100),
					parseInt(Math.random() * 100) ]);
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
		var earliest = this.nowtime - from;
		var latest = this.nowtime - to;

		this.getGraphObject().updateOptions({
			dateWindow : [ earliest, latest ]
		});

	}

});