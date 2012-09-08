wgp.TreeView = wgp.AbstractView.extend({
	defaults : {},
	initialize : function(argument) {
		var instance = this;
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.treeOption = {
			themes : {
				"url" : "resources/css/jsTree/style.css"
			},
			plugins : [ "themes", "json_data", "ui", "crrm" ],
			core : {
				animation : 0,
				load_open : wgp.constants.TREE.INITAL_OPEN
			}
		};
		this.treeCollection = {};
		this.maxId = 0;
		this.targetId = argument["targetId"];
		$("#" + this.$el.attr("id")).mousedown(function(event) {
			var target = event.target;
			if ("A" == target.tagName) {
				var treeId = $(target).attr("id");
				var treeModel = instance.collection.get(treeId);
				instance.clickModel(treeModel);
			}
		});
	},
	render : function(renderType, treeModel) {
		var targetTag = $("#" + this.$el.attr("id"));
		var idAttribute = treeModel.idAttribute;
		if (renderType == wgp.constants.RENDER_TYPE.ALL) {
			this.renderAll();
		} else if (renderType == wgp.constants.RENDER_TYPE.ADD) {
			var parentTreeId = treeModel.get("parentTreeId");
			if (parentTreeId != null && parentTreeId != undefined) {
				targetTag = this.getTreeNode(parentTreeId, idAttribute);
			}

			$("#" + this.$el.attr("id")).jstree("create_node", $(targetTag),
					"inside", this.createTreeData(treeModel));
		} else if (renderType == wgp.constants.RENDER_TYPE.DELETE) {
			if(treeModel.id != null && treeModel.id != undefined){
				targetTag = this.getTreeNode(treeModel.id, idAttribute);
			}
			$("#" + this.$el.attr("id")).jstree("delete_node", $(targetTag));
			
		} else if (renderType == wgp.constants.RENDER_TYPE.UPDATE) {
			if(treeModel.id != null && treeModel.id != undefined){
				targetTag = this.getTreeNode(treeModel.id, idAttribute);
			}
			var data = treeModel.get("data");
			$("#" + this.$el.attr("id")).jstree("rename_node", targetTag, data);
		} else {
			console.log("[treeView] renderType setting error!");
		}
	},
	renderAll : function() {
		// View jsTree
		var settings = this.treeOption;
		settings = $.extend(true, settings, {
			json_data : {
				data : this.createJSONData()
			}
		});
		$("#" + this.$el.attr("id")).jstree(settings);
	},
	onAdd : function(treeModel) {
		if ($("#" + this.$el.attr("id")).children().length == 0) {
			this.renderAll();
		} else {
			this.render(wgp.constants.RENDER_TYPE.ADD, treeModel);
		}
	},
	onChange : function(treeModel) {
		this.render(wgp.constants.RENDER_TYPE.UPDATE, treeModel);
	},
	onRemove : function(treeModel) {
		this.render(wgp.constants.RENDER_TYPE.DELETE, treeModel);
	},
	getTermData : function(){
		this.renderAll();
	},
	createJSONData : function() {
		var jsonData = [];
		var instance = this;
		// find root tree
		var rootNodeList = this.collection.where({parentTreeId : ""});
		_.each(rootNodeList, function(treeModel, index) {
			jsonData.push(instance.createTreeData(treeModel));
		});
		return jsonData;
	},
	createTreeData : function(treeModel) {
		var instance = this;

		var attr = {};
		var data = treeModel.get("data");
		var children = this.collection.where({parentTreeId : treeModel.get("id")});
		var childrenData = [];
		_.each(children, function(child, index) {
			childrenData.push(instance.createTreeData(child));
		})
		attr["Id"] = treeModel.get("id");

		// icon decided
		var icon = null;
		if (children.length == 0) {
			icon = wgp.constants.TREE.LEAF_NODE_ICON;
		} else {
			icon = wgp.constants.TREE.CENTER_NODE_ICON;
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
	clickModel : function(treeModel) {
		if (this.childView) {
			var tmpAppView = new wgp.AppView();
			tmpAppView.removeView(this.childView);
			this.childView = null;
		}
		$("#" + this.targetId).children().remove();

		var dataId = treeModel.get("id");

		var viewSettings = null;
		$.each(wgp.constants.VIEW_SETTINGS, function(index, value) {
			if (dataId.match(index)) {
				viewSettings = value;
				return false;
			}
		});
		if (viewSettings == null) {
			viewSettings = wgp.constants.VIEW_SETTINGS["default"]
			if (viewSettings == null) {
				return;
			}
		}
		

		var viewClassName = viewSettings.viewClassName;
		$.extend(true, viewSettings, {
			id : this.targetId
		});
		var treeSettings = treeModel.attributes;
		this.childView = eval("new " + viewClassName + "(viewSettings, treeSettings)");
	},
	getTreeNode : function(treeId, idAttribute){
		var selector = "[" + idAttribute + "=" + "'" + treeId
		+ "'" + "]";
		return $("#" + this.$el.attr("id")).find(selector);
	}
});