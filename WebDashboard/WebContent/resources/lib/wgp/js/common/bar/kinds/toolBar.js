/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * ツールバーを表すクラス
 */
var toolBar = function(){

	// バー判別用のID
	this.bar_id = null;

	// バーの名称
	this.bar_name = "toolBar";

	// バーに対して適用するスタイルクラス
	this.bar_class = [wgpStyleClassConstants.BAR_AREA, wgpStyleClassConstants.TOOL_BAR_AREA];

	this.bar_item = {
		"saveIconItem" : new saveIconItem()
	};

	// バー内に表示する内容に対いて適用するスタイルクラス
	this.bar_item_class =
		[wgpStyleClassConstants.BAR_ITEM_AREA, wgpStyleClassConstants.TOOL_BAR_ITEM_AREA];
};
toolBar.prototype = new bar();