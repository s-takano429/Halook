/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function rotatedRectangle(elementProperty, paper){

	// 設定が取得できない場合は処理を終了する。
	if(!elementProperty){
		return this;
	}

	
    // 数値に直す。
	/*
    elementProperty.pointX = parseFloat(elementProperty.centerX);
    elementProperty.pointY = parseFloat(elementProperty.pointY);
    elementProperty.width = parseFloat(elementProperty.width);
    elementProperty.height = parseFloat(elementProperty.height);
    console.log(elementProperty.centerX);
    */

	var positionArray = this.createPositionArray(elementProperty);
    this.createMapElement(positionArray, paper);
    this.object.attr("fill","white");
    this.setAttributes(elementProperty);

//    this.object.attr("fill", "0-#fff-#f00:"+ 0 +"-#fff");

    if (elementProperty.color == null) {
        elementProperty.color = "#FFFFFF";
        this.color = elementProperty.color;
    }
    if (!elementProperty.lineType) {
        elementProperty.lineType = "";
        this.lineType = elementProperty.lineType;
    }

    this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
    this.object.node.setAttribute('class', raphaelMapConstants.CLASS_MAP_ELEMENT);

    this.objectId = elementProperty.objectId;
    this.objectType_ = raphaelMapConstants.POLYGON_TYPE_NAME;
    this.elementName_ = raphaelMapConstants.RECTANGLE_ELEMENT_NAME;

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.width = elementProperty.width;
	this.height = elementProperty.height;

    return this;
};
rotatedRectangle.prototype = new mapElement();

rotatedRectangle.prototype.createPositionArray = function(args){
	var angleRadian = args.angle * Math.PI / 180;
	var angleRadianPlus = (args.angle + 90) * Math.PI / 180;
	var angleRadianMinus = (args.angle - 90) * Math.PI / 180;
	
	var origin = {
		x : (args.radius + args.height) * Math.cos(angleRadian) //ラジアンにする
				+ args.width * Math.cos(angleRadianMinus)/2,
		y : (args.radius + args.height) * Math.sin(angleRadian) //ラジアンにする
				+ args.width * Math.sin(angleRadianMinus)/2
	};
	
	var topEdge = {
		x :  args.width * Math.cos(angleRadianPlus),
		y : args.width * Math.sin(angleRadianPlus)
	};

	var leftEdge = {
		x :  -args.height * Math.cos(angleRadian),
		y : -args.height * Math.sin(angleRadian)
	};

	
	/*
	var angleRadian = args.angle * Math.PI / 180;
	var angleRadianPlus = (args.angle + 90) * Math.PI / 180;
	var angleRadianMinus = (args.angle - 90) * Math.PI / 180;
	
	var origin = {
		x : (args.radius + args.height) * Math.cos(angleRadian) //ラジアンにする
				+ args.width * Math.cos(angleRadianMinus)/2,
		y : (args.radius + args.height) * Math.sin(angleRadian) //ラジアンにする
				+ args.width * Math.sin(angleRadianMinus)/2
	};
	
	var topEdge = {
		x :  args.width * Math.cos(angleRadianPlus),
		y : args.width * Math.sin(angleRadianPlus)
	};

	var leftEdge = {
		x :  -args.height * Math.cos(angleRadian),
		y : -args.height * Math.sin(angleRadian)
	};*/
	
    // ポジションのリスト
    var positionArray = new Array();
    // 左上ポジション
    var firstPosition = new Position(args.centerX + origin.x, args.centerY - origin.y);
    positionArray.push(firstPosition);
    // 右上ポジション
    var secondPosition = new Position(topEdge.x, -topEdge.y);
    positionArray.push(secondPosition);
    // 左下ポジション
    var thirdPosition = new Position(leftEdge.x, -leftEdge.y);
    positionArray.push(thirdPosition);
    // 右下ポジション
    var forthPosition = new Position(-topEdge.x, topEdge.y);
    positionArray.push(forthPosition);

	return positionArray;
};

rotatedRectangle.prototype.createMapElement = function(positionArray, paper) {
    // パス情報
    var path = this.createPathString(positionArray);
    // オブジェクト生成
    this.object = paper.path(path);
    this.object.parentObject_ = this;
};

rotatedRectangle.prototype.getProperty = function() {
    var settings = {
        objectId : this.objectId
        ,objectType : this.objectType_
        ,x : this.x
        ,y : this.y
        ,width : this.width
        ,height : this.height
        ,zIndex : this.getZIndex()
    };
    if (this.color) {
    	settings["color"] = this.color;
    }
    if (this.lineType) {
    	settings["lineType"] = this.lineType;
    }
    return settings;
};