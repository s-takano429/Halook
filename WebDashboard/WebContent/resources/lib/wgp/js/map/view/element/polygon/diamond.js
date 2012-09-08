/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-07-15
*/
function diamond(elementProperty, paper) {

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

//    this.object.attr("fill", "0-#fff-#f00:"+ 0 +"-#fff");

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
    this.elementName_ = raphaelMapConstants.DIAMOND_ELEMENT_NAME;

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.width = elementProperty.width;
	this.height = elementProperty.height;

    return this;
};
diamond.prototype = new mapElement();

diamond.prototype.createPositionArray = function(elementProperty){

	// ポジションのリスト
    var positionArray = new Array();
    // 左上ポジション
    var firstPosition = new Position(elementProperty.pointX, elementProperty.pointY
            + elementProperty.height / 2, null);
    positionArray.push(firstPosition);
    // 右上ポジション
    var secondPosition = new Position(elementProperty.width / 2, -1 * elementProperty.height / 2);
    positionArray.push(secondPosition);
    // 左下ポジション
    var thirdPosition = new Position(elementProperty.width / 2, elementProperty.height / 2);
    positionArray.push(thirdPosition);
    // 右下ポジション
    var forthPosition = new Position(-1 * elementProperty.width / 2, elementProperty.height / 2);
    positionArray.push(forthPosition);

    return positionArray;
};

diamond.prototype.createMapElement = function(positionArray, paper) {
    // パス情報
    var path = this.createPathString(positionArray);
    // オブジェクト生成
    this.object = paper.path(path);
    this.object.parentObject_ = this;

};
