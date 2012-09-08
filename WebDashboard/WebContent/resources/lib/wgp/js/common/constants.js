/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 12/07/29
 */
var wgp = {};

wgp.constants = {};

wgp.constants.BACKBONE_EVENT = {};
wgp.constants.BACKBONE_EVENT.SILENT = {silent: true};

wgp.constants.RENDER_TYPE = {};
wgp.constants.RENDER_TYPE.ALL = "all";
wgp.constants.RENDER_TYPE.ADD = "add";
wgp.constants.RENDER_TYPE.DELETE = "delete";
wgp.constants.RENDER_TYPE.UPDATE = "update";

wgp.constants.VIEW_TYPE = {};
wgp.constants.VIEW_TYPE.CONTROL = "control";
wgp.constants.VIEW_TYPE.TAB = "tab";
wgp.constants.VIEW_TYPE.AREA = "area";
wgp.constants.VIEW_TYPE.VIEW = "view";

wgp.constants.CHANGE_TYPE = {};
wgp.constants.CHANGE_TYPE.ADD = 2;
wgp.constants.CHANGE_TYPE.DELETE = 1;
wgp.constants.CHANGE_TYPE.UPDATE = 0;

wgp.constants.STATE = {};
wgp.constants.STATE.NORMAL = "normal";
wgp.constants.STATE.WARN = "warn";
wgp.constants.STATE.ERROR = "error";

wgp.constants.STATE_COLOR = {};
wgp.constants.STATE_COLOR[wgp.constants.STATE.NORMAL]="#00FF00";
wgp.constants.STATE_COLOR[wgp.constants.STATE.WARN]="#FFFF00";
wgp.constants.STATE_COLOR[wgp.constants.STATE.ERROR]="#FF0000";

wgp.constants.IS_CHANGE = {};
wgp.constants.IS_CHANGE.SIZE = {"pointX":true, "pointY":true, "width":true, "height":true};
wgp.constants.IS_CHANGE.STATE = {"state":true};

// url
wgp.constants.URL = {};
wgp.constants.URL.TERM_DATA_URL = "/termData";
wgp.constants.URL.GET_TERM_DATA = wgp.constants.URL.TERM_DATA_URL + "/get";

// tree configuration
wgp.constants.TREE = {};
wgp.constants.TREE.DATA_ID = "tree";
wgp.constants.TREE.CENTER_NODE_ICON = "center";
wgp.constants.TREE.LEAF_NODE_ICON = "leaf";
wgp.constants.TREE.INITAL_OPEN = true;