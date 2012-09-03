
var memoryGraphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		width: 300,
		height: 300,
		graphId: "Memory",
		attributes : {
			xlabel: "Time",
			ylabel: "Memory",
			labels:["time","PC1","PC2"]
		}
	}
};

var cpuGraphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		width: 300,
		height: 300,
		graphId: "CPU",
		attributes : {
			xlabel: "Time",
			ylabel: "CPU ",
			labels:["time","PC1","PC2"]
		}
	}
};

var mapTabElement = {
	viewClassName : "wgp.MapView",
	tabTitle : "Map",
};

var ganttChartTabElement = {
		viewClassName : "wgp.MapView",
		tabTitle : "ガントチャート",
	};

var graphAreaTabElement = { 
	viewClassName : "wgp.MultiAreaView",
	rootView:appView,
	tabTitle : "Graph",
	collection :[memoryGraphViewElement, cpuGraphViewElement]
};

var tabViewElement = {
	viewClassName: "wgp.TabView",
	rootView:appView,
	collection:[mapTabElement, graphAreaTabElement]
};

var tabViewElement2 = {
		viewClassName: "wgp.TabView",
		rootView:appView,
		collection:[ganttChartTabElement, graphAreaTabElement, graphAreaTabElement]
	};

var ganttChartViewElement = {
		viewClassName : "ganttChartView",
		rootView : appView
};

var ganttChartMultiElement = {
		viewClassName : "wgp.MultiAreaView",
		rootView : appView,
		collection : [ganttChartViewElement]
};

//wgp.constants.VIEW_SETTINGS = {
//	"default" : graphAreaTabElement,
//	"/graph1/" : tabViewElement,
//	"/ganttchart/" :tabViewElement2
//	
//};

wgp.constants.VIEW_SETTINGS = {
		"default" : ganttChartMultiElement,
		"/ganttchart/" : ganttChartMultiElement
	};