wgp.DygraphAttribute = [ "colors", "labels", "valueRange", "xlabel", "ylabel",
		"strokeWidth", "legend", "labelsDiv", "width", "height" ];

wgp.DygraphElementView = wgp.AbstractView.extend({
	initialize : function(argument, treeSettings) {
		this._initData(argument, treeSettings);

		var appView = new wgp.AppView();
		appView.addView(this, this.graphId);
		this.render();
		this.registerCollectionEvent();

		if (!this.noTermData) {
			var startTime = new Date(new Date().getTime() - this.term * 1000);
			var endTime = new Date();
			appView.getTermData([ this.graphId ], startTime, endTime);
		}
	},
	_initData : function(argument, treeSettings) {
		// initialize data;
		var defauldSettings = {
			term : 1800,
			graphMaxNumber : 50,
			maxValue : 100
		};
		var argument = $.extend(true, defauldSettings, argument);

		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.parentId = argument.parentId;
		this.term = argument.term;
		this.graphId = treeSettings.id;
		this.width = argument.width;
		this.height = argument.height;
		this.title = treeSettings.data;
		this.labelX = "time";
		this.labelY = treeSettings.id + " " + treeSettings.measurementUnit;
		this.noTermData = argument.noTermData;
		this.attributes = argument.attributes;
		this.maxId = 0;
		this.graphMaxNumber = argument.graphMaxNumber;
		this.maxValue = argument.maxValue;

		var realTag = $("#" + this.$el.attr("id"));
		if (this.width == null) {
			this.width = realTag.width();
		}
		if (this.height == null) {
			this.height = realTag.height();
		}
	},
	render : function() {
		var data = this.getData();
		var optionSettings = {
			title : this.title,
			xlabel : this.labelX,
			ylabel : this.labelY
		};
		optionSettings = $.extend(true, optionSettings, this
				.getAttributes(wgp.DygraphAttribute))
		this.entity = new Dygraph(document.getElementById(this.$el.attr("id")),
				data, optionSettings);
		this.entity.resize(this.width, this.height);
	},
	onAdd : function(graphModel) {
		if (this.collection.length > this.graphMaxNumber) {
			this.collection.shift(wgp.constants.BACKBONE_EVENT.SILENT);
		}
		this.data = this.getData();
		var updateOption = {
			'file' : this.data,
			valueRange: [0, this.maxValue]
		};
		if (this.data.length != 0) {
			updateOption['dateWindow'] = [ this.data[1][0],
					this.data[this.data.length - 1][0] ];
		}
		this.entity.updateOptions(updateOption);
	},
	getTermData : function() {
		this.data = this.getData();
		var updateOption = {
			'file' : this.data,
			valueRange: [0, this.maxValue]
		};
		if (this.data.length != 0) {
			if (this.data.length != 1) {
				updateOption['dateWindow'] = [ this.data[1][0],
				           					this.data[this.data.length - 1][0] ];				
			}
		}
		this.entity.updateOptions(updateOption);
		var tmpAppView = new wgp.AppView();
		tmpAppView.syncData([ this.graphId ]);
	},
	getData : function() {
		var data = [];
		var instance = this;
		data.push([ new Date(0), null, null, null, null, null, null, null,
				null, null, null, null, null, null, null, null ]);
		_.each(this.collection.models, function(model, index) {
			data.push(instance._parseModel(model));
		});
		return data;
	},
	getLabels : function() {

	},
	getRegisterId : function() {
		return this.graphId;
	},
	destroy : function() {
		this.stopRegisterCollectionEvent();
		var tmpAppView = new wgp.AppView();
		tmpAppView.stopSyncData([ this.graphId ]);
		this.entity = null;
	},
	_parseModel : function (model) {
		var timeString = model.get("measurementTime");
		var time = parseInt(timeString);
		var date = new Date(time);
		var valueString = model.get("measurementValue");
		var value = parseFloat(valueString);
		if (this.maxValue < value) {
			this.maxValue = value;
		}
		return [ date, value ]; 
	}
});