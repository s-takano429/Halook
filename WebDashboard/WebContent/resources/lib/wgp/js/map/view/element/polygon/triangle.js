/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function triangle(elementProperty, paper){

	// 設定が取得できない場合は処理を終了する。
	if(!elementProperty){
		return this;
	}

	// 数値に直す。
    elementProperty.pointX = parseFloat(elementProperty.pointX);
    elementProperty.pointY = parseFloat(elementProperty.pointY);
    elementProperty.width = parseFloat(elementProperty.width);
    elementProperty.height = parseFloat(elementProperty.height);

    var positionArray = this.createPositionArray(elementProperty);
    this.createMapElement(positionArray, paper);
    this.object.attr("fill","white");
    this.setAttributes(elementProperty);

    if (elementProperty.color == null) {
        elementProperty.color = "#FFFFFF";
    }
    if (!elementProperty.lineType) {
        elementProperty.lineType = "";
    }

    this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
    this.object.node.setAttribute('class', raphaelMapConstants.CLASS_MAP_ELEMENT);

    this.objectId = elementProperty.objectId;
    this.objectType_ = raphaelMapConstants.POLYGON_TYPE_NAME;
    this.elementName_ = raphaelMapConstants.TRIANGLE_ELEMENT_NAME;

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.width = elementProperty.width;
	this.height = elementProperty.height;

    return this;
};
triangle.prototype = new mapElement();

triangle.prototype.createPositionArray = function(elementProperty){

	// ポジションのリスト
	var positionArray = new Array();

    var firstPosition = new Position(elementProperty.pointX + (elementProperty.width / 2), elementProperty.pointY);
    positionArray.push(firstPosition);

    var secondPosition = new Position(-(elementProperty.width / 2), elementProperty.height);
    positionArray.push(secondPosition);

    var thirdPosition = new Position(elementProperty.width, 0);
    positionArray.push(thirdPosition);

    return positionArray;
};

triangle.prototype.createMapElement = function(positionArray, paper){
    // パス情報
    var path = this.createPathString(positionArray);
    // オブジェクト生成
    this.object = paper.path(path);
    this.object.parentObject_ = this;

};