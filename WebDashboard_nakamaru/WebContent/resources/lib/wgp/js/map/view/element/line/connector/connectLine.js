/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function connectLine(elementProperty, paper, mapAreaViewItem) {

    // 設定が取得できない場合は処理を終了する。
    if (!elementProperty) {
        return this;
    }

	var raphaelMapManagerInstance = mapAreaViewItem.managerInstance;

	// プロパティを取得する。
	var connectFromElement;
	if(elementProperty.connectFromElement){
		connectFromElement = elementProperty.connectFromElement;
	}else{
		connectFromElement = raphaelMapManagerInstance.elementList_[elementProperty.connectFromElementId];
	}

	var connectToElement;
	if(elementProperty.connectToElement){
		connectToElement = elementProperty.connectToElement;
	}else{
		connectToElement = raphaelMapManagerInstance.elementList_[elementProperty.connectToElementId];
	}

	var pointX = connectFromElement.x + (connectFromElement.width / 2);
	var pointY = connectFromElement.y + (connectFromElement.height / 2);
	var width = connectToElement.x + (connectToElement.width / 2) - pointX;
	var height = connectToElement.y + (connectToElement.height / 2) - pointY;

	var lineElementProperty = {
		pointX : pointX
		,pointY : pointY
		,width : width
		,height : height
	};
	var positionArray = this.createPositionArray(lineElementProperty);
	this.createMapElement(positionArray, paper);
	this.setAttributes(elementProperty);

    if (!elementProperty.lineType) {
        elementProperty.lineType = "";
    }

	this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
    this.object.node.setAttribute('class', raphaelMapConstants.CLASS_MAP_ELEMENT);

    if(this.objectId){
		this.objectId = elementProperty.objectId;
	}else{
		this.objectId = "";
	}

    this.objectType_ = raphaelMapConstants.CONNECT_LINE_TYPE_NAME;
    this.elementType_ = raphaelMapConstants.CONNECTLINE_ELEMENT_NAME;

    // 選択先に設定を行う。
    if(!connectFromElement.connectFromLinesList){
    	connectFromElement.connectFromLineList = {};
    }
    connectFromElement.connectFromLineList[this.objectId] = this;

	if(!connectToElement.connectToLineList){
		connectToElement.connectToLineList = {};
	}
    connectToElement.connectToLineList[this.objectId] = this;

	// コネクト線に設定を行う。
	this.connectFromElement = connectFromElement;
	this.connectToElement = connectToElement;

    return this;
};
connectLine.prototype = new line();

// 線のリサイズメソッドを借りる。
connectLine.prototype.resizeConnectLine = connectLine.prototype.resize;

connectLine.prototype.resize = function(){

	var pointX = this.connectFromElement.x + ( this.connectFromElement.width / 2);
	var pointY = this.connectFromElement.y + ( this.connectFromElement.height / 2);
	var width = this.connectToElement.x + ( this.connectToElement.width / 2) - pointX;
	var height = this.connectToElement.y + ( this.connectToElement.height / 2) - pointY;

	this.resizeConnectLine(pointX, pointY, width, height);
};