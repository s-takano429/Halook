/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
var elementPropertyArc = {};

function arc(elementProperty, paper) {
    // 設定が取得できない場合は処理を終了する。
    if (!elementProperty) {
        return this;
    }
    
    elementPropertyArc = elementProperty;
    
    var positionArray = this.createPosition(elementProperty);
    this.createMapElement(positionArray, paper);
    this.setAttributes(elementProperty);

    if (!elementProperty.lineType) {
        elementProperty.lineType = "";
    }

	this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
	this.objectId = elementProperty.objectId;

    this.objectType_ = raphaelMapConstants.CURVE_LINE_TYPE_NAME;
    this.elementName_ = raphaelMapConstants.CURVELINE_ELEMENT_NAME;

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.from = elementProperty.from;
	this.to = elementProperty.to;
	//this.width = elementProperty.width;
	//this.height = elementProperty.height;
	//this.controlPoint1X = elementProperty.controlPoint1X;
	//this.controlPoint1Y = elementProperty.controlPoint1Y;
	//this.controlPoint2X = elementProperty.controlPoint2X;
	//this.controlPoint2Y = elementProperty.controlPoint2Y;

	return this;
};
arc.prototype = new mapElement();

arc.prototype.createPosition = function(elementProperty){

    // ポジションリスト
    var position = {};
    // 始点位置情報
    var startPosition 
    	= new Position(
    			elementProperty.centerX + elementProperty.radius*Math.cos(elementProperty.from * Math.PI / 180),
    			elementProperty.centerY + elementProperty.radius*Math.sin(elementProperty.from * Math.PI / 180)
    );
    var endPosition 
	= new Position(
			elementProperty.centerX + elementProperty.radius*Math.cos(elementProperty.to * Math.PI / 180),
			elementProperty.centerY + elementProperty.radius*Math.sin(elementProperty.to * Math.PI / 180)
);
 
    
    //var controlPosition1 = new Position(elementProperty.controlPoint1X, elementProperty.controlPoint1Y);
    //var controlPosition2 = new Position(elementProperty.controlPoint2X, elementProperty.controlPoint2Y);
    
    position = {
    	startPosition : startPosition
    	,endPosition : endPosition
    };

	return position;
};

arc.prototype.createPathString = function(positionArray) {

    if (!positionArray) {
        return null;
    }
    console.log(elementPropertyArc);
    return  [["M", positionArray.startPosition.x, positionArray.startPosition.y],
             ["A", elementPropertyArc.radius,
                   elementPropertyArc.radius,
                   1,
                   0,
                   1,
                   positionArray.endPosition.x,
                   positionArray.endPosition.y
             ]
    ];
};

