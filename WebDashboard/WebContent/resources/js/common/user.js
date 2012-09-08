var graphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		term : 1800,
		noTermData : false
	}
};

var mapTabElement = {
	viewClassName : "wgp.MapView",
	tabTitle : "Map",
};

var graphAreaTabElement = {
	viewClassName : "wgp.MultiAreaView",
	tabTitle : "Graph",
	collection : [ graphViewElement ]
};

var tabViewElement = {
	viewClassName : "wgp.TabView",
	collection : [ mapTabElement, graphAreaTabElement ]
};
var nodeInfoParentView = {
	viewClassName : "halook.NodeInfoParentView",
	viewAttribute : {
		ids : {
			dualSliderArea : "sliderArea",
			graphArea : "graphArea"
		}
	}

};
var hbaseGrowthGraphView = {
	viewClassName : "HbaseView"
};
var sliderView = {
	viewClassName : "SliderView"
};

var nodeInfoField = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	collection : [ nodeInfoParentView ]
};

wgp.constants.VIEW_SETTINGS = {
	"default" : graphViewElement,
	"process" : nodeInfoField,
	"/total/" : graphViewElement,
	"/system/" : graphViewElement,
	"/user/" : graphViewElement
};