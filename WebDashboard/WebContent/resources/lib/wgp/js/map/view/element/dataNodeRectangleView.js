wgp.DataNodeRectangle = Backbone.View.extend({
    initialize:function(argument){
    	/*
    	var args = argument.model.attributes;
    	var angleRadian = args.angle * Math.PI / 180;
    	var angleRadianPlus = (args.angle + 90) * Math.PI / 180;
    	var angleRadianMinus = (args.angle - 90) * Math.PI / 180;
    	
    	this.model.attributes.origin = {
    		x : (args.radius + args.height) * Math.cos(angleRadian) //ラジアンにする
    				+ args.width * Math.cos(angleRadianMinus)/2,
    		y : (args.radius + args.height) * Math.sin(angleRadian) //ラジアンにする
    				+ args.width * Math.sin(angleRadianMinus)/2
    	};
    	
    	this.model.attributes.topEdge = {
    		x :  args.width * Math.cos(angleRadianPlus),
    		y : args.width * Math.sin(angleRadianPlus)
    	};

    	this.model.attributes.leftEdge = {
    		x :  -args.height * Math.cos(angleRadian),
    		y : -args.height * Math.sin(angleRadian)
    	};
    	*/
       	_.bindAll();
    	this.center = argument.center;
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
    	this.model.set({"attributes" : {fill:"#3aa6d0", stroke:"#136787"}}, {silent:true});
        this.render();
    },
    render:function(){
    	this.element = new rotatedRectangle(this.model.attributes, this._paper);
    	//this.element.object.mouseover = function (){alert("aaa");};
    	//console.log(this.element.object);
    	//this.glow = this.element.object.glow({width:20,color:"#fff",opacity:0.3});
    },
    update:function(model){
    	this.element.object.hide();
    	this.hide();
    	this.element.setAttributes(model);
    	this.render();
    },
    hide:function(){
        //this.glow.remove();
        this.element.hide();
    },
    remove:function(property){
        this.element.object.remove();
        //this.glow.remove();
        this.element.hide();
    }
});