wgp.BlockTransferRectangle = Backbone.View.extend({
    initialize:function(argument){
    	
    	var args = argument.model.attributes;
    	var angleRadian = args.angle * Math.PI / 180;
    	var angleRadianPlus = (args.angle + 90) * Math.PI / 180;
    	var angleRadianMinus = (args.angle - 90) * Math.PI / 180;
    	
    	this.model.attributes.origin = {
    		x : args.radius  * Math.cos(angleRadian) 
    				+ args.width * Math.cos(angleRadianMinus)/2,
    		y : args.radius * Math.sin(angleRadian)
    				+ args.width * Math.sin(angleRadianMinus)/2
    	};
    	
    	this.model.attributes.topEdge = {
    		x :  args.width * Math.cos(angleRadianPlus),
    		y : args.width * Math.sin(angleRadianPlus)
    	};

    	this.model.attributes.leftEdge = {
    		x :  -args.radius * 0.8 * Math.cos(angleRadian),
    		y : -args.radius * 0.8 * Math.sin(angleRadian)
    	};

    	
       	_.bindAll();
    	this.center = argument.center;
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
        this.render();
    },
    render:function(){
    	var color = this.model.attributes.color;
    	this.model.set({"attributes" : {fill:color, stroke:"#222222"}}, {silent:true});
    	this.element = new rotatedRectangle(this.model.attributes, this._paper);
    },
    update:function(model){
    	console.log('dnr change method was called')
        var instance = this;
    	var color = "#222222";
    	this.model.set({"fill":color}, {silent:true});
    	this.element.setAttributes(model);
    },
    remove:function(property){
        this.element.hide();
    }
});