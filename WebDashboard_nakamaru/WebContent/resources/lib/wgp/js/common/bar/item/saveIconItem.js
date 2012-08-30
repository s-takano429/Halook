/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function saveIconItem(){

	// 要素のID
	this.bar_item_id = null;

	// 要素の名称
	this.bar_item_name = "save_icon_bar";

	// 要素のタイトル
	this.bar_item_title = "save";

	// 要素のスタイルクラス
	this.bar_item_class = [];

	// 要素のスタイル属性
	this.bar_item_styles = {};
	
}
saveIconItem.prototype = new barItem();

saveIconItem.prototype.getContents = function(){
	return "<image src='resources/img/icon/saveIcon.png' style='width:20px; height: 20px;' >";
};

saveIconItem.prototype.setEventFunction = function(){

	// イベントを移動させる。
	$("#" + this.bar_item_id).bind("click",
		function(event){
		var divWindowManager_ = new divWindowManager();
		// TODO マップエリアのIDを取得する。
		var windowObject = divWindowManager_.getWindow(1);
		var saveData = windowObject.getAllObjectData("mapAreaViewItem");
		var ajaxHandler = new AjaxHandler();
		var data = {
			saveData : JSON.stringify(saveData),
			dataType : "MAP",
			dataId : "cep"
		};
		var settings = {
			url : common.getContextPath() + "/edit/saveData/",
			data : data
		};
//		settings[ConnectionConstants.SUCCESS_CALL_OBJECT_KEY] = this;
//		settings[ConnectionConstants.SUCCESS_CALL_FUNCTION_KEY] = "callbackSaveData";
		ajaxHandler.requestServerAsync(settings);
		}
	);
};