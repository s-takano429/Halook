/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * 引数にて指定された内容を基にDOM要素の生成を行うクラス
 * ※主にDIVタグの生成を担当
 */
var wgpDomCreator = function(){
};

wgpDomCreator.createDomStringCall = function(wgpDomDto){

	var returnArray = [];
	this.createDomString(returnArray, wgpDomDto);
	return returnArray.join("");
};

wgpDomCreator.createDomString = function(returnArray, wgpDomDto){

	returnArray.push("<");
	returnArray.push(wgpDomDto.domKind + " ");

	if(wgpDomDto.id && wgpDomDto.id.length > 0){
		returnArray.push(" id='" + wgpDomDto.id +"'");
	}

	// 属性の設定
	if(wgpDomDto.attributes ){
		var attributeArray = [];
		$.each(wgpDomDto.attributes, function(index, attribute){
			attributeArray.push(index + "=" + "'" + attribute + "'");
		});
		returnArray.push( attributeArray.join(" ") );
	}

	// スタイルクラスの設定
	if(wgpDomDto.styleClasses ){
		var styleClassArray = [];
		styleClassArray.push("class=\"");
		$.each(wgpDomDto.styleClasses, function(index, styleClass){
			styleClassArray.push(styleClass);

			// 追加するスタイルクラスがある場合
			if(wgpStyleClassConstants.STYLE_ADD_SETTING[styleClass]){
				var addStyleClassArray = wgpStyleClassConstants.STYLE_ADD_SETTING[styleClass];
				styleClassArray = styleClassArray.concat(addStyleClassArray);
			}
		});
		styleClassArray.push("\"");

		returnArray.push( styleClassArray.join(" ") );
	}

	// スタイルの設定
	if(wgpDomDto.styles ){
		var styleArray = [];
		styleArray.push("style=\"");
		$.each(wgpDomDto.styles, function(index, style){
			styleArray.push(index + ":" + style + ";");
		});
		styleArray.push("\"");

		returnArray.push( styleArray.join(" ") );
	}

	returnArray.push(">");

	// 子要素が存在する場合は子要素も配列に入れる
	if(wgpDomDto.children && wgpDomDto.children.length > 0){

		$.each(wgpDomDto.children, function(index, child){

			// 子要素がwgpDOmDtoの場合
			if(typeof(child) == "object"){
				wgpDomCreator.createDomString(returnArray, child);

			// 上記以外はそのまま配列に加える。
			}else{
				returnArray.push( child.toString() );
			}
		});
	}
	returnArray.push("</" + wgpDomDto.domKind + ">");

	return returnArray.join("");
};

