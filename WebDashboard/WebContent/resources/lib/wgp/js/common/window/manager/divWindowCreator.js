/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
var divWindowCreator = function(){

	var instance = this;
	divWindowCreator = function(){
		return instance;
	};
};

/**
 * ウィンドウを作成する。
 * @param window_class_name ウィンドウのクラス名
 * @param window_id ウィンドウID
 * @param divId 作成先のdivId
 */
divWindowCreator.prototype.createWindow = function(
	window_class_name,
	window_id,
	divId, options){
	
	// 作成対象となるウィンドウのないよう部分のクラスインスタンスを取得
	var windowObject = eval("new " + window_class_name + "(options)");

	// ウィンドウIDの設定
	windowObject.window_id = window_id;

	// ウィンドウのビュアー部分を作成する。
	this.createView(windowObject, divId);

	// ウィンドウにイベントを設定する。
	this.setEventFunction(windowObject);

	return windowObject;
};

/**
 * ウィンドウのビュアー部分を作成する。
 */
divWindowCreator.prototype.createView = function(windowObject, divId){
	windowObject.createView(divId);
};

/**
 * ウィンドウにイベントを設定する。
 * @param windowObject
 */
divWindowCreator.prototype.setEventFunction = function(windowObject){
	windowObject.setEventFunction();
};

/**
 * ウィンドウにて使用するメニューを生成する。
 */
divWindowCreator.prototype.createWindowMenu = function(){
};