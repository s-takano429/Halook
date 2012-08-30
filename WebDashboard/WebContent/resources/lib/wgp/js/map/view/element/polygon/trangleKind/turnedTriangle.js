/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function turnedTriangle(elementProperty, paper) {

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

    this.object.node.setAttribute('objectId', elementProperty.objectId);
    this.object.node.setAttribute('class', raphaelMapConstants.CLASS_MAP_ELEMENT);

    this.objectId = elementProperty.objectId;
    this.objectType_ = raphaelMapConstants.POLYGON_TYPE_NAME;
    this.elementName_ = raphaelMapConstants.TURNEDTRIANGLE_ELEMENT_NAME;

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.width = elementProperty.width;
	this.height = elementProperty.height;

    return this;
};
turnedTriangle.prototype = new triangle();

turnedTriangle.prototype.createPositionArray = function(elementProperty){

	// ポジションのリスト
	var positionArray = new Array();
	
    // 頂点位置情報
    var firstPosition = new Position(elementProperty.pointX, elementProperty.pointY, null);
    positionArray.push(firstPosition);

    // 底辺位置情報
    var secondPosition = new Position(elementProperty.width, elementProperty.height / 2, null);
    positionArray.push(secondPosition);

    // 底辺位置情報
    var thirdPosition = new Position(-elementProperty.width, elementProperty.height / 2, null);
    positionArray.push(thirdPosition);

    return positionArray;
};