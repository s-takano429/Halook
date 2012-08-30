/*******************************************************************************
 * WGP 0.2 - Web Graphical Platform (https://sourceforge.net/projects/wgp/)
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2012 Acroquest Technology Co.,Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
wgp.RackCurve = Backbone.View.extend({
    initialize:function(argument){
    	
    	var args = argument.model.attributes;
   	
    	this.model.attributes.pointX = args.centerX;//args.centerX + args.radius * Math.cos(args.from * Math.PI / 180);
    	this.model.attributes.pointY = args.centerY;// + args.radius * Math.cos(args.to * Math.PI / 180);
    	this.model.attributes.width = -args.radius * Math.cos((args.to - args.from) * Math.PI / 180);
    	this.model.attributes.height = -args.radius * Math.sin((args.to - args.from) * Math.PI / 180);

    	_.bindAll();
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
        this.render();
    },
    render:function(){
    	console.log('msev render')
    	var color = this.model.attributes.color;
    	this.model.set({"attributes" : {fill:"", stroke:color, "stroke-width":"7px"}}, {silent:true});
    	this.element = new arc(this.model.attributes, this._paper);
    	//this.remove();
    },
    update:function(model){
    	console.log('msev change')
        var instance = this;
    	var color = this.getStateColor();
    	this.model.set({"fill":color}, {silent:true});
    	this.element.setAttributes(model);
    },
    remove:function(element){
		var target = this.viewMap[element.get("objectId")];
		target.remove();
		this.viewMap[element.get("objectId")] = null;
    },
    getStateColor:function(){
        var state = this.model.get("state");
        var color = wgp.constants.STATE_COLOR[state];
        if (color == null) {
            color = wgp.constants.STATE_COLOR[wgp.constants.STATE.NORMAL];
        }
        return color;
    }
});