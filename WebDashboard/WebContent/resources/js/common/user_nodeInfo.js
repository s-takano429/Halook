var osMemoryGraphViewElement = {
	viewClassName : "ResourceGraphElementView",
	viewAttribute : {
		width : 250,
		height : 150,
		graphId : "osMemory",
		attributes : {
			xlabel : "Time",
			ylabel : "OS Memory",
			labels : [ "time", "PC1", "PC2" ]
		}
	}
};

var osCpuGraphViewElement = {
	viewClassName : "ResourceGraphElementView",
	viewAttribute : {
		title :"title",
		width : 300,
		height : 200,
		graphId : "osCPU",
		attributes : {
			xlabel : "Time",
			ylabel : "OS CPU ",
			labels : [ "time", "PC1", "PC2", "PC3" ]
		}
	}
};

var nnCpuGraphViewElement = {
	viewClassName : "ResourceGraphElementView",
	viewAttribute : {
		width : 250,
		height : 150,
		graphId : "nnCPU",
		attributes : {
			xlabel : "Time",
			ylabel : "nn CPU",
			labels : [ "time", "PC1", "PC2" ]
		}
	}
};

var memoryGraphViewElement = {
	viewClassName : "ResourceGraphElementView",
	viewAttribute : {
		width : 200,
		height : 150,
		graphId : "Memory",
		attributes : {
			xlabel : "Time",
			ylabel : "Memory",
			labels : [ "time", "PC1", "PC2", "PC3" ]
		}
	}
};

var cpuGraphViewElement = {
	viewClassName : "ResourceGraphElementView",
	viewAttribute : {
		width : 200,
		height : 150,
		graphId : "CPUs",
		attributes : {
			xlabel : "Time",
			ylabel : "CPU ",
			valueRange : [ 0, 100 ],
			labels : [ "time", "PC1", "PC2", "PC3" ]
		}
	}
};

var separaterElement = {
	viewClassName : "SeparaterElementView"
};

var mapTabElement = {
	viewClassName : "wgp.MapView",
	tabTitle : "Map",
};

var graphAreaTabElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	tabTitle : "Graph",
	collection : [ memoryGraphViewElement, cpuGraphViewElement,
			osCpuGraphViewElement, separaterElement, nnCpuGraphViewElement ]
};

var tabViewElement = {
	viewClassName : "wgp.TabView",
	rootView : appView,
	collection : [ mapTabElement, graphAreaTabElement ]
};

var nodeInfomationViewElement = {
	viewClassName : "NodeInfomationView",
};

var nodeInfomationMultiElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	tabTitle : "nodeInfo",
	collection : [ nodeInfomationViewElement ]
};

wgp.constants.VIEW_SETTINGS = {
	"default" : graphAreaTabElement,
	"/graph1/" : tabViewElement,
	"/nodeInfomation/" : nodeInfomationMultiElement
};