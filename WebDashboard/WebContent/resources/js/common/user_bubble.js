var memoryGraphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		width : 300,
		height : 300,
		graphId : "Memory",
		attributes : {
			xlabel : "Time",
			ylabel : "Memory",
			labels : [ "time", "PC1", "PC2" ]
		}
	}
};

var cpuGraphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		width : 300,
		height : 300,
		graphId : "CPU",
		attributes : {
			xlabel : "Time",
			ylabel : "CPU ",
			labels : [ "time", "PC1", "PC2" ]
		}
	}
};

var mapTabElement = {
	viewClassName : "wgp.MapView",
	tabTitle : "Map",
};

var graphAreaTabElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	tabTitle : "Graph",
	collection : [ memoryGraphViewElement, cpuGraphViewElement ]
};

var graphAreaTabElement2 = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	tabTitle : "Graph2",
	collection : [ memoryGraphViewElement, cpuGraphViewElement ]
};

var tabViewElement2 = {
	viewClassName : "wgp.TabView",
	rootView : appView,
	collection : [ mapTabElement, graphAreaTabElement, graphAreaTabElement2 ]
};

var tabViewElement = {
	viewClassName : "wgp.TabView",
	rootView : appView,
	collection : [ mapTabElement, graphAreaTabElement ]
};

var bubbleViewElement = {
	viewClassName : "BubbleChartView",
};

var bubbleMultiElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	collection : [ bubbleViewElement ]
};

wgp.constants.VIEW_SETTINGS = {
	"default" : bubbleMultiElement,
	"/graph1/" : tabViewElement,
	"/bubble/" : bubbleMultiElement
};