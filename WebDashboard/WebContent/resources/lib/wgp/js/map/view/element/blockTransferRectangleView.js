wgp.BlockTransferRectangle = Backbone.View.extend({
    initialize:function(argument){
       	_.bindAll();
    	this.center = argument.center;
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
    	this.model.set({"attributes" : {fill:"#3aa6d0", stroke:"#136787"}}, {silent:true});
    	
    	console.log(this);
        this.render();
    },
    render:function(){
    	console.log('render in vtr');
    	var color = "#fff";//this.model.attributes.color;
    	this.model.set({"attributes" : {fill:color, stroke:color}}, {silent:true});
    	this.element = new rotatedRectangle(this.model.attributes, this._paper);
    },
    update:function(model){
    	this.hide();
    	var color = model.color;
    	//this.model.set({"attributes" : {fill:color, stroke:color}}, {silent:true});
    	this.render();
    },
    remove:function(property){
        this.element.object.remove();
        //this.glow.remove();
        this.element.hide();
    },
    hide:function(){
        this.element.hide();
        //this.glow.remove();
    }
});