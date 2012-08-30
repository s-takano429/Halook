/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * divタグのアイコンを作成するための関する
 * @param div_tag_id 作成先のdivタグ
 * @param option 作成したアイコンのオプション
 * @param createViewFunction アイコンの中身の描画関数(アイコンのdivタグを引数とする。)
 * @param clickEventFunction アイコンをクリックした際に実行するイベント
 * 
 */
function divIcon(
	div_tag_id
	,option
	,createViewFunction
	,clickEventFunction){

	// アイコン名を取得する。
	var iconName = option["name"];
	var iconDivId = div_tag_id + "_" + iconName;

	// 属性が定義されている場合は取得する。
	var attributes = null;
	if(option["attribute"]){
		attributes = option["attribute"];
	}

	// スタイル属性が定義されている場合は取得する。
	var styles = null;
	if(option["style"]){
		styles = option["style"];
	}

	// スタイルクラスが定義されている場合は取得する。
	var styleClasses = null;
	if(option["styleClass"]){
		styleClasses = option["styleClass"];
	}

	var iconDivDto = new wgpDomDto(
		iconDivId
		,"div"
		,attributes
		,styleClasses
		,styles
	);

	$("#" + div_tag_id).append( wgpDomCreator.createDomStringCall(iconDivDto) );

	// 描画関数が定義されている場合
	if(createViewFunction){
		createViewFunction( iconDivId );
	}

	// クリックイベントを設定する。
	if(clickEventFunction){
		$("#" + iconDivId).click( clickEventFunction );
	}

	this.entity = $("#" + iconDivId);
	return this;
};