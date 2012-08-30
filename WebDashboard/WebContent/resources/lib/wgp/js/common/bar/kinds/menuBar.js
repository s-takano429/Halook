/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * メニューバーを表すクラス
 */
var menuBar = function(){

	// バー判別用のID
	this.bar_id = null;

	// バーの名称
	this.bar_name = "menuBar";

	// バーに対して適用するスタイルクラス
	this.bar_class = [ wgpStyleClassConstants.BAR_AREA, wgpStyleClassConstants.MENU_BAR_AREA];

	// バー内に表示する内容
	this.bar_item = {
		"windowBarItem" : new windowBarItem()
		,"helpBarItem" : new helpBarItem()
	};

	// バー内に表示する内容に対して適用するスタイルクラス
	this.bar_item_class =
		[ wgpStyleClassConstants.BAR_ITEM_AREA, wgpStyleClassConstants.MENU_BAR_ITEM_AREA ];
};
menuBar.prototype = new bar();