
//var HbaseView = wgp.DygraphElementView.extend({
var HbaseView = wgp.AbstractView.extend({
	initialize: function(){
		this.viewtype = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new HbaseCollection;
		//this.registerCollectionEvent();
		
		var func = function(minDate, maxDate, yRanges){
			alert("zoom event is occured");
			alert("minDate :" + minDate);
			alert("maxDate :" + maxDate);
			alert("yRanges :" + yRanges);
		};
		
		this.width = 750;
		this.height = 300;
		this.graphId = "contents_area_0";
		this.attributes = {
			xlabel: "Time",
			ylabel: "# of region",
			labels:["time","# of region", "amount"],
			zoomCallback: func,
			dateWindow: [1000002, 1000005]
		};
		this.maxId = 0;
		
		
		// test data
		this.annotationArray = [];
		var dataArray = [
			{
				timestamp	: 1000000, 
				data		:{
					region_number	: 4,
					region_server_number : 3
				},
				event		: "start"
			},
			{
				timestamp	: 1000001,
				data		:{
					region_number	: 5,
					region_server_number : 3
				},
				event		: "compaction(major),compaction(minor),"
			},
			{
				timestamp	: 1000002, 
				data		:{
					region_number	: 8,
					region_server_number : 3
				},
				event		: "split"
			},
			{
				timestamp	: 1000003, 
				data		:{
					region_number	: 9,
					region_server_number : 3
				},
				event		: ""
			},
			{
				timestamp	: 1000004, 
				data		:{
					region_number	: 9,
					region_server_number : 3
				},
				event		: ""
			},
			{
				timestamp	: 1000005, 
				data		:{
					region_number	: 9,
					region_server_number : 3
				},
				event		: ""
			},
			{
				timestamp	: 1000006, 
				data		:{
					region_number	: 10,
					region_server_number : 3
				},
				event		: ""
			},
			{
				timestamp	: 1000007,
				data		:{
					region_number	: 9,
					region_server_number : 3
				}, 
				event		: "die,split"
			},
			{
				timestamp	: 1000008, 
				data		:{
					region_number	: 11,
					region_server_number : 3
				},
				event		: "new server"
			},
			{
				timestamp	: 1000009, 
				data		:{
					region_number	: 11,
					region_server_number : 3
				},
				event		: ""
			},
			{
				timestamp	: 1000010, 
				data		:{
					region_number	: 12,
					region_server_number : 3
				},
				event		: ""
			},
			
		];
		
		
		var realTag = $("#" + this.$el.attr("id"));
        if (this.width == null) {
            this.width = realTag.width();
        }else{
        	realTag.width(this.width);
        }
        if (this.height == null) {
            this.height = realTag.height();
        }else{
        	realTag.height(this.height);
        }
        
        if(dataArray && dataArray.length > 0){
        	this.addCollection(dataArray);
            this.render();
        }
        
		console.log('hello, instance: HbaseView');
	},
	render : function(){
		
		// for graph
		var data = this.getData();
		this.entity = new Dygraph(
			document.getElementById(this.$el.attr("id")),
			data,
			this.getAttributes(wgp.DygraphAttribute)
		);
		
		// set annotation
		/*
		this.annotationArray.push({
			series: "# of region",
			x: 1000007,
			shortText: "how?",
			text: "okokok?\ndou??"
		});
		*/
		this.entity.setAnnotations(this.annotationArray);
		//this.entity.resize(this.width, this.height);
		
		console.log('call render');
	},
	onAdd : function(element){
		
		var dataArray = [];
		if(this.collection.length > graphMaxNumber){
			this.collection.shift(wgp.constants.BACKBONE_EVENT.SILENT);
		}
		
		_.each(this.collection.models, function(model,index){
			//dataArray.push(model.get("data"));
			
			var modelData = model.get("data");
			var array = [];
			//array.push(modelData);
			array.push(modelData.timestamp);
			array.push(modelData.data.region_number);
			dataArray.push(array);
			
		});
		if(this.entity == null){
			this.render();
		}else{
			this.entity.updateOptions({file: dataArray});
		}
		
		console.log('call onAdd');
	},
	onChange : function(element){
		console.log('called changeModel');
	},
	onRemove : function(element){
		console.log('called removeModel');
	},
	addCollection:function(dataArray){
		if(dataArray != null){
			var instance = this;
			_.each(dataArray, function(data, index){
				var model = new instance.collection.model({dataId: instance.maxId, data:data});
				instance.collection.add(model, wgp.constants.BACKBONE_EVENT.SILENT);
				instance.maxId++;
			});
		}
	},
	getData:function(){
		var data = [];
		var annotationArray = [];
		var series = this.attributes.ylabel;
		var date = new Date();
		
		_.each(this.collection.models, function(model, index){
			var modelData = model.get("data");
			var array = [];
			array.push(modelData.timestamp);
			//array.push(date.getDate(modelData.timestamp));
			//console.log(date.getDate(modelData.timestamp));
			array.push(modelData.data.region_number);
			data.push(array);
			
			// annotation test
			var event = modelData.event;
			if (event != ""){
				var shortText = null;
				var text = null;
				
				eventList = event.split(",");
				// adjust annotation 
				if(eventList.length > 1){
					shortText = "*";
					text = eventList.join("\n");
				}else{
					shortText = eventList[0][0];
					text = eventList[0];
				}
				
				// make annotation element
				var annotation_element = {
					series: series,
					x: modelData.timestamp,
					shortText: shortText,
					text: text,
					cssClass: 'graph_annotation'
				};
				annotationArray.push(annotation_element);
			}
		});
		
		this.annotationArray = annotationArray;
		
		return data;
	},
	getRegisterId : function(){
		return this.graphId;
	}
		
		
});

