/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 12/07/29
 */
wgp.MapElement = Backbone.Model.extend({
    defaults:{
        objectId : null,
        objectName : null,
        pointX : null,
        pointY : null,
        width : null,
        height : null,
        zIndex : null,
        URL : null,
        text : null
    },
    idAttribute:"objectId"
});

var MapElementList = Backbone.Collection.extend({
	model : wgp.MapElement
});