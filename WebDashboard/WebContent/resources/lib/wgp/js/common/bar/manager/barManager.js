/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
var barManager = function(){

	// バーの作成を行なうクラスインスタンスを取得する。
	this.barCreator = new barCreator();

	// 各バーを区別するためのID(払出用)
	this.max_bar_id = 0;

	// 作成したバーを格納する配列
	this.bar_list = {};

	// シングルトンのための宣言
	var instance = this;
	barManager = function(){
		return instance;
	};
};

/**
 * バーを追加する
 * @param bar_class_name 追加するバーのクラス名
 * @param divId 追加するDIVタグのID
 */
barManager.prototype.addBar = function(bar_class_name, divId){

	// バーIDのカウントアップ及び設定
	this.max_bar_id = this.max_bar_id + 1;
	var barObject = this.barCreator.createBar(bar_class_name, this.max_bar_id, divId);
};