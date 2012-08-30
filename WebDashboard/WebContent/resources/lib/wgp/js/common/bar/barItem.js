/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * バー内の一つの要素を表すクラス
 */
function barItem(){

	// 要素のID
	this.bar_item_id = null;

	// 要素の名称
	this.bar_item_name = "barItem";

	// 要素のタイトル
	this.bar_item_title = null;

	// 要素の属性
	this.bar_item_attributes = {};

	// 要素のスタイルクラス
	this.bar_item_class = [];

	// 要素のスタイル属性
	this.bar_item_styles = {};
}

/**
 * バーに表示する要素を作成する。
 */
barItem.prototype.createViewDto = function(
	bar_id
	,bar_item_add_class){

	var bar_item_class =
		this.bar_item_class.concat(bar_item_add_class)
		.concat([wgpStyleClassConstants.BAR_ITEM_AREA]);

	this.bar_item_id = bar_id + this.bar_item_name;
	var berItemDto = new wgpDomDto(
		this.bar_item_id
		,"div"
		,this.bar_item_attributes
		,bar_item_class
		,this.bar_item_styles
	);
	berItemDto.addChildren([ this.getContents() ]);
	return wgpDomCreator.createDomStringCall(berItemDto);
};

/**
 * バーの表示内容を返却する。
 */
barItem.prototype.getContents = function(){
	return this.bar_item_title;
};

/**
 * テキストのメニュー内容に対するホバーイベント設定
 * @param barItemId　バー要素のID
 */
barItem.prototype.setTextHoverEventFunction = function(barItemId){

	$("#" + barItemId).bind('mouseover',function(e) {
		$(e.target).addClass("ui-state-hover");

	}).bind('mouseout',function(e) {
		$(e.target).removeClass("ui-state-hover");
	});
};