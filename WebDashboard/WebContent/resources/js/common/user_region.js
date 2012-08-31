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

var underGraphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		width : 300,
		height : 150,
		graphId : "IO",
		attributes : {
			xlabel : "Hostname",
			ylabel : "wait",
			labels : [ "region", "IOlatency" ]
		}
	}
};
var underGraphViewElement2 = {
		viewClassName : "wgp.DygraphElementView",
		viewAttribute : {
			width : 300,
			height : 150,
			graphId : "WAO",
			attributes : {
				xlabel : "Hostname",
				ylabel : "wait",
				labels : [ "region", "IOlatency" ]
			}
		}
	};

var mapTabElement = {
	viewClassName : "wgp.MapView",
	tabTitle : "Map",
};

var mapTabElement2 = {
	viewClassName : "wgp.MapView",
// tabTitle : "Map",
};


var graphAreaTabElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	tabTitle : "Graph",
	collection : [underGraphViewElement, mapTabElement2]
};

/*var graphAreaTabElement1 = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	tabTitle : "Graph2",
	collection : [ mapTabElement, underGraphViewElement ]
};*/

var tabViewElement = {
	viewClassName : "wgp.TabView",
	rootView : appView,
	collection : [mapTabElement,  graphAreaTabElement]
};
/*var tabViewElement1 = {
	viewClassName : "wgp.TabView",
	rootView : appView,
	collection : [ mapTabElement, graphAreaTabElement, graphAreaTabElement1 ]
};*/

var regionNumber = [ 50, 60, 70 ];

var regionViewElement1 = {
	viewClassName : "RegionView",

};
var regionViewElement2 = {
	viewClassName : "RegionView",

};
regionViewElement2.viewClassName.pointX = 30;
// regionViewElement2.viewClassName.graphId=regionViewElement1.viewClassName.graphId+1;

/*
 * var regionViewElement={ viewClassName : "RegionPlaceView(10,300)" };
 */

var regionMultiElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	collection : [ regionViewElement1, regionViewElement2 ]

};

wgp.constants.VIEW_SETTINGS = {
	"/graph1/" : tabViewElement,
	// "/graph1/" : graphAreaTabElement1,
	//"/graph2/" : graphAreaTabElement,
	"/takakiwa/" : regionMultiElement

};
