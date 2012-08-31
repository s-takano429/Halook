wgp.AppView = Backbone.View.extend({
	initialize : function() {
		_.bindAll();
		this.viewList = {};
		this.viewType = wgp.constants.VIEW_TYPE.CONTROL;
		this.collection = new Backbone.Collection();
	},
	addViews : function(views) {
		var viewList = this.viewList;
		_.each(views, function(view, key) {
			viewList[view.getRegisterId()] = view;
		});
	},
	removeViews : function(views) {
		_.each(views, function(view, index) {
			view.destroy();
		});
	},
	notifyEvent : function(notificationList) {
		this.notifyEventView(notificationList);
		var viewList = this.viewList;
		_.each(viewList, function(view, index) {
			if (view.viewType == wgp.constants.VIEW_TYPE.CONTROL) {
				view.notifyEvent(notificationList);
			}
		});
	},
	notifyEventView : function(notificationList) {
		var viewList = this.viewList;
		_.each(notificationList, function(notification, index) {
			var windowId = notification.windowId;
			var view = viewList[windowId];

			if(view != null && view != undefined){
				var updateDataArray = notification.data;

				_.each(updateDataArray, function(updateData, index) {

					// create Model
					var model = new view.collection.model(updateData);
					var type = updateData.type;

					// Execute Collection Add Event
					if (type == wgp.constants.CHANGE_TYPE.ADD) {
						if (view.collection[model.id] != null) {
							console.log('Collection already Exists');
						} else {
							view.collection.add(model);
						}

						// Execute Collection ChangeModel Event
					} else if (type == wgp.constants.CHANGE_TYPE.UPDATE) {

						var targetModel = view.collection.models[model.id];
						if (targetModel == null || targetModel == undefined) {
							// alert('Collection Can not Update');
						} else {
							_.each(updateData, function(data, index) {
								targetModel.set(index, data, {
									silent : true
								});
							});
							view.collection.trigger("change", targetModel);
						}

					} else if (type == wgp.constants.CHANGE_TYPE.DELETE) {
						view.collection.remove(model);
					}
				});
			}
		});
	}
});