/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
var widgetDropAreaWindow = function(){

	// ウィジェットドロップ領域ウィンドウ
	this.name = "widgetDropAreaWindow";

	var dropAreaViewItemDto = new viewItemDto();
	dropAreaViewItemDto.id=1;
	dropAreaViewItemDto.height = "100%";
	dropAreaViewItemDto.width = "100%";
	dropAreaViewItemDto.position_top = 0;
	dropAreaViewItemDto.position_left = 0;


	// 表示物を指定(ドロップ領域表示物)
	this.view_item = { "dropAreaViewItem" : new dropAreaViewItem()};
	this.view_item_dto = {
		"dropAreaViewItem" : dropAreaViewItemDto
	};

	// 表示物に適用するオプションを指定
	this.view_item_option = {};

	// 表示物に適用するクラス属性を指定
	this.view_item_class = {
		"dropAreaViewItem" : ["jstree-drop"]
	};

	// 表示物に適用するスタイルを指定
	this.view_item_style = {
		"dropAreaViewItem" : {
			"overflow" : "auto",
			"position" : "relative"
		}
	};
};
widgetDropAreaWindow.prototype = new divWindow();

widgetDropAreaWindow.prototype.getData = function(){
	return {"dropAreaViewItem" : {}};
};

widgetDropAreaWindow.prototype.setEventFunction = function(){

	var divId = this.view_item["dropAreaViewItem"].id;
	$("#" + divId).droppable({
		accept : ".widget_class",
		drop : function(e, ui){
			console.log("ドロップ");
		}
	});
};