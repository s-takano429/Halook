/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
var wgpStyleClassConstants = function(){
};

wgpStyleClassConstants.STYLE_ADD_SETTING = {};

/** パースペクティブテーブルのスタイルクラス属性名定義 */

// ドロップエリア
wgpStyleClassConstants.PERSPACTIVE_DROP_AREA ="perspactive_drop_Area";

// ユーティリティバー
wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR = "perspactive_util_bar";

wgpStyleClassConstants.PERSPACTIVE_ICON = "perspactive_icon";

// 非表示ボタン
wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_HIDE = "perspactive_util_bar_hide";

// 最小化ボタン
wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_MIN = "perspactive_util_bar_min";

// 元に戻すボタン
wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_RESTORE = "perspactive_util_bar_restore";

// ビューエリア
wgpStyleClassConstants.PERSPACTIVE_VIEW_AREA = "perspactive_view_Area";

// 全てのドロップエリアを囲むクラス
wgpStyleClassConstants.PERSPACTIVE_DROP_AREA_ALL = "perspactive_drop_Area_all";

// 特定のスタイルクラスの場合に追加するスタイルクラスの設定
wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.PERSPACTIVE_DROP_AREA] = [ "ui-widget-content" ];
wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR] = [ "ui-widget-header" ];
wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.PERSPACTIVE_ICON] = [ "ui-icon" ];
wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_HIDE] = [ " ui-icon-circle-close"];
wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_MIN] = [ " ui-icon-circle-minus"];


/** ウィジェットのスタイルクラス属性名定義 */

// ウィジェット全体を囲む領域
wgpStyleClassConstants.WIDGET_AREA = "widget_area";

// ウィジェットヘッダー
wgpStyleClassConstants.WIDGET_HEADER = "widget_header";

// ウィジェットタイトル
wgpStyleClassConstants.WIDGET_TITLE = "widget_title";

// 表示物を配置する領域
wgpStyleClassConstants.WIDGET_VIEW_ITEM_AREA = "widget_view_item_area";

//特定のスタイルクラスの場合に追加するスタイルクラスの設定
wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.WIDGET_HEADER] = [ "ui-widget-header" ];


/** コンテキストメニューのスタイルクラス属性名定義 */
wgpStyleClassConstants.CONTEXT_MENU = "context_menu";

//特定のスタイルクラスの場合に追加するスタイルクラスの設定
wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.CONTEXT_MENU] = ["jeegoocontext", "cm_default"];

/** バーのスタイルクラス属性名定義 */
wgpStyleClassConstants.BAR_AREA = "bar_area";
wgpStyleClassConstants.BAR_ITEM_AREA = "bar_item_area";

// メニューバー固有設定
wgpStyleClassConstants.MENU_BAR_AREA = "menu_bar_area";
wgpStyleClassConstants.MENU_BAR_ITEM_AREA = "menu_bar_item_area";

// ツールバー固有設定
wgpStyleClassConstants.TOOL_BAR_AREA = "tool_bar_area";
wgpStyleClassConstants.TOOL_BAR_ITEM_AREA = "tool_bar_item_area";

wgpStyleClassConstants.STYLE_ADD_SETTING[wgpStyleClassConstants.MENU_BAR_AREA] = ["ui-widget-header"];