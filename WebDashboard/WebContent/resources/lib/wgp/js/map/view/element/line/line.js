/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function line(elementProperty, paper) {

    // 設定が取得できない場合は処理を終了する。
    if (!elementProperty) {
        return this;
    }

    // 数値に直す。
    elementProperty.pointX = parseFloat(elementProperty.pointX);
    elementProperty.pointY = parseFloat(elementProperty.pointY);
    elementProperty.width = parseFloat(elementProperty.width);
    elementProperty.height = parseFloat(elementProperty.height);

	var positionArray = this.createPositionArray(elementProperty);
    this.createMapElement(positionArray, paper);
    this.setAttributes(elementProperty);

    if (!elementProperty.lineType) {
        elementProperty.lineType = "";
    }

	this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
    this.object.node.setAttribute('class', raphaelMapConstants.CLASS_MAP_ELEMENT);
	
	this.objectId = elementProperty.objectId;

    this.objectType_ = raphaelMapConstants.LINE_TYPE_NAME;
    this.elementName_ = raphaelMapConstants.LINE_ELEMENT_NAME;

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.width = elementProperty.width;
	this.height = elementProperty.height;

	return this;
};
line.prototype = new mapElement();

line.prototype.createPositionArray = function(elementProperty){

    // ポジションリスト
    var positionArray = new Array();
    // 始点位置情報
    var firstPosition = new Position(elementProperty.pointX, elementProperty.pointY);
    positionArray.push(firstPosition);
    // 終点位置情報
    var secondPosition = new Position(elementProperty.width, elementProperty.height);
    positionArray.push(secondPosition);

	return positionArray;
};

line.prototype.createPathString = function(positionArray) {

    if (!positionArray) {
        return null;
    }

    // サイズ
    size = positionArray.length;
    // パス
    var path = "m ";
    for ( var index = 0; index < size; index++) {
        var position = positionArray[index];
        path = path + " " + position.x + "," + position.y;
    }
    return path;
};

line.prototype.setFrame = function(mapAreaViewItem) {
    if (!this.frame) {
		var paper = mapAreaViewItem.entity;
		var raphaelMapManagerInstance = mapAreaViewItem.managerInstance;

		// 図形の端に表示するオブジェクトの作成
		var frameSize = this.object.getBBox();

        var RADIUS_SIZE = raphaelMapConstants.RADIUS_SIZE; // 枠の半径

		this.frame = {};
		var frameLeftUpper = new ellipseSmall(
			this.x - (RADIUS_SIZE / 2)
			,this.y - (RADIUS_SIZE / 2)
			,RADIUS_SIZE
			,RADIUS_SIZE
			,paper);
		frameLeftUpper.parentObject_ = this;
		frameLeftUpper.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, this.objectId);

		var frameRightBottom = new ellipseSmall(
			this.x + this.width - (RADIUS_SIZE / 2)
			,this.y + this.height - (RADIUS_SIZE / 2)
			,RADIUS_SIZE
			,RADIUS_SIZE
			,paper);

		frameRightBottom.parentObject_ = this;
		frameRightBottom.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, this.objectId);

		this.frame[raphaelMapConstants.LEFT_UPPER] = frameLeftUpper;
		this.frame[raphaelMapConstants.RIGHT_UNDER] = frameRightBottom;

		var instance = this;
		$.each(this.frame, function(index, frameElement){
			frameElement.object.mousedown(function(event){
				raphaelMapManagerInstance.setOnMouseButton(event.button);
			});
			frameElement.object.drag(function(dx, dy){
	            raphaelMapManagerInstance.resizeElement(instance, index, dx, dy, mapAreaViewItem);
	        }, function(x, y, event){
	        	raphaelMapManagerInstance.startResizeElement(instance, index, x, y, event, mapAreaViewItem);
	        }, function(event){
	        
			});

		});

    } else {
        $.each(this.frame, function(index, frameObject) {
            frameObject.object.show();
        });
    }
};

line.prototype.resize = function(x, y, width, height) {
	var elementProperty = {
		pointX : x
		,pointY : y
		,width : width
		,height : height
	};
	var positionArray = this.createPositionArray(elementProperty);
	var path = this.createPathString(positionArray);
	this.object.attr("path", path);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};