<!DOCTYPE html>
    <html>
    <head>
    <%@ include file="../common/javaScriptInclude.jsp" %>
	<style type="text/css">
    </style>
    </head>
    <body id="main" oncontextmenu="return false;" onload="self.focus();">
    <div id="menuBar_" style="width:1280px; height:20px;"></div>
    <div id="toolBar_" style="width:1280px; height:25px;"></div>
    <div id="persArea"></div>
<script type="text/javascript">
// initialize perspective
var viewArea1 = {};
var viewArea2 = {};

viewArea1.width = 300;
viewArea1.height = 800;"WebContent/WEB-INF/views/BackbonePrototype2.jsp"
viewArea1.rowspan = 1;
viewArea1.colspan = 1;

viewArea2.width = 900;
viewArea2.height = 800;
viewArea2.rowspan = 1;
viewArea2.colspan = 1;

var table = [
	[new wgp.PerspactiveModel(viewArea1), new wgp.PerspactiveModel(viewArea2)]
];
var perspactiveView = new wgp.PerspactiveView({id:"persArea", collection:table});
perspactiveView.dropView("persArea_drop_0_0", "tree_area");
perspactiveView.dropView("persArea_drop_0_1", "contents_area");

var appView = new wgp.AppView();

</script>
<script src="<%= request.getContextPath()%>/resources/js/HDFSView/HDFSView/HDFSView.js"></script>
<script src="<%= request.getContextPath()%>/resources/js/HDFSView/HDFSModel/HDFSModel.js"></script>
<script src="/WebDashboard/resources/js/common/user.js" type="text/javaScript"></script>

<script>
var treeView = new wgp.TreeView({id:"tree_area", targetId:"contents_area"});
var tabView = new wgp.TabView({});
appView.addViews([treeView]);

var treeProperty1 = {
    type:wgp.constants.CHANGE_TYPE.ADD,
    treeId:0,
		data: "HDFSView",
		attr: {
			viewClassName: "HDFSView"
		}
};

var treeProperty3 = {
    type:wgp.constants.CHANGE_TYPE.UPDATE,
    treeId:0,
	data: "HDFSView",
	id: "/hdfsView",
	parentTreeId: null
};	

sendData = [{
	windowId:"tree_area",
	data:[treeProperty1, treeProperty3]
}];
appView.notifyEvent(sendData);

var webSocketClientInstance = new webSocketClient(appView);
webSocketClientInstance.initialize();

var graphDataInterval = function(windowId, value){
    var y = 0;
    function innerFunction(){
        var x = new Date();
        var sin = Math.sin(y * Math.PI / 180);
        var cos = Math.cos(y * Math.PI / 180);

        y = y + value;
        
        var data = {
        	type:wgp.constants.CHANGE_TYPE.ADD,
        	data: [x,sin,cos]
        }
        var sendData = [{
        	windowId: windowId,
        	data: [data]
        }]

        appView.notifyEvent(sendData);
        
    };
    return innerFunction;
}

setInterval(graphDataInterval("Memory",18), 1000);
setInterval(graphDataInterval("CPU",25), 1000);


	</script>
    </body>
    </html>