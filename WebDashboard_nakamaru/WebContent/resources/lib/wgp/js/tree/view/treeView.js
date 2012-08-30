
wgp.TreeView = wgp.AbstractView.extend({
	defaults : {},
	initialize : function(argument) {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		_.bindAll(this,"addTreeCollection","render");

		this.treeOption = {
			themes : {
				"url" : "resources/css/jsTree/style.css"
			},
			plugins : [ "themes", "json_data", "ui" ],
			fadeIn : 0,
			delay : 0
		};
		this.collection = new TreeModelList();
		this.treeCollection = [];
		this.maxId = 0;
		this.registerCollectionEvent();
		this.targetId = argument["targetId"];

		var collection = argument["collection"];

		// Create TreeCollection
		var instance = this;
		_.each(collection, function(treeElement, index) {
			var treeModel = new instance.collection.model(treeElement);
			instance.collection.add(treeModel);
		});

		$("#" + this.$el.attr("id")).mousedown(function(event){
			var target = event.target;
			if("A" == target.tagName){
				var treeId = $(target).parent("li").attr("treeId");
				var treeModel = instance.collection.get(treeId);
				instance.clickModel(treeModel);
			}
		});
		this.render();
	},
	render : function() {

		// View jsTree
		var settings = this.treeOption;
		settings = $.extend(true, settings, {
			json_data : {
				data : this.treeCollection
			}
		});
		$("#" + this.$el.attr("id")).jstree(settings);

	},
	onAdd : function(treeModel) {
		var id = treeModel.id;
		if (id == null) {
			id = this.maxId;
			this.maxId++;
			treeModel.set({id:id}, wgp.constants.BACKBONE_EVENT.SILENT);
		} else {
			if (id > this.maxId) {
				this.maxId = id + 1;
			}
		}
		this.addTreeCollection(treeModel, this.treeCollection,
				this.addTreeFunction);
		this.render();
	},
	onChange : function(treeModel) {
		this.updateTreeCollection(treeModel, this.treeCollection,
				this.updateTreeFunction);
		this.render();
	},
	onRemove : function(treeModel) {
		this.removeTreeCollection(treeModel, this.treeCollection,
				this.removeTreeFunction);
		this.render();
	},
	addTreeCollection : function(treeModel, treeCollection) {
		var parentTreeId = treeModel.get("parentTreeId");
		var data = this.createTreeData(treeModel);
		var idAttribute = treeModel.idAttribute

		if (treeModel.get("parentTreeId") == null) {
			treeCollection[treeModel.id] = data;
		} else {
			var instance = this;
			_.each(treeCollection, function(tempTreeModel, index) {
				if (tempTreeModel.children.length > 0) {
					instance.addTreeCollection(treeModel,
							tempTreeModel.children);
				}

				if (tempTreeModel.attr[idAttribute] == parentTreeId) {
					var data = instance.createTreeData(treeModel);
					tempTreeModel.children.push(data);
				}
			});
		}
	},
	updateTreeCollection : function(treeModel, treeCollection) {
		var attr = treeModel.get("attr");
		var data = treeModel.get("data");
		var idAttribute = treeModel.idAttribute

		var instance = this;
		_.each(treeCollection, function(tempTreeModel, index){
			if (tempTreeModel.children.length > 0) {
				instance.updateTreeCollection(treeModel,
						tempTreeModel.children);
			}

			if(tempTreeModel.attr[idAttribute] == treeModel.id){
				tempTreeModel["attr"] = attr;
				tempTreeModel["data"] = data;
			}
		});
	},
	removeTreeFunction : function(targetTreeModel, treeModel) {
		$.each(treeCollection, function(index, tempTreeModel){
			if (tempTreeModel.children.length > 0) {
				instance.updateTreeCollection(treeModel,
						tempTreeModel.children);
			}

			if(tempTreeModel.attr["id"] == treeModel.id){
				delete tempTreeModel;
			}
		});
	},
	createTreeData : function(treeModel) {
		var attr = $.extend(true, {}, treeModel.get("attr"));
		var data = treeModel.get("data");
		attr["treeId"] = treeModel.id;

		var data = {
			data : data,
			attr : attr,
			children : []
		};
		return data;
	},
	clickModel : function(treeModel){
		$("#" + this.targetId).children().remove();

		var dataId = treeModel.get("id");
		
		var type = null;
		$.each(wgp.constants.VIEW_SETTINGS, function(index, value){
			if (dataId.match(index)){
				type = value;
				return false;
			}
		});
		if (type == null) {
			type = wgp.constants.VIEW_SETTINGS["default"]
		}
		
		var viewClassName = type.viewClassName;
		$.extend(true, type, {id: this.targetId });
		var view = eval("new " + viewClassName + "(type)");
	}
});