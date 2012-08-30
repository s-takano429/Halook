/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * 生成するDOMのDTOクラス
 * @param id id
 * @param domKind DOMの種別(DIV、input type="text"等・・・)
 * @param attributes 属性(オブジェクト配列)
 * @param styleClass スタイルクラス(配列)
 * @returns
 */
function wgpDomDto(id, domKind, attributes, styleClasses, styles){
	this.id = id;
	this.domKind = domKind;
	this.attributes = attributes;
	this.styleClasses = styleClasses;
	this.styles = styles;
	this.children = [];
}

wgpDomDto.prototype.addChildren = function( children ){
	this.children = this.children.concat( children );
};