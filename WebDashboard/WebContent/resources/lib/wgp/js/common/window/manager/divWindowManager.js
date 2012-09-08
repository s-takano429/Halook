/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
var divWindowManager = function(){

	// ウィンドウの作成を行なうクラスインスタンスを取得する。
	this.creator = new divWindowCreator();

	// 各ウィンドウを区別するためのID(払出用)
	this.max_id = 0;

	// 作成したウィンドウを格納する配列
	this.window_list = {};

	// シングルトンのための宣言
	var instance = this;
	divWindowManager = function(){
		return instance;
	};
};

/**
 * ウィンドウを追加する。
 * @param window_class_name ウィンドウのクラス名
 * @param divId 作成先のdivタグ
 */
divWindowManager.prototype.addWindow = function(window_class_name, divId, option){

	// ウィンドウIDのカウントアップ及び設定
	this.max_id = this.max_id + 1;
	var windowObject = this.creator.createWindow(window_class_name, this.max_id ,divId, option);

	// ウィンドウを管理対象に追加
	this.window_list[this.max_id] = windowObject;
	windowObject.manager = this;
	return this.max_id;
};

/**
 * @param int windowのID
 * @returns {divWindow} windowオブジェクト 
 */
divWindowManager.prototype.getWindow = function(id){
	return this.window_list[id];
};

/**
 * @param windowId windows id
 * @param observer {Observer} observer
 */
divWindowManager.prototype.addObserver = function(windowId, observer){
	var windowObject = this.window_list[windowId];
	windowObject.setObserver(observer);
	observer.addEvent();
};