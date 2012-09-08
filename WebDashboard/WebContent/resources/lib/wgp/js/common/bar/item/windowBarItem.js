/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * 「Window」バー要素を表すクラス
 */
function windowBarItem(){

	// 要素のID
	this.bar_item_id = null;

	// 要素の名称
	this.bar_item_name = "window_bar";

	// 要素のタイトル
	this.bar_item_title = "Window";

	// 要素の属性
	this.bar_item_attributes = {};

	// 要素のスタイルクラス
	this.bar_item_class = [];

	// 要素のスタイル属性
	this.bar_item_styles = {};
}
windowBarItem.prototype = new barItem();

/**
 * バー要素にイベントを設定する。
 */
windowBarItem.prototype.setEventFunction = function(){

	// クリックされた際に表示するコンテキストメニューを設定する。
	var contextMenu0 = new contextMenu("changeWindow", "change Window");
	var contextMenu0_1 = new contextMenu("mapArea", "MapArea");
	var contextMenu0_2 = new contextMenu("monitoring", "Monitoring");
	contextMenu0.addChildren( [ contextMenu0_1, contextMenu0_2 ] );

	var contextMenuArray = [ contextMenu0 ];

	// コンテキストメニューを初期化
	contextMenuCreator.initializeContextMenu(this.bar_item_name, contextMenuArray);

	// クリック時に表示するコンテキストメニューを生成
	var option = {
		event : "click"
		,openBelowContext : true
		,onSelect : function(event, target){
			if(event.currentTarget.id == "mapArea"){
				document.location = "/WGPProto/MapAreaInit.do";

			}else if(event.currentTarget.id == "monitoring"){
				document.location = "/WGPProto/MonitoringInit.do";
			}
		}
	};
	contextMenuCreator.createContextMenu(this.bar_item_id, this.bar_item_name, option);

	// ホバーイベントを設定
	this.setTextHoverEventFunction(this.bar_item_id);
};