///////////////////////////////////
///////////////////////////////////
///drawing main circle
///////////////////////////////////
///////////////////////////////////

///////////////////////////////////
///////////////////////////////////
///drawing bars
///////////////////////////////////
///////////////////////////////////
/*
var dn = [];
var numDataNode = 30;
for(var i=0; i<numDataNode; i++){
	dn[i] = {
		    type:wgp.constants.CHANGE_TYPE.ADD,
		    state:wgp.constants.STATE.NORMAL,
		    objectName:"DataNodeRectangle",
		    objectId : "host" + i,
		    width : mainCircleSize.width * Math.PI /numDataNode,
		    height : Math.random() * 200,
		    angle : 360/numDataNode*i,
		    zIndex : 0,
		    centerX : viewArea2.width/2,
		    centerY : viewArea2.height/2,
		    radius : mainCircleSize.width/2
	};
}

dn.push(mainCircleOutside);
*/
///////////////////////////////////
///////////////////////////////////
///drawing rack
///////////////////////////////////
///////////////////////////////////
/*
var rack = [];
var numDataNode = 5;
for(var i=0; i<numDataNode; i++){
	rack[i] = {
		    type:wgp.constants.CHANGE_TYPE.ADD,
		    state:wgp.constants.STATE.NORMAL,
		    objectName:"RackCurve",
		    objectId : "rack" + i,
		    width : mainCircleSize.width,
		    height : mainCircleSize.height,
		    pointX : (viewArea2.width - mainCircleSize.width)/2,
		    pointY : (viewArea2.height - mainCircleSize.height)/2,
		    zIndex : 10
	};
}
console.log(rack);

dn.push(rack);

var mapDataInterval = function(windowId){
	function innerFunction(){
		var addData = [{
		    windowId:windowId,
		    data:dn
		}];
		appView.notifyEvent(addData);
	};
	return innerFunction;
};
setInterval(mapDataInterval("contents_area_tab_0"), 1000);
hdfsViewDataMock();*/







		//////////////
		///datenodeの使用容量
		//////////////		
		/*
		var dn = [];
		var data = element.attributes.data;
		var numDataNode = element.attributes.data.length;
		for(var i=0; i<numDataNode; i++){
			dn[i] = {
				    type:wgp.constants.CHANGE_TYPE.ADD,
				    state:wgp.constants.STATE.NORMAL,
				    objectName:"DataNodeRectangle",
				    objectId : data[i].host,
				    width : mainCircleSize.width * Math.PI /numDataNode,
				    height : 0.2 * data[i].size,
				    angle : 360/numDataNode*i,
				    zIndex : 0,
				    centerX : viewArea2.width/2,
				    centerY : viewArea2.height/2,
				    radius : mainCircleSize.width/2
			};
		}*/
