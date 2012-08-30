var HbaseView = wgp.AbstractView.extend({
	initialize: function(){
		this.viewtype = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new HbaseCollection;
		this.attribute = {};
		this.registerCollectionEvent();
		
		
		// initialize for circle
    	this.maxId = 0;
        var realTag = $("#" + this.$el.attr("id"));
        if (this.width == null) {
            this.width = realTag.width();
        }
        if (this.height == null) {
            this.height = realTag.height();
        }
		this.paper =  new Raphael(document.getElementById(this.$el.attr("id")), this.width, this.height);
		
		// add circle
		var ModelData = new wgp.MapElement({
	        objectId : 1,
	        objectName : null,
	        pointX : 100,
	        pointY : 100,
	        width : 250,
	        height : 100,
	        text : "hello"//,
	        //font-size : "20px"
		});
		new wgp.MapStateElementView({
			model : ModelData, 
			paper: this.paper
		});
		
		console.log('hello, instance: HbaseView');
	},
	render : function(){
		console.log('call render');
	},
	onAdd : function(element){
		console.log('call onAdd');
	},
	onChange : function(element){
		console.log('called changeModel');
	},
	onRemove : function(element){
		console.log('called removeModel');
	}
		
		
});

