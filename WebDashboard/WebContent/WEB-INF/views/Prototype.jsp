<!DOCTYPE html>
<html>
<head>
<%@ include file="../common/javaScriptInclude.jsp"%>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/nodeInfo/nodeStyles.css"
	type="text/css" media="all">
<%-- hbase graph --%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/hbase/mock/hbaseData.js">

</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/hbase/model/hbaseModel.js">

</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/hbase/mock/hbaseMock.js">

</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/hbase/view/hbaseView.js">

</script>


<%-- dual slider --%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/common/selectToUISlider.jQuery.js">

</script>
<link rel="Stylesheet"
	href="<%=request.getContextPath()%>/resources/css/hbase/ui.slider.extras.css"
	type="text/css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/hbase/view/DualSliderView.js">

</script>

<%-- parent view --%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/hbase/model/hbaseParentModel.js">

</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/hbase/view/hbaseParentView.js">

</script>

<%-- nodeInfo graph --%>

<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/nodeInfoParentView.js">

</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/resourceGraphView.js">

</script>
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/model/resourceGraphModel.js">

</script>


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
		viewArea1.height = 800;
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

	<script src="/WebDashboard/resources/js/common/user.js"
		type="text/javaScript"></script>

	<script>
		setInterval(function() {
			hbaseMock()
		}, 1000);

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
			data : "Hbase",
			id : "/hbase/hbase",
			parentTreeId : null
		};
		var treeProperty6 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			treeId : 3,
			data : "master",
			id : "/master/",
			parentTreeId : null
		};

		sendData = [ {
			windowId : "tree_area",
			data : [ treeProperty1, treeProperty2, treeProperty3,
					treeProperty4, treeProperty5, treeProperty6 ]
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
		}

		setInterval(graphDataInterval("Memory", 18), 1000);
		setInterval(graphDataInterval("CPU", 25), 1000);

		var property1 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			state : wgp.constants.STATE.NORMAL,
			objectName : "MapStateElementView",
			state : wgp.constants.STATE.NORMAL,
			objectId : 1,
			pointX : 100,
			pointY : 100,
			width : 100,
			height : 100,
			zIndex : 0
		};
		var property2 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			state : wgp.constants.STATE.WARN,
			objectName : "MapStateElementView",
			objectId : 2,
			pointX : 350,
			pointY : 100,
			width : 100,
			height : 100
		};
		var property3 = {
			type : wgp.constants.CHANGE_TYPE.ADD,
			state : wgp.constants.STATE.ERROR,
			objectName : "MapStateElementView",
			objectId : 3,
			pointX : 400,
			pointY : 100,
			width : 100,
			height : 100
		};

		var mapDataInterval = function(windowId) {
			var x = 0;
			function innerFunction() {
				property1["state"] = parseInt(Math.random() * 3);
				property2["state"] = parseInt(Math.random() * 3);
				property3["state"] = parseInt(Math.random() * 3);
				var addData = [ {
					windowId : windowId,
					//data : [ property1, property2, property3 ]
					data : [ property1 ]
				} ];
				appView.notifyEvent(addData);

				property1["pointX"] += 30;
				if (property1["pointX"] > 600) {
					property1["pointX"] = 100;
					property1["pointY"] += 20;
				}

			}
			;
			return innerFunction;
		};

		setInterval(mapDataInterval("contents_area_tab_0"), 1000);
	</script>
</body>
</html>