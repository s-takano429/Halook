/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function helpBarItem(){

	// 要素のID
	this.bar_item_id = null;

	// 要素の名称
	this.bar_item_name = "help_bar";

	// 要素のタイトル
	this.bar_item_title = "Help";

	// 要素の属性
	this.bar_item_attributes = {};

	// 要素のスタイルクラス
	this.bar_item_class = [];

	// 要素のスタイル属性
	this.bar_item_styles = {};
}
helpBarItem.prototype = new barItem();

/**
 * バー要素にイベントを設定する。
 */
helpBarItem.prototype.setEventFunction = function(){

	// クリックされた際に表示するコンテキストメニューを設定する。
	var contextMenu0 = new contextMenu("homePage", "Home Page");
	var contextMenu1 = new contextMenu("aboutWgp", "About WGP");

	var contextMenuArray = [ contextMenu0, contextMenu1 ];


	// コンテキストメニューを初期化
	contextMenuCreator.initializeContextMenu(this.bar_item_name, contextMenuArray);

	// クリック時に表示するコンテキストメニューを生成
	var instance = this;
	var option = {
		event : "click"
		,openBelowContext : true
		,onSelect : function(event, target){
			if(event.currentTarget.id == "aboutWgp"){
				$("<div><span style='text-align:middle'>Welcom WGP Project...<br/>Version 0.1</span></div>").dialog({"title" : "About WGP"});

			}else if(event.currentTarget.id == "homePage"){
				document.location = "http://wgp.sourceforge.net";
			}
		}
	};
	contextMenuCreator.createContextMenu(this.bar_item_id, this.bar_item_name, option);

	// ホバーイベントを設定
	this.setTextHoverEventFunction(this.bar_item_id);
};