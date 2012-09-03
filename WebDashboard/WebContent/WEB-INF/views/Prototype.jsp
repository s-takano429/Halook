<!DOCTYPE html>
<html>
<head>
<%@ include file="../common/javaScriptInclude.jsp"%>
<%@ include file="../common/nodeInfomationInclude.jsp"%>

<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/model/nodeInfomationModel.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/nodeInfomationView.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/mock/nodeInfomationMock.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/model/resourceGraphModel.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/resourceGraphView.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/separaterElementView.js"
	type="text/javaScript"></script>


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

		var table = [
				[ new wgp.PerspactiveModel(viewArea1),
						new wgp.PerspactiveModel(viewArea2) ], ];
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
	<script src="/WebDashboard/resources/js/common/index.js"
		type="text/javaScript"></script>

</body>
</html>