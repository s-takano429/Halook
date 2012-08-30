/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * パースペクティブ内の表示領域を表すクラス
 */
function perspactiveTableViewArea(){

	// 自身に関連付けられているビューのidを保持する。
	this.view_div_id;

	// 表示領域幅
	this.width = 0;

	// 表示領域高さ
	this.height = 0;

	// 表示領域の行結合
	this.rowspan = 1;

	// 表示領域の列結合
	this.colspan = 1;

	// 表示領域内のユーティリティバーのid
	this.util_bar_id;

	// ユーティリティバー内の最小化/元に戻すボタンのid
	this.minimize_restore_id;

	// ユーティリティバー内の非表示ボタンのid
	this.hide_id;

	// 表示領域のうち、ビューをドロップ可能な領域を示すid
	this.drop_area_id;

	// 最小化されている非表示領域を表示する際に適用する幅
	this.restoreWidth;

	// 最小化されている非表示領域を表示する際に適用する高さ
	this.restoreHeight;

	// 最小化されているかどうかを示すフラグ
	this.minimize_flag = false;

	// 非表示かどうかを示すフラグ
	this.hide_flag = false;

	// 隣接するパースペクティブ領域情報
	this.left_up_view_array = [];
	this.up_view_array = [];
	this.right_up_view_array = [];

	this.left_bottom_view_array = [];
	this.bottom_view_array = [];
	this.right_up_view_array = [];

	this.left_view_array = [];
	this.right_view_array = [];
};

/**
 * パースペクティブにビューが関連付けられているかどうかを返却する。
 */
perspactiveTableViewArea.prototype.isRerationView = function(){

	if(this.view_div_id && this.view_div_id != ""){
		return true;
	}else{
		return false;
	}
};