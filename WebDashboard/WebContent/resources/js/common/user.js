
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

var graphAreaTabElement = {
		viewClassName 	: "wgp.MultiAreaView",
		rootView		: appView,
		tabTitle 		: "Graph",
		collection 		: [memoryGraphViewElement, cpuGraphViewElement]
	};

var tabViewElement = {
	viewClassName: "wgp.TabView",
	rootView:appView,
	collection:[mapTabElement, graphAreaTabElement]
};




var hbaseGrowthGraphParentView = {
		viewClassName	: "HbaseParentView"
};
var hbaseGrowthGraphView = {
		viewClassName	: "HbaseView"
};
var sliderView = {
		viewClassName	: "SliderView"
};



var hbaseGrowthGraphField = {
		viewClassName	: "wgp.MultiAreaView",
		rootView		: appView,
		//collection		: [sliderView, hbaseGrowthGraphView]
		collection		: [hbaseGrowthGraphParentView]
		//collection		: [hbaseGrowthGraphField]
};

var nodeInfoField = {
		viewClassName	: "wgp.MultiAreaView",
		rootView		: appView,
		//collection		: [sliderView, hbaseGrowthGraphView]
		collection		: [hbaseGrowthGraphParentView]
		//collection		: [hbaseGrowthGraphField]
};

wgp.constants.VIEW_SETTINGS = {
	"default" : graphAreaTabElement,
	"/graph1/" : tabViewElement,
	"/hbase/" : hbaseGrowthGraphField,
	"/master/" : nodeInfoField
};