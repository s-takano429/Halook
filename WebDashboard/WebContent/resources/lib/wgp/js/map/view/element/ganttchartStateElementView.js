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
wgp.ganttchartStateElementView = Backbone.View.extend({
    initialize:function(argument){
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
    	var color = this.getStateColor();
    	var strokeWidth = this.getStateStrokeWidth();
    	this.model.set({"attributes" : {stroke:color, "stroke-width" : strokeWidth}}, {silent:true});
    	var leftLine = new wgp.MapElement({
       	    pointX : this.model.attributes.pointX,
    		pointY : this.model.attributes.pointY - 5,
    		width : 0,
    		height : 10,
//    		attributes : {
//    			stroke : color,
//    			"stroke-width" : 4
//    		}
    	});
    	var rightLine = new wgp.MapElement({
    	    pointX : this.model.attributes.pointX + this.model.attributes.width,
    	    pointY : this.model.attributes.pointY - 5,
    	    width : 0,
    	    height : 10,
//    	    attributes : {
//    	    	stroke : color,
//    			"stroke-width" : 4
//    	    }
    	});
    	var jobLabel = new wgp.MapElement({
    			pointX : 30,
    			pointY : this.model.attributes.pointY - 5,
    			text : this.model.attributes.label,
    			fontSize : 10
    	});
    	var jobName = new wgp.MapElement({
    			pointX : this.model.attributes.pointX + this.model.attributes.width / 2,
    			pointY : this.model.attributes.pointY - 5,
    			text : this.model.attributes.text,
    			fontSize : 10
    	});
		var detail = new wgp.MapElement({
				pointX : this.model.attributes.pointX + this.model.attributes.width + 100,
				pointY : this.model.attributes.pointY - 10,
				text : "jobId : " + this.model.attributes.label + "\n jobName : " + this.model.attributes.text
						+ "\n status : " + this.model.attributes.state + "\n submitTime : " + this.model.attributes.submitTime
						+ "\n startTime : " + this.model.attributes.startTime + "\n finishTime : " + this.model.attributes.finishTime,
				fontSize : 12
		});
		leftLine.set({"attributes" : {stroke:color, "stroke-width" : strokeWidth}}, {silent:true});
		rightLine.set({"attributes" : {stroke:color, "stroke-width" : strokeWidth}}, {silent:true});
		jobLabel.set({"attributes" : {stroke:color, "stroke-width" : strokeWidth}}, {silent:true});
		jobName.set({"attributes" : {stroke:color, "stroke-width" : strokeWidth}}, {silent:true});

		this.element = [];
    	this.element.push(
    		new line(this.model.attributes, this._paper),
    		new line(leftLine.attributes, this._paper),
    		new line(rightLine.attributes, this._paper)
//    		new textArea(jobLabel, this._paper),
//    		new textArea(jobName, this._paper)
    	);
    	
		this.element[0].object.click( function() {
	   		new wgp.detailElementView({
				model : detail,
				paper : this.paper
			});
			console.log("click " + detail.attributes.label + ".");
			this.render();
		});
},
    update:function(model){
        var instance = this;
    	var color = this.getStateColor();
    	this.model.set({"fill":color}, {silent:true});
    	this.element.setAttributes(model);
    },
    remove:function(property){
        this.element.hide();
    },
    getStateColor:function(){
        var state = this.model.get("state");
        var color = wgp.constants.STATE_COLOR[state];
        if (color == null) {
            color = wgp.constants.STATE_COLOR[wgp.constants.STATE.NORMAL];
        }
        return color;
    },
    getStateStrokeWidth:function(){
        var width = this.model.get("stroke");
        return width;
    }
});