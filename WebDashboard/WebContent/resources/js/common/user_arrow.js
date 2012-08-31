
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
	viewClassName : "wgp.mapView",
	tabTitle : "Map",
};

var graphAreaTabElement = { 
	viewClassName : "wgp.MultiAreaView",
	rootView:appView,
	tabTitle : "Graph",
	collection :[cpuGraphViewElement]
};

var testTabElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView:appView,
	tabTitle : "Test",
	collection :[memoryGraphViewElement]
};

var tabViewElement = {
	viewClassName: "wgp.TabView",
	rootView:appView,
	collection:[mapTabElement, graphAreaTabElement, testTabElement]
};

var arrowChartElement = {
		viewClassName : "ArrowChartView",
};

var dygraphChartElement = {
		viewClassName : "DygraphChartView",
};

var parentTmpElement = {
		viewClassName : "ParentTmpView",
		rootView:appView,
};

var arrowChartViewElement = {
		viewClassName : "wgp.MultiAreaView",
		rootView:appView,
		collection :[parentTmpElement]
//		collection :[arrowChartElement]

};



wgp.constants.VIEW_SETTINGS = {
	"default" : graphAreaTabElement,
	"/graph1/" : tabViewElement,
	"/inagaki/":parentTmpElement
};