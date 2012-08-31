
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
	viewClassName : "HDFSView",
	tabTitle : "HDFSView",
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

wgp.constants.VIEW_SETTINGS = {
	"default" : tabViewElement,
	//"/hdfsView/" : tabViewElement
};