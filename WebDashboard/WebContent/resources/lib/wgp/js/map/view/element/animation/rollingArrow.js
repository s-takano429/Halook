/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
function rollingArrow(elementProperty, paper){

	// 設定が取得できない場合は処理を終了する。
	if(!elementProperty){
		return this;
	}

    // 設定が取得できない場合は処理を終了する。
    if(!elementProperty) {
        return this;
    }

//  基にしたSVG
//	var svg = "M300,300 a50,50,0,1,1,50,-50 h7 l-12,15 l-12,-15 h7 a40,40,0,1,0,-40,40 v10 z";

    elementProperty.pointX = parseFloat(elementProperty.pointX);
    elementProperty.pointY = parseFloat(elementProperty.pointY);
    elementProperty.width = parseFloat(elementProperty.width);
    elementProperty.height = parseFloat(elementProperty.height);

    // 矢印の大きさを算出する
    var arrowSize = elementProperty.width * 0.05;

    // 外側弧の大きさを算出する。
    var outerArcSize = elementProperty.width / 2;

    // 外側弧と内側弧の差を算出する。
    var arrowWidth = elementProperty.height * 0.1;

    // 内側弧の大きさを算出する。
    var innerArcSize = outerArcSize - arrowWidth ;

    // 矢印辺の長さを算出する。
    var arrowLine = arrowSize + (arrowWidth/2);

    // 始点のx座標を指定する。
    var start_x = elementProperty.pointX + outerArcSize;
    var start_y = elementProperty.pointY + elementProperty.width;

    var pathArray = [];
    pathArray.push( "M" + start_x +"," + start_y );
    pathArray.push( "a" + outerArcSize + "," + outerArcSize + ",0,1,1," + outerArcSize + "," + (-outerArcSize));
    pathArray.push( "h" + arrowSize);
    pathArray.push( "l" + -arrowLine + "," + arrowLine );
    pathArray.push( "l" + -arrowLine + "," + -arrowLine );
    pathArray.push( "h" + arrowSize);
    pathArray.push( "a" + innerArcSize + "," + innerArcSize + ",0,1,0," + -innerArcSize + "," + innerArcSize);
    pathArray.push( "v" + arrowWidth);
//    pathArray.push( "z" );
 
    var element = paper.path( pathArray.join(" ") );
    var gradient = 0;
    element.attr("fill","20-#fdd-#f00: "+ gradient +" -#fff");
	this.object = element;

    var rollingAnimation = null;
    var rollingClickEvent = null;
    var resumeClickEvent = null;

    rollingClickEvent = function(){
//    	rollingAnimation = paper.animation({"fill" : "20-#fdd-#f00:"+ gradient +"-#fff"}, 1000 ,null).repeat(Infinity);
//    	element.animate( rollingAnimation );
//    	element.events[0].unbind();
//    	element.click( resumeClickEvent ); 

    	element.attr("fill", 0 + "20-#fdd-#f00:"+ gradient +"-#fff");
 	    if(gradient == 100){
    		gradient = 0;
    	}else{
    		gradient += 2;
    	}
    	
    };

//    resumeClickEvent = function(){
//    	element.pause( rollingAnimation );
//    	element.events[0].unbind();
//
//   	element.click(function(){
//    		element.resume( rollingAnimation );
//    	});
//    };

    element.click( function(){
//    	rollingClickEvent();

		setInterval(rollingClickEvent, 10);
    });

	this.object.node.setAttribute(raphaelMapConstants.OBJECT_ID_NAME, elementProperty.objectId);
    this.objectId = elementProperty.objectId;

	this.x = elementProperty.pointX;
	this.y = elementProperty.pointY;
	this.width = elementProperty.width;
	this.height = elementProperty.height;

    return this;
};
rollingArrow.prototype = new mapElement();
rollingArrow.prototype.setProperty = function(elementProperty){
};