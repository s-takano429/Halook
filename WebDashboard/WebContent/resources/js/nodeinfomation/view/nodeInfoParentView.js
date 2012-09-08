halook.nodeinfo = {};
halook.nodeinfo.parent = {};
halook.nodeinfo.parent.css = {};

halook.nodeinfo.parent.css.informationArea = {
	fontSize : "14px",
	float : "right",
	width : "180px",
	height : "350px",
	border : "1px #dcdcdc solid",
	margin : "190px 20px 0px 0px"
};
halook.nodeinfo.parent.css.legendArea = {
	height : "40px",
	margin : "5px 5px 5px 5px"
};
halook.nodeinfo.parent.css.annotationLegendArea = {
	margin : "0px 0px 0px 0px",
	padding : "5px 5px 5px 5px"
};
halook.nodeinfo.parent.css.dualSliderArea = {
	width : "700px",
	margin : "50px 0px 0px 60px",
};
halook.nodeinfo.parent.css.graphArea = {
	float : "left",
	width : "650px",
	margin : "30px 0px 0px 10px"
};
halook.nodeinfo.ONEDAY_MILLISEC = 86400000;

halook.NodeInfoParentView = wgp.AbstractView.extend({
	initialize : function(argument, treeSettings) {
		this.viewtype = wgp.constants.VIEW_TYPE.VIEW;
		this.graphIds = [];
		this.treeSettings = treeSettings;
		var treeListView = new wgp.TreeView({
			id : "tree",
			rootView : this
		});
		appView.addView(treeListView, "tree");
		console.log(treeListView.collection);
		this.createParseData(treeSettings.id, treeListView.collection);
		// this._setGraphIds(treeSettings.treeId, treeListView.collection);

		this.divId = this.$el.attr("id");
		var id = argument["ids"];
		this.maxId = 0;
		this.viewList = {};

		// dual slider area (add div and css, and make slider)
		$("#" + this.$el.attr("id")).append(
				'<div id="' + id.dualSliderArea + '"></div>');
		$('#' + id.dualSliderArea).css(
				halook.nodeinfo.parent.css.dualSliderArea);
		$('#' + id.dualSliderArea).css(
				halook.nodeinfo.parent.css.dualSliderArea);
		this.dualSliderView = new halook.DualSliderView({
			id : id.dualSliderArea,
			rootView : this
		});
		var instance = this;
		_.each(this.graphIds, function(graphName) {
			console.log(graphName);
			instance._addGraphDivision(graphName);
		})
		// associate with the slider and graph
	},
	render : function() {
		console.log('call render');
	},
	onAdd : function(element) {
		console.log('call onAdd');
	},
	onChange : function(element) {
		console.log('called changeModel');
	},
	onRemove : function(element) {
		console.log('called removeModel');
	},
	_addGraphDivision : function(graphId) {
		console.log(graphId);
		var viewId = null;
		var viewClassName = "halook.ResourceGraphElementView";
		var tempId = graphId.split("/");
		var dataId = tempId[tempId.length - 1];
		console.log(dataId);
		var treeSettings = {
			data : dataId,
			id : graphId,
			measurementUnit : "",
			parentTreeId : "",
			treeId : ""
		};
		var viewAttribute = {
			id : graphId,
			rootView : this,
			graphId : graphId,
			title : dataId,
			noTermData : true,
			width : 250,
			height : 200,
			dateWindow : [ new Date() - 60 * 60 * 1000, new Date() ],
			attributes : {
				xlabel : "Time",
				ylabel : "value",
				labels : [ "time", "PC1", "PC2" ]
			}
		};

		if (viewId == null) {
			viewId = this.maxId;
			this.maxId++;
		} else {
			if (viewId > this.maxId) {
				this.maxId = viewId + 1;
			}
		}

		var newDivAreaId = this.divId + "_" + viewId;
		var newDivArea = $("<div id='" + newDivAreaId + "'></div>");
		$("#" + this.divId).append(newDivArea);
		newDivArea.width(300);
		newDivArea.height(300);

		$.extend(true, viewAttribute, {
			id : newDivAreaId
		});
		var view = eval("new " + viewClassName
				+ "(viewAttribute, treeSettings)");
		var instance = view;
		this.dualSliderView.setScaleMovedEvent(function(from, to) {
			instance.updateDisplaySpan(from, to);
		});
		this.viewList[view.getRegisterId()] = view;

	},
	getTermData : function() {
		console.log(this.collection);
		// データの成型
	},
	_setGraphIds : function(parseId, collection) {
		// console.log(parseId);
		var instance = this;
		_.each(collection.models, function(model) {
			var attr = {};
			var children = collection.where({
				parentTreeId : model.id
			});
			var childrenData = [];
			_.each(children, function(child, index) {
				childrenData.push(instance.createTreeData(child));
			})
			attr["Id"] = treeModel.get("id");

			// icon decided
			var icon = null;
			if (children.length == 0) {
				console.log("0 : " + model.id);
			} else {
				console.log("1 : " + model.id);
			}
			// var children = collection.where({
			// parentTreeId : model.get("id")
			// });
			// console.log(children);
			// if (children.length == 0) {
			// } else {
			// console.log("test" + model.id);
			//
			// }

		})
	},
	createParseData : function(parse, collection) {
		var jsonData = [];
		var instance = this;
		// find root tree
		var rootNodeList = collection.where({
			parentTreeId : ""
		});
		_.each(rootNodeList,
				function(treeModel, index) {
					jsonData.push(instance.createTreeData(parse, treeModel,
							collection));
				});
		return jsonData;
	},
	createTreeData : function(parse, treeModel, collection) {
		var instance = this;

		var attr = {};
		var data = treeModel.get("data");
		var children = collection.where({
			parentTreeId : treeModel.get("id")
		});
		var childrenData = [];
		_.each(children, function(child, index) {
			childrenData
					.push(instance.createTreeData(parse, child, collection));
		})
		attr["Id"] = treeModel.get("id");

		// icon decided
		var icon = null;
		if (children.length == 0) {
			if (treeModel.id.indexOf(parse) != -1) {
				this.graphIds.push(treeModel.get("id"));
				console.log(treeModel.id);
			}
		} else {
		}
		var data = {
			data : {
				title : data,
				attr : attr,
				icon : icon
			},
			children : childrenData
		};
		return data;
	},

});
