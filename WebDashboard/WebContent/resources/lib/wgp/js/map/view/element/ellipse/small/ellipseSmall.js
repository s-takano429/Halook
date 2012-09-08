/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
 */
function ellipseSmall(x, y, width, height, paper) {

	// ポジションリスト
	var positionArray = new Array();
	// 位置情報
	var position = new Position(parseFloat(x), parseFloat(y),
			parseFloat(width), parseFloat(height));

	positionArray.push(position);
	this.createMapElement(positionArray, paper);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.cx = x + (width / 2);
	this.cy = y + (height / 2);

	this.elementName_ = raphaelMapConstants.ELLIPSE_ELEMENT_NAME;
	this.object.node.setAttribute(raphaelMapConstants.OBJECT_TYPE_FIELD_NAME,
			raphaelMapConstants.ELLIPSESMALL_ELEMENT_NAME);

	return this;
}
ellipseSmall.prototype = new ellipse();