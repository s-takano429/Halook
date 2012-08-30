/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * 表示物に関する抽象クラス
 */
function viewItem(){
};

/**
 * 表示物の実体を生成する。
 */
viewItem.prototype.createViewItem = function(){};

/**
 * 表示物のプロパティを取得する。
 */
viewItem.prototype.getProperty = function(){};

/**
 * 表示物のプロパティを設定する。
 */
viewItem.prototype.setProperty = function(property){};

/**
 * 表示物の実体を取得する。
 */
viewItem.prototype.getEntity = function(){
};

viewItem.prototype.getViewAreaId = function() {
	return this.divId;
};