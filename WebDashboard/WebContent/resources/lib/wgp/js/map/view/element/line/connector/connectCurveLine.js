/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function connectCurveLine(elementProperty, paper, mapAreaViewItem) {

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
    var controlPoint1X = pointX + width / 2 + height / 2;
    var controlPoint1Y = pointY - width / 2 + height / 2;
    var controlPoint2X = pointX + width / 2 - height / 2;
    var controlPoint2Y = pointY + width / 2 + height / 2;

	var lineElementProperty = {
		pointX : pointX
		,pointY : pointY
		,width : width
		,height : height
		,controlPoint1X : controlPoint1X
		,controlPoint1Y : controlPoint1Y
		,controlPoint2X : controlPoint2X
		,controlPoint2Y : controlPoint2Y
	};
	var positionArray = this.createPosition(lineElementProperty);
	this.createMapElement(positionArray, paper);
	this.setAttributes(elementProperty);

    if (!elementProperty.lineType) {
        elementProperty.lineType = "";
    }

	this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
	if(this.objectId){
		this.objectId = elementProperty.objectId;
	}else{
		this.objectId = "";
	}

    this.objectType_ = raphaelMapConstants.CONNECT_CURVE_LINE_TYPE_NAME;
    this.elementName_ = raphaelMapConstants.CONNECTCURVELINE_ELEMENT_NAME;

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
	
	// TODO オブジェクトの最背面に位置するように、表示レイヤを変える。
	
    return this;
};
connectCurveLine.prototype = new curveLine();

// 線のリサイズメソッドを借りる。
connectCurveLine.prototype.resizeConnectLine = connectCurveLine.prototype.resize;

connectCurveLine.prototype.resize = function(){

	var pointX = this.connectFromElement.x + ( this.connectFromElement.width / 2);
	var pointY = this.connectFromElement.y + ( this.connectFromElement.height / 2);
	var width = this.connectToElement.x + ( this.connectToElement.width / 2) - pointX;
	var height = this.connectToElement.y + ( this.connectToElement.height / 2) - pointY;

	this.resizeConnectLine(pointX, pointY, width, height);
};