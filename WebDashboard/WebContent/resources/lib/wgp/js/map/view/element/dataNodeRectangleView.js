wgp.DataNodeRectangle = Backbone.View.extend({
    initialize:function(argument){
       	_.bindAll();
    	this.center = argument.center;
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
    	this.model.set({"attributes" : 
    						{
    							fill:this.model.get("color"),
    							stroke:this.model.get("strokeColor")
    						}
    					},
    					{silent:true}
    	);
    	this.host = this.model.attributes.host;
    	this.capacity = this.model.attributes.capacity;
        this.render();
    },
    render:function(){
    	this.element = new rotatedRectangle(this.model.attributes, this._paper);
    	var self = this;
    	var usage = parseInt(this.model.attributes.height / this.capacity * 100);
    	this.element.object.mouseover(function (){
    		$("#nodeStatusBox").html("host : "+self.host+"<br>capacity : "+self.capacity+"<br>usage : "+usage+"%");
    		$("#nodeStatusBox").css("display","block");
    		$("#nodeStatusBox").css("top",parseInt(this.attrs.path[0][2]+50));
    		$("#nodeStatusBox").css("left",parseInt(this.attrs.path[0][1]+50));
    		$("#nodeStatusBox").css("background-color","rgba(255,255,255,0.9)");
    		$("#nodeStatusBox").css("color","#222222");
    		$("#nodeStatusBox").css("z-index",100);    		
    	});
    	this.element.object.mouseout(function (){
    		$("#nodeStatusBox").css("display","none");
    	});
    	//this.glow = this.element.object.glow({width:20,color:"#fff",opacity:0.3});
    },
    update:function(model){
    	this.element.object.hide();
    	this.hide();
    	this.element.setAttributes(model);
    	this.model.set({"attributes" : 
		{
			fill:this.model.get("color"),
			stroke:this.model.get("strokeColor")
		}
	},
	{silent:true}
);
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