/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * バーの作成を行なうクラス
 */
var barCreator = function(){

};

/**
 * バーを作成する
 * @param bar_class_name バーのクラス名
 * @param bar_id バーID
 * @param divId 作成先のDIVタグ
 */
barCreator.prototype.createBar = function(
	bar_class_name,
	bar_id,
	divId){

	// 作成対象となるバーのクラスインスタンスを取得
	var barObject = eval("new " + bar_class_name + "()");

	// DIVタグに対してバーを作成する。
	barObject.createView(divId, bar_id);

	// バーにイベントを設定する。
	barObject.setEventFunction();
};