/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function image(elementProperty, paper) {

    // 設定が取得できない場合は処理を終了する。
    if(!elementProperty) {
        return this;
    }
    
    // intに直す。
    elementProperty.pointX = parseFloat(elementProperty.pointX);
    elementProperty.pointY = parseFloat(elementProperty.pointY);
    elementProperty.width = parseFloat(elementProperty.width);
    elementProperty.height = parseFloat(elementProperty.height);

	var positionArray = this.createPositionArray(elementProperty);

    this.objectType_ = raphaelMapConstants.IMAGE_TYPE_NAME;
    this.createMapElement(positionArray, paper);
    this.setAttributes(elementProperty);

    if (elementProperty.objectId) {
        this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
        this.objectId = elementProperty.objectId;
    }

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.width = elementProperty.width;
	this.height = elementProperty.height;
};
image.prototype = new mapElement();

image.prototype.createPositionArray = function(elementProperty){
    var positionArray = new Array();
    var imagePosition = new Position(elementProperty.pointX, elementProperty.pointY,
    	elementProperty.width, elementProperty.height);
    imagePosition.URL = elementProperty.URL;
	positionArray.push(imagePosition);

    return positionArray
};

image.prototype.createMapElement = function(positionArray, paper){
    if(!positionArray) {
        return null;
    }

	var position = positionArray[0];
	this.object = paper.image(position.URL, position.x, position.y, position.width,
            position.height);
    this.object.parentObject_ = this;
};

image.prototype.getProperty = function() {
	var baseData = this._getBaseElement();
    // 必須項目を取得して設定する。
    var settings = {
        URL : this.URL
    };
    $.extend(true, baseData, settings);
    return baseData;
};

// 現在使用不可
image.prototype.resize = function(scaleX, scaleY, fulcrumX, fulcrumY) {
    var target = this.object;
    var afterPointerX = fulcrumX + (target.attr("x") - fulcrumX) * scaleX;
    var afterPointerY = fulcrumY + (target.attr("y") - fulcrumY) * scaleY;
    var afterWidth = target.attr("width") * scaleX;
    var afterHeight = target.attr("height") * scaleY;
    target.attr("x", afterPointerX);
    target.attr("y", afterPointerY);
    target.attr("width", afterWidth);
    target.attr("height", afterHeight);
    this.refactorConnectLine();
};

//現在使用不可
image.prototype.setProperty = function(propertiesInfo) {
    var pointX = propertiesInfo.pointX;
    var pointY = propertiesInfo.pointY;
    var width = propertiesInfo.width;
    var height = propertiesInfo.height;

    var raphaelObject = this.object;
    raphaelObject.attr('src', propertiesInfo.URL);
    raphaelObject.attr('x', pointX);
    raphaelObject.attr('y', pointY);
    raphaelObject.attr('width', width);
    raphaelObject.attr('height', height);
    
    this.refactorConnectLine();

    var zIndex = propertiesInfo.zIndex;
    var groupId = propertiesInfo.groupId;

    if(zIndex) {
        this.setZIndex(zIndex);
    }
    if(groupId) {
        this.setGroupNo(groupId);
    }
};