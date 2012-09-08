/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * ドロップ領域表示物
 */
function dropAreaViewItem(){
	// 自身の実体を保持するフィールド
	this.entity = null;
	this.id = null;
};

/**
 * ドロップ領域表示物の実体を生成する。
 */
dropAreaViewItem.prototype.createViewItem = function(div_tag_id, data, option){
	this.entity = $("#" + div_tag_id);
	this.id = div_tag_id;
};

/**
 * ドロップ領域表示物のプロパティを取得する。
 */
dropAreaViewItem.prototype.getProperty = function(){};

/**
 * ドロップ領域表示物のプロパティを設定する。
 */
dropAreaViewItem.prototype.setProperty = function(property){};

/**
 * ドロップ領域表示物の実体を取得する。
 */
dropAreaViewItem.prototype.getEntity = function(){
	return this.entity;
};