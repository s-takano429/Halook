
wgp.DygraphAttribute = [
        "colors",
        "labels",
        "valueRange",
        "xlabel",
        "ylabel",
        "strokeWidth",
        "legend",
        "labelsDiv",
        "width",
        "height",
        "drawPoints",
		"pointSize",
		"highlightCircleSize",
		"xAxisHeight"// イベントを考えてみる
		// "drawHighlightPointCallback"
		// "drawPointCallback"
];

//var graphMaxNumber = 20;
//var Colors = [];

BubbleElementView = wgp.DygraphElementView.extend({
	initialize:function(argument){
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new BubbleModelCollection();
		// this.attributes = {};
		// this.registerCollectionEvent();
		// this.collection = new GraphModelList();


		// this.parentId = argument["parentId"];
		// this.graphId = argument["graphId"];
		// this.colors = argument["colors"];
		//Colors = argument["colors"];
		this.width = argument["width"];
		this.height = argument["height"];
		//this.xAxisHeight = argument["xAxisHeight"];
		//this.drawPoints = argument["drawPoints"];
		//this.strokeWidth = argument["strokeWidth"];
		// this.attributes = argument["attributes"];
		// this.colors = argument["colors"];
		// this.maxId = 0;
		// this.collection = new BubbleModelCollection();
		// var dataArray = new BubbleModelCollection();
		// this.registerCollectionEvent();
		
		//注意　Start順に渡すこと
		var dataArray =　[/*{
			TaskAttemptID : -1,
			StartTime : -5,
			FinishTime : 0,
			Status : null,
			Sort : null,
			HostName : null,
		},*/{
			TaskAttemptID : 0,
			StartTime : 3,
			FinishTime : 22,
			Status : "Success",
			Sort : "Map",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 1,
			StartTime : 6,
			FinishTime : 34,
			Status : "Failed",
			Sort : "Map",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 2,
			StartTime : 12,
			FinishTime : 31,
			Status : "Success",
			Sort : "Reduce",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 3,
			StartTime : 18,
			FinishTime : 31,
			Status : "Failed",
			Sort : "Reduce",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 4,
			StartTime : 22,
			FinishTime : 29,
			Status : "Success",
			Sort : "Map",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 5,
			StartTime : 26,
			FinishTime : 38,
			Status : "Failed",
			Sort : "Map",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 6,
			StartTime : 31,
			FinishTime : 38,
			Status : "Success",
			Sort : "Reduce",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 7,
			StartTime : 36,
			FinishTime : 53,
			Status : "Failed",
			Sort : "Reduce",
			HostName : "192.168.11.1"
		},{
			TaskAttemptID : 8,
			StartTime : 36,
			FinishTime : 61,
			Status : "Success",
			Sort : "Reduce",
			HostName : "192.168.11.1"
		}];
		
	
		/*
		 * ,{ TaskAttemptID : 2, StartTime : 0.9, FinishTime : 9, Status :
		 * "Success", HostName : "192.168.11.1" },{ TaskAttemptID : 3, StartTime :
		 * 0.9, FinishTime : 12, Status : "Success", HostName : "192.168.11.1"
		 * }],[{ TaskAttemptID : 4, StartTime : 0.9, FinishTime : 3, Status :
		 * "Failed", HostName : "192.168.11.1" },{ TaskAttemptID : 5, StartTime :
		 * 2.3, FinishTime : 12, Status : "Failed", HostName : "192.168.11.1"
		 * },{ TaskAttemptID : 6, StartTime : 1.6, FinishTime : 9, Status :
		 * "Failed", HostName : "192.168.11.1" },{ TaskAttemptID : 7, StartTime :
		 * 2.3, FinishTime : 1, Status : "Failed", HostName : "192.168.11.1"
		 * }]];
		 */
		
		this.graphId = 0;

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

        this.entity = null;
		// this.collection = new GraphModelList();
        if(dataArray && dataArray.length > 0){
        	// alert(dataArray.length);
        	this.addCollection(dataArray);
            this.render();
        }
        this.registerCollectionEvent();
	},
	render:function(){
		var data = this.getData();
		this.entity = new Dygraph(
			document.getElementById(this.$el.attr("id")),
			/*[
             [1,10,null,null,null],
             [2,40,80,null,null],
             [3,null,null,50,null],
             [4,null,null,null,80]
           ],*/
			data,
			this.getAttributes(wgp.DygraphAttribute)
		);
		this.entity.updateOptions({
			ReduceSuccess:{
				pointSize : 7
	              //drawPointCallback : mouthlessFace(),
	              //drawHighlightPointCallback : mouthlessFace()
			},
			ReduceFailed:{
				pointSize : 5
			}
		});///アップデート
		this.entity.resize(this.width, this.height);
	},
	onAdd:function(graphModel){
		var dataArray = [];
		if(this.collection.length > graphMaxNumber){
			this.collection.shift(wgp.constants.BACKBONE_EVENT.SILENT);
		}
		/*
		var array = [];
		array.push("x");
		array.push("MapSuccess");
		array.push("MapFailed");
		array.push("ReduceSuccess");
		array.push("ReduceFailed");
		dataArray.push(array);*/
		
		_.each(this.collection.models, function(model,index){
			// 必要なデータだけとってきて表示する（一例）
			var modelData = model.get("data");
			var array = [];
			
			
			var ProcessTime = modelData.FinishTime-modelData.StartTime;		
			array.push(modelData.StartTime);
			if(modelData.Status == "Success"){
				//wgp.DygraphAttribute["colors"] = Colors[0];
				if(modelData.Sort == "Map"){
					array.push(ProcessTime);
					array.push(null);
					array.push(null);
					array.push(null);
				}else{
					array.push(null);
					array.push(ProcessTime);
					array.push(null);
					array.push(null);
				}
			}else if(modelData.Status == "Failed"){				
				//wgp.DygraphAttribute["colors"] = Colors[1];
				if(modelData.Sort == "Map"){
					array.push(null);
					array.push(null);
					array.push(ProcessTime);
					array.push(null);
				}else{
					array.push(null);
					array.push(null);
					array.push(null);
					array.push(ProcessTime);
				}
			}
			// alert(modelData.FinishTime);
			dataArray.push(array);
		});
		// alert(dataArray.length);
		if(this.entity == null){
			this.render();
		}else{
			this.entity.updateOptions({file: dataArray});
		}
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
		_.each(this.collection.models, function(model, index){
			var modelData = model.get("data");
			var array = [];
			var ProcessTime = modelData.FinishTime-modelData.StartTime;
			array.push(modelData.StartTime);
			if(modelData.Status == "Success"){
				if(modelData.Sort == "Map"){
					array.push(ProcessTime);
					array.push(null);
					array.push(null);
					array.push(null);
				}else{
					array.push(null);
					array.push(ProcessTime);
					array.push(null);
					array.push(null);
				}
			}else if(modelData.Status == "Failed"){
				if(modelData.Sort == "Map"){
					array.push(null);
					array.push(null);
					array.push(ProcessTime);
					array.push(null);
				}else{
					array.push(null);
					array.push(null);
					array.push(null);
					array.push(ProcessTime);
				}
			}
			data.push(array);
		});
		return data;
	},
	getRegisterId : function(){
		return this.graphId;
	}
});

var mouthlessFace = function(g, series, ctx, cx, cy, color, radius) {
	ctx = /*$('#canvas')[0]*/this.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFF00";
    ctx.beginPath();
    ctx.arc(cx, cy, radius, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(cx - (radius / 3) , cy - (radius / 4), 1, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx + (radius / 3) , cy - (radius / 4), 1, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };