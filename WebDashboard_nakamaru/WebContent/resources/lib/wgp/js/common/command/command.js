/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
 */
function command(target, argument) {
	this.target = target;
	this.argument = argument;
};

command.prototype.execute = function() {
};

command.prototype.redo = function() {

};

command.prototype.undo = function() {

};