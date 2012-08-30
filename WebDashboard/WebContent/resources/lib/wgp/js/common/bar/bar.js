/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * バーを表すクラス
 */
function bar(){

	// バー判別用のID
	this.bar_id = null;

	// バーの名称
	this.bar_name = "bar";

	// バーに対して適用するスタイルクラス
	this.bar_class = [wgpStyleClassConstants.BAR_AREA];

	// バー内に表示する内容
	this.bar_item = {};

	// バー内に表示する内容に対して適用するスタイルクラス
	this.bar_item_class = [ wgpStyleClassConstants.BAR_ITEM_AREA ];
}

/**
 * バーを作成する。
 */
bar.prototype.createView = function(
	div_tag_id,
	bar_id){

	// IDを生成
	this.bar_id = this.bar_name + bar_id;

	var barDto = new wgpDomDto(
		this.bar_id
		,"div"
		,null
		,this.bar_class
		,null
	);

	// バー内の各子要素を生成する。
	var instance = this;
	$.each(this.bar_item, function(index, item){
		barDto.addChildren( [item.createViewDto(instance.bar_id, instance.bar_item_class)] );
	});

	//　バーとなる文字列を生成してDIVタグ内に追加する。
	var barString = wgpDomCreator.createDomStringCall(barDto);
	$("#" + div_tag_id).append( barString );
};

/**
 * バーにイベントを設定する。
 */
bar.prototype.setEventFunction = function(){
	$.each(this.bar_item, function(index, item){
		item.setEventFunction();
	});
};