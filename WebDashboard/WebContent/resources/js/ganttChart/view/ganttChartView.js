var ganttChartView = wgp.AbstractView.extend({
	initialize: function(){
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new GanttChartModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();
//		this.graphId = 1;

    	this.maxId = 0;
    	
    	//初期化する。
    	var dataArray = [{
    	     jobId : "job_201208271340_0001",
    	     jobName : "PiEstimator",
    	     status : "error",
    	     submitTime : "2012/08/27 00:00:00",
    	     startTime : "2012/08/27 00:01:00",
    	     finishTime : "2012/08/27 00:12:00"
    	},
    	{
   	     	jobId : "job_201208271520_0002",
   	     	jobName : "PiEstimator",
   	     	status : "success",
   	     	submitTime : "2012/08/27 00:03:00",
   	     	startTime : "2012/08/27 00:07:00",
   	     	finishTime : "2012/08/27 00:30:00"

    	},
    	{
   	     	jobId : "job_201208271610_0003",
   	     	jobName : "PiEstimator",
   	     	status : "success",
   	     	submitTime : "2012/08/27 00:07:00",
   	     	startTime : "2012/08/27 00:15:00",
   	     	finishTime : "2012/08/27 00:45:00"

    	},
    	{
   	     	jobId : "job_201208271745_0004",
   	     	jobName : "PiEstimator",
   	     	status : "success",
   	     	submitTime : "2012/08/27 00:10:00",
   	     	startTime : "2012/08/27 00:18:00",
   	     	finishTime : "2012/08/27 00:55:00"

    	},
    	{
   	     	jobId : "job_201208271520_0005",
   	     	jobName : "PiEstimator",
   	     	status : "warn",
   	     	submitTime : "2012/08/27 00:15:00",
   	     	startTime : "2012/08/27 00:25:00",
   	     	finishTime : "2012/08/27 01:04:00"

    	},
    	{
   	     	jobId : "job_201208271902_0006",
   	     	jobName : "PiEstimator",
   	     	status : "success",
   	     	submitTime : "2012/08/27 00:18:00",
   	     	startTime : "2012/08/27 00:25:00",
   	     	finishTime : "2012/08/27 00:58:00"

    	},
    	{
   	     	jobId : "job_201208272010_0007",
   	     	jobName : "PiEstimator",
   	     	status : "error",
   	     	submitTime : "2012/08/27 00:20:00",
   	     	startTime : "2012/08/27 00:32:00",
   	     	finishTime : "2012/08/27 01:06:00"

    	}];
    	
    	var startX = 100;
    	var startY = 295;
    	var width = 0;
    	var status = null;
    	

//    	
//    	var sendModel = [{
//    		windowId : "contents_area_0",
//    		data:[dataArray]
//    	}];
//
//    	
        var realTag = $("#" + this.$el.attr("id"));
        if (this.width == null) {
            this.width = realTag.width();
        }
        if (this.height == null) {
            this.height = realTag.height();
        }
//        
//        if(dataArray && dataArray.length > 0){
//        	this.addCollection(dataArray);
//            this.render();
//        }
        

        this.paper =  new Raphael(document.getElementById(this.$el.attr("id")), this.width, this.height);    	
        var property = new wgp.MapElement({
        	    objectId : 1,
        	    objectName : "wgp.MapStateElementView",
        	    pointX : 100,
        	    pointY : 50,
        	    width : 0,
        	    height : 250
        	});
        new wgp.MapStateElementView({
        	model : property,
        	paper : this.paper
        	});
        var property1 = new wgp.MapElement({
    	    objectId : 2,
    	    objectName : "wgp.MapStateElementView",
    	    pointX : 100,
    	    pointY : 300,
    	    width : 600,
    	    height : 0,
    	});
        new wgp.MapStateElementView({
        	model : property1,
        	paper : this.paper
    	});

        for(var i=0; i<dataArray.length; i++)
        {
        	if(i == 0)
        	{
        		width = (new Date(dataArray[0].finishTime)/1000-new Date(dataArray[0].submitTime)/1000)/60;
        		status = this.getStatus(dataArray[0]);
        		var ganttChartProperty = new wgp.MapElement({
        			objectId : i+1,
        			objectName : "wgp.MapStateElementView",
        			pointX : startX,
        			pointY : startY,
        			width : width,
        			height : 0,
        			state : status,
        			label : dataArray[0].jobId,
        			text : dataArray[0].jobName,
        			submitTime : dataArray[0].submitTime,
        			startTime : dataArray[0].startTime,
        			finishTime : dataArray[0].finishTime,
           	    	stroke : 4
        		});
        		new wgp.ganttchartStateElementView({
        			model : ganttChartProperty,
        			paper : this.paper
        		});
        	}
        	else {
        		width = (new Date(dataArray[i].finishTime)/1000-new Date(dataArray[i].submitTime)/1000)/30;
        		status = this.getStatus(dataArray[i]);
        		var ganttChartProperty = new wgp.MapElement({
        			objectId : i+1,
        			objectName : "wgp.MapStateElementView",
        			pointX : startX + (new Date(dataArray[i].submitTime)/1000 - new Date(dataArray[0].submitTime)/1000)/30,
        			pointY : startY - i*10,
        			width : width,
        			height : 0,
        			state : status,
        			label : dataArray[i].jobId,
        			text : dataArray[i].jobName,
        			submitTime : dataArray[i].submitTime,
        			startTime : dataArray[i].startTime,
        			finishTime : dataArray[i].finishTime,
           	    	stroke : 4
        		});
        		new wgp.ganttchartStateElementView({
        			model : ganttChartProperty,
        			paper : this.paper
        		});
        	}
        }
        
		console.log('called ganttChartView');
	},
	render : function(){
//		var data = this.getData();
//		this.entity = new Dygraph(
//			document.getElementById(this.$el.attr("id")),
//			data,
//			this.getAttributes(wgp.DygraphAttribute)
//		);

		console.log('call render');
	},
	onAdd : function(element){
//		var dataArray = [];
//		if(this.collection.length > graphMaxNumber){
//			this.collection.shift(wgp.constants.BACKBONE_EVENT.SILENT);
//		}
//		
//		_.each(this.collection.models, function(model,index) {
//			var modelData = model.get("data");
//			var array = [];
//			array.push(modelData.jobId);
//			array.push(modelData.submitTime);
//			dataArray.push(array);
//		});
//		if(this.entity == null){
//			this.rensder();
//		}else{
//			this.entity.updateOptions({file: dataArray});
//		}
		console.log('call onAdd');
	},
	onChange : function(element){
		console.log('called changeModel');
	},
	onRemove : function(element){
		console.log('called removeModel');
	},
	getStatus : function(dataArray){
		if(dataArray.status.match("success")){
			return wgp.constants.STATE.SUCCESS;
		}
		else if(dataArray.status.match("error")){
			return wgp.constants.STATE.ERROR;
		}
		else if(dataArray.status.match("warn")){
			return wgp.constants.STATE.WARN;
		}
		else {
			return wgp.constants.STATE.NORMAL;
		}
	}
//	addCollection:function(dataArray){
//		if(dataArray != null){
//			var instance = this;
//			_.each(dataArray, function(data, index){
//				var model = new instance.collection.model({dataId: instance.maxId, data:data});
//				instance.collection.add(model, wgp.constants.BACKBONE_EVENT.SILENT);
//				instance.maxId++;
//			});
//		}
//	},
//	getData : function() {
//		var data = [];
//		_.each(this.collection.models, function(model, index){
//			var modelData = model.get("data");
//			var array = [];
//			array.push(modelData.jobId);
//			array.push(modelData.submitTime);
//			data.push(array);
//		});
//		return data;
//
//	}
});
