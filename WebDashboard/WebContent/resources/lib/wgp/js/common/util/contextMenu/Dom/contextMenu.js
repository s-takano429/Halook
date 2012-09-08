/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * コンテキストメニュー内の1メニューを表すクラス
 */
function contextMenu(menuId , menuName ){
	this.menu_id = menuId;
	this.menu_name = menuName;
	this.children = [];
};

contextMenu.prototype.addChildren = function( contextMenuArray ){
	this.children = this.children.concat( contextMenuArray );
};