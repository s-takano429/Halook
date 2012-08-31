// //////////////////////////////////////グラフ関数群/////////////////////////////////////////////////////////////////////////////

// ある時間帯にあるtaskが稼働しているかどうかを返す関数
function isTaskMovingOnTime(taskAttemptInfo, markTime) {
	if (taskAttemptInfo.StartTime <= markTime
			&& markTime <= taskAttemptInfo.FinishTime)
		return true;
	else
		return false;
}

// ある時間帯にいくつのtaskが稼働しているかどうかを返す関数
function tasksCounter(tasks, markTime) {
	var counter = 0;
	for ( var i = 0; i < tasks.length; i++) {
		if (isTaskMovingOnTime(tasks[i], markTime))
			counter++;
	}
	return counter;
}

// 等間隔の時間でtaskの数を数えて時間と結果を辞書式でを返す関数
//Job始まりの時間、Job終わりの時間、taskAttemptの配列、区切り回数
function executeTaskCount(startTime, endTime, tasks, times) {
	if(times <= 0 )
		return null;
	var interval = (endTime - startTime) / times;
	var resultReturnArray = [];
	for(var i = 0; i < times+1; i++){
		var tmpDictionary;
		var tmpTime = startTime + i * interval;
		var tmpDate = new Date();
		tmpDate.setTime(tmpTime);
		tmpDictionary = {time:tmpDate, counter:tasksCounter(tasks, tmpTime)};		
		resultReturnArray.push(tmpDictionary);
//		alert("result: "+tmpDictionary.time+" and "+tmpDictionary.counter);
	}
//	alert("result: "+resultReturnArray[2].time+" and "+resultReturnArray[2].counter);
	return resultReturnArray;
}

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var DygraphChartView = wgp.DygraphElementView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new dygraphModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();
        this.graphId = "taskGraph";
        this.maxId = 0;
        appView.addViews([this]);

        
        
		var realTag = $("#" + this.$el.attr("id"));
        if (this.width == null) {
            this.width = realTag.width();
        }
        if (this.height == null) {
            this.height = realTag.height();
        }

//////////////
        
		var dataArray = executeTaskCount(minGraphTime, maxGraphTime, sampleDatas, 10);

		
        this.entity = null;
        if(dataArray && dataArray.length > 0){
        		this.addCollection(dataArray);
            this.render();
        }
///////////////////
        
		console.log('called initialize');
	},
	render : function() {
		var data = this.getData();
		this.entity = new Dygraph(
			document.getElementById(this.$el.attr("id")),
			data,
			this.getAttributes(wgp.DygraphAttribute)
		);

		//this.entity.resize(this.width, this.height);

		console.log('call render');
	},
	onAdd : function(element) {
		var dataArray = [];
		if(this.collection.length > graphMaxNumber){
			this.collection.shift(wgp.constants.BACKBONE_EVENT.SILENT);
		}
		_.each(this.collection.models, function(model,index){
			//console.log(model.get("data"));
			var modelData = model.get("data");
			var array = [];
			array.push(modelData.time);
			array.push(modelData.counter);
			dataArray.push(array);
		});
		if(this.entity == null){
			this.render();
		}else{
			this.entity.updateOptions({file: dataArray});
		}
		console.log('call onAdd dygraph');
	},
	onChange : function(element) {
		console.log('called changeModel');
	},
	onRemove : function(element) {
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

////////////描き加えるべき場所////////////////////////////////////////////
	getData : function(){
		var data = [];
		_.each(this.collection.models, function(model, index){
			var modelData = model.get("data");
			var array = [];
			array.push(modelData.time);
			array.push(modelData.counter);
			data.push(array);
		});
		
		return data;
	}
/////////////////////////////////////////////////////////////////////
});