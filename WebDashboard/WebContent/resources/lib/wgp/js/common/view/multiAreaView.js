
wgp.MultiAreaView = wgp.AbstractView.extend({
	initialize: function(argument, treeSettings){
		this.viewType = wgp.constants.VIEW_TYPE.AREA;
		this.collection = new wgp.ViewModelList();
		this.treeSettings = treeSettings;
		this.viewList = {};

		this.divId = this.$el.attr("id");
		this.registerCollectionEvent();
		this.maxId = 0;

		var instance = this;
		var collection = argument["collection"];
		_.each(collection, function(viewElement, index){
			var viewModel = new instance.collection.model(viewElement);
			instance.collection.add(viewModel);
		})
	},
	render : function(){
	},
	onAdd : function(viewModel){
		var viewId = viewModel.get("viewId");
		var viewClassName = viewModel.get("viewClassName");
		var viewAttribute = viewModel.get("viewAttribute");

		if(viewId == null){
			viewId = this.maxId;
			this.maxId++;
		}else{
			if(viewId > this.maxId){
				this.maxId = viewId + 1;
			}
		}

		var width = viewModel.get("width");
		var height = viewModel.get("height");

		var newDivAreaId = this.divId + "_" + viewId;
		var newDivArea = $("<div id='"+ newDivAreaId +"'></div>");
		$("#" + this.divId).append(newDivArea);
		newDivArea.width(width);
		newDivArea.height(height);

		$.extend(true, viewAttribute, {id: newDivAreaId });
		var view = eval("new " + viewClassName + "(viewAttribute, this.treeSettings)");
		this.viewList[view.getRegisterId()] = view;
	},
	destroy : function(){
		_.each(this.viewList, function(view){
			view.destroy();
		})
	}
});