var RegionView = wgp.DygraphElementView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new RegionModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();
		this.graphId=6;

		this.maxId = 0;
		var dataArray =[{ 
             num : "no2" ,
            colnum : "no3"	 
		}];
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
		if (dataArray && dataArray.length > 0) {
			this.addCollection(dataArray);
			this.render();
		}

		this.paper = new Raphael(document.getElementById(this.$el.attr("id")),
				this.width, this.height);

		var modelData = new wgp.MapElement({
			objectId : 5,
			objectName : null,
			pointX : 10,
			pointY : 300,
			width : 20,
			height : 10,
			zIndex : 100,
			URL : null,
			text : null

		});

		var modelData = new wgp.MapStateElementView({
			model : modelData,
			paper : this.paper
		});

		console.log('called regionView');
	},

	/*
	 * render : function() { console.log('call render'); },
	 */
	render : function() {
		var data = this.getData();
		this.entity = new Dygraph(document.getElementById(this.$el.attr("id")),
			data, this.getAttributes(wgp.DygraphAttribute));

		// this.entity.resize(this.width, this.height);
	},

	/*
	 * onAdd : function(element) { console.log('call onAdd'); },
	 */
	onAdd : function(graphModel) {
	    var dataArray = [];
		if (this.collection.length > graphMaxNumber) {
			this.collection.shift(wgp.constants.BACKBONE_EVENT.SILENT);
		}

		_.each(this.collection.models, function(model, index) {
			dataArray.push(model.get("data"));
		});

		var array=[];
	    array.push(model.get("data"));
	    array.phsh(model.get("data"));
	    dataArray.push(array);
	   
		if (this.entity == null) {
			this.render();
		} else {
			this.entity.updateOptions({
				file : dataArray
			});
		}
	},
	onChange : function(element) {
		console.log('called changeModel');
	},
	onRemove : function(element) {
		console.log('called removeModel');
	},
	getData : function() {
		var data = [];
		_.each(this.collection.models, function(model, index) {
			data.push(model.get("data"));
		});
		return data;
	},
});