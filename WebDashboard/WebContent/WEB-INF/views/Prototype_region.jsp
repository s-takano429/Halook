<!DOCTYPE html>
<html>
<head>
<%@ include file="../common/javaScriptInclude.jsp"%>

<style type="text/css"></style>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/region/Model/regionModel.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/region/View/regionView.js"></script>

<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/region/Mock/datamock.js"></script>


</head>
<body id="main" oncontextmenu="return false;" onload="self.focus();">
	<div id="menuBar_" style="width: 1280px; height: 20px;"></div>
	<div id="toolBar_" style="width: 1280px; height: 25px;"></div>
	<div id="persArea"></div>
	<script type="text/javascript">
		// initialize perspective
		var viewArea1 = {};
		var viewArea2 = {};

		viewArea1.width = 300;
		viewArea1.height = 500;
		"WebContent/WEB-INF/views/BackbonePrototype2.jsp"
		viewArea1.rowspan = 1;
		viewArea1.colspan = 1;

		viewArea2.width = 900;
		viewArea2.height = 800;
		viewArea2.rowspan = 1;
		viewArea2.colspan = 1;

		var table = [ [ new wgp.PerspactiveModel(viewArea1),
				new wgp.PerspactiveModel(viewArea2) ] ];
		var perspactiveView = new wgp.PerspactiveView({
			id : "persArea",
			collection : table
		});
		perspactiveView.dropView("persArea_drop_0_0", "tree_area");
		perspactiveView.dropView("persArea_drop_0_1", "contents_area");

		var appView = new wgp.AppView();
	</script>




	<script
		src="<%=request.getContextPath()%>/resources/js/region/View/TestData.js"
		type="text/javascript"></script>


	<script src="/WebDashboard/resources/js/common/user.js"
		type="text/javascript"></script>






	<script>
		var a = testData;
		console.log("data is" + (testData[0]).table_name);
		setInterval(function() {
			RegionDataMock()
		}, 500);

		var treeView = new wgp.TreeView({
			id : "tree_area",
			targetId : "contents_area"
		});
		var tabView = new wgp.TabView({})
		appView.addViews([ treeView ]);

		var treeProperty1 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			treeId : 0,
			data : "test1",
			attr : {
				viewClassName : "test1View"
			}
		};
		var treeProperty2 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			treeId : 1,
			data : "test2"
		};

		var treeProperty3 = {
			type : wgp.constants.CHANGE_TYPE.UPDATE,
			treeId : 0,
			data : "graphView",
			id : "/graph1/graph",
			parentTreeId : null
		};

		var treeProperty4 = {
			type : wgp.constants.CHANGE_TYPE.UPDATE,
			treeId : 1,
			data : "TabMultiView",
			id : "/graph2/graph",
			parentTreeId : null
		};

		var treeProperty5 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			treeId : 2,
			data : "takakiwa",
			id : "/takakiwa/",
			parentTreeId : null

		};

		sendData = [ {
			windowId : "tree_area",
			data : [ treeProperty1, treeProperty2, treeProperty3,
					treeProperty4, treeProperty5 ]
		} ];
		appView.notifyEvent(sendData);

		var webSocketClientInstance = new webSocketClient(appView);
		webSocketClientInstance.initialize();

		var graphDataInterval = function(windowId, value) {
			var y = 0;
			function innerFunction() {
				var x = new Date();
				var sin = Math.sin(y * Math.PI / 180);
				var cos = Math.cos(y * Math.PI / 180);

				y = y + value;

				var data = {
					type : wgp.constants.CHANGE_TYPE.ADD,
					data : [ x, sin, cos ]
				}
				var sendData = [ {
					windowId : windowId,
					data : [ data ]
				} ]

				appView.notifyEvent(sendData);

			}
			;
			return innerFunction;
		};

		setInterval(graphDataInterval("Memory", 18), 1000);
		setInterval(graphDataInterval("CPU", 25), 1000);

		//Test Data

		var time = 0;
		var timeArray = new Array();
		//var hostMaxNum=4;
		time = testData[0].measurement_time;
		for ( var i = 0; i < testData.length; i++) {

			if (time == testData[i].measurement_time) {
				timeArray.push(testData[i]);
			} else {
				break;
			}
			time = testData[i].measurement_time;
		}
		//alert(timeArray);
		var tableArray = new Array();
		for ( var i = 0; i < timeArray.length; i++) {
			tableArray.push(timeArray[i].table_name);

		}

		//alert(timeArray[0].measurement_value.length);

		var keyNum = [ "raoh", "toki", "jagi" ];

		// alert(i);

		var A = new Array(keyNum.length);

		for ( var i = 0; i < A.length; i++) {
			A[i] = new Array(tableArray.length);

		}

		for ( var i = 0; i < tableArray.length; i++) {
			for ( var j = 0; j < keyNum.length; j++) {
				//alert(keyNum[j]);
				//alert(timeArray[i].measurement_value[keyNum[j]]);
				//alert(timeArray[i].measurement_value.(keyNum[j]));
				A[j][i] = timeArray[i].measurement_value[keyNum[j]];

			}
		}
		var rpcQueue = [ 30, 20, 50, 29, 18 ];
		/*var regionData = Array();
		var regionCol = Array();
		var regionTest = table1;

		for ( var i = 0; i < regionTest.length; i++) {
			regionData.push([ regionTest[i].key, regionTest[i].value ]);
			regionCol.push(regionTest[i].value);
		}*/

		/*var sumRegion = 0;
		for ( var count = 0; count < regionData.length; count++) {
			sumRegion = ++regionData[count][2];
		}*/
		var property = new Array();
		var propertyRpc = new Array();

		var monoProperty = function(type, objectId, pointX, pointY) {

			this.type = type;
			this.state = wgp.constants.STATE.NORMAL;
			this.objectName = "MapStateElementView";
			this.objectId = objectId;
			this.pointX = pointX;
			this.pointY = pointY;
			this.width = 6;
			this.height = 3;
			this.zIndex = 0;
		};

		var monoPropertyRpc = function(type, objectId, pointX, pointY, height) {

			this.type = type;
			this.state = wgp.constants.STATE.NORMAL;
			this.objectName = "MapStateElementView";
			this.objectId = objectId;
			this.pointX = pointX;
			this.pointY = pointY;
			this.width = 4;
			this.height = height;
			this.zIndex = 0;
		};
		var monoProperty1 = function(type, objectId, pointX, pointY, height,
				color) {

			this.type = type;
			this.state = wgp.constants.STATE.NORMAL;
			this.objectName = color;
			this.objectId = objectId;
			this.pointX = pointX;
			this.pointY = pointY;
			this.width = 30;
			this.height = height;
			this.zIndex = 0;
		};
		var Idkari = 0;
		var X = 0;
		var Y = 600;
		var colorArray = [ "MapStateElementViewColor1",
				"MapStateElementViewColor2", "MapStateElementViewColor3" ];
     //alert(colorArray);
     
		for ( var j = 0; j < keyNum.length; j++) {

			for ( var i = 0; i < tableArray.length; i++) {

				property.push(new monoProperty1(wgp.constants.CHANGE_TYPE.ADD,
						Idkari, X, Y - 2 * A[j][i], (2 * A[j][i]),
						colorArray[(i + 3) % 3]));
				Idkari++;

				Y = Y - 2 * A[j][i] - 2;
			}
			X = X + 50;
			Y = 600;
		}
		
		/*for ( var i = 0; i < tableArray.length; i++) {
			alert(colorArray[(i + 3) % 3]);
		}*/
		/*function propertyMv(type, data, id, X, Y) {

			for ( var i = 0; i < data.length; i++) {
				X = X + 9;
				for ( var j = 0; j < data[i]; j++) {

					property.push(new monoProperty(type, id, X, Y));
					id++;
					Y = Y - 3;

				}

				Y = 300;

			}
		};*/

		/*function propertyRpcMv(type, dataRpc, id) {
			var X = 1;
			var Y = 340;
			for ( var i = 0; i < rpcQueue.length; i++) {

				propertyRpc.push(new monoPropertyRpc(type, id, X, Y,
						2 * rpcQueue[i]));
				id++;
				X = X + 9;

			}
		}*/

		/*function propertyStickGraph(type,data,dataRpc,id){
		   
		   var idkari=0
		   propertyMv(type, data, idkari);
		   
		   
		   propertyRpcMv(type, dataRpc, id);
		
		var X = 0;
		var Y = 300;
		var id = 0;
		for ( var i = 0; i < regionData.length; i++) {
			X = X + 9;
			for ( var j = 0; j < regionData[i]; j++) {

				property.push(new monoProperty(id, X, Y));
				id++;
				Y = Y - 3;

			}

			Y = 300;

		}*/
		//var totalWidth = 20 * regionData.length;
		//   var totalHeight=
		/*var property1 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			state : wgp.constants.STATE.NORMAL,
			objectName : "MapStateElementView",
			objectId : 1,
			pointX : 10,
			pointY : 300,
			width : 20,
			height : 10,
			zIndex : 0
		};

		var property2 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			state : wgp.constants.STATE.WARN,
			objectName : "MapStateElementView",
			objectId : 2,
			pointX : 30,
			pointY : 300,
			width : 20,
			height : 10
		};
		var property3 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			state : wgp.constants.STATE.ERROR,
			objectName : "MapStateElementView",
			objectId : 3,
			pointX : 50,
			pointY : 300,
			width : 20,
			height : 10
		};

		var property4 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			state : wgp.constants.STATE.ERROR,
			objectName : "MapStateElementView",
			objectId : 4,
			pointX : 70,
			pointY : 300,
			width : 20,
			height : 10
		};*/

		var transition = function(windowId, value) {
			var y = 0;
			function innerFunction() {
				var x = new Date();
				var sin = Math.sin(y * Math.PI / 180);
				var cos = Math.cos(y * Math.PI / 180);

				y = y + value;

				var data = {
					type : wgp.constants.CHANGE_TYPE.ADD,
					data : [ x, sin, cos ]
				}
				var sendData = [ {
					windowId : windowId,
					data : [ data ]
				} ]

				appView.notifyEvent(sendData);

			}
			;
			return innerFunction;
		};
		/*var dygraph = {
			viewClassName : "wgp.DygraphElementView",
			viewAttribute : {
				width : 100,
				height : 300,
				graphId : "Memory",
				attributes : {
					xlabel : "Time",
					ylabel : "Memory",
					labels : [ "time", "PC1", "PC2" ]
				}
			}
		}*/
		//setInterval(graphDataInterval("Memory", 18), 1000);
		//setInterval(graphDataInterval("CPU", 25), 1000);
		var mapDataInterval = function(windowId) {
			var loopCount = -1;
			function innerFunction() {

				loopCount++;
				/*var array = new Array*/

				/*for ( var k = 0; k < rpcQueue.length; k++) {
					regionData[k] = regionData[k] + 1;
					rpcQueue[k] = rpcQueue[k] + 1;
				}*/
				/*var sumRegion = 0;
				for ( var count = 0; count < regionData.length; count++) {
					sumRegion = ++regionData[2][count];
				}
				if (loopCount == 0) {
					propertyMv(wgp.constants.CHANGE_TYPE.ADD, regionCol, 0);
					propertyRpcMv(wgp.constants.CHANGE_TYPE.ADD, rpcQueue,
							sumRegion + 1);
				} else {

					propertyMv(wgp.constants.CHANGE_TYPE.ADD, regionCol, 0);
					propertyRpcMv(wgp.constants.CHANGE_TYPE.ADD, rpcQueue,
							sumRegion + 1);
				}

				/*for ( var i = 0; i < sumRegion+propertyRpc.length; i++) {
					property[i].state = parseInt(Math.random() * (sumRegion+propertyRpc.length));
				}*/
				/*for ( var i = 0; i < sumRegion; i++) {
					property[i].state = wgp.constants.STATE.NORMAL;
				}
				for ( var i = 0; i < rpcQueue.length; i++) {
					propertyRpc[i].state = wgp.constants.STATE.NORMAL;
				}*/

				/*property1["state"] = parseInt(Math.random() * 4);
				property2["state"] = parseInt(Math.random() * 4);
				property3["state"] = parseInt(Math.random() * 4);
				property4["state"] = parseInt(Math.random() * 4);*/

				//array.push(property,propertyRpc);
				var addData = [ {
					windowId : windowId,
					data : property,
				//data : array,
				} ];
				appView.notifyEvent(addData);
			}
			;

			return innerFunction;

		};

		var underGraphDataInterval = function(windowId, value) {
			var y = 0;
			function innerFunction() {
				//var x = new Date();
				var x = keyNum;
				var xValue = Math.sin(y * Math.PI / 180);
				//var yValue = Math.cos(y * Math.PI / 180);

				y = y + value;

				var data = {
					type : wgp.constants.CHANGE_TYPE.ADD,
					data : [ x, xValue ]
				}
				var sendData = [ {
					windowId : windowId,
					data : [ data ]
				} ]

				appView.notifyEvent(sendData);

			}
			;
			return innerFunction;
		};

		setInterval(underGraphDataInterval("IO", 20), 1000);
		setInterval(mapDataInterval("contents_area_tab_0"), 1000);
		setInterval(mapDataInterval("contents_area_tab_1_1"), 1000);
		setInterval(mapDataInterval("contents_area_tab_2"), 1000);
		setInterval(mapDataInterval("contents_area_tab_3"), 1000);
		setInterval(mapDataInterval("contents_area_tab_4"), 1000);

		//setInterval(mapDataInterval("contents_area_tab_1_1"), 1000);
		//setInterval(mapDataInterval("contents_area_tab_1_1"), 1000);
		//setInterval(mapDataInterval("contents_area_tab_2"), 1000);
		//setInterval(mapDataInterval("contents_area_tab_3"), 1000);
		//setInterval(mapDataInterval("contents_area_tab_4"), 1000);
		//setInterval(underGraphDataInterval("IO", 20), 1000);

		/*var transition1 = function(windowId) {
			function innerFunction() {
				var propertykari=property;
				for ( var i = 0; i < sumRegion; i++) {
					property[i].state = parseInt(Math.random() * sumRegion);
				}
				var addData = [ {
					windowId : windowId,
					data : property,
				} ];
				appView.notifyEvent(addData);
				
			};
			
			return innerFunction;
		}*/

		/*var mapDataInterval = function(windowId) {
			function innerFunction() {
				property1["state"] = parseInt(Math.random() * 4);
				property2["state"] = parseInt(Math.random() * 4);
				property3["state"] = parseInt(Math.random() * 4);
				property4["state"] = parseInt(Math.random() * 4);
				var addData = [ {
					windowId : windowId,
					data : [ property1, property2, property3, property4 ]
				} ];
				appView.notifyEvent(addData);
			}
			;
			return innerFunction;
		};

		setInterval(mapDataInterval("contents_area_tab_0"), 1000);*/
	</script>
</body>
</html>