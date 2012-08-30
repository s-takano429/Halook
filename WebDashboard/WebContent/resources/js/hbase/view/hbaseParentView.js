
var HbaseParentView = wgp.AbstractView.extend({
	initialize: function(){
		this.viewtype = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new HbaseParentCollection();
		//this.registerCollectionEvent();
		
		// add slider area
		$("#" + this.$el.attr("id")).append('<div id="sliderField"></div>');
		var sliderView = new SliderView({id:"sliderField", rootView:this});
		$("#sliderField").css({
			width : "700px",
			//height: "300px",
			margin: "50px",
		});
		
		// add graph area
		$("#" + this.$el.attr("id")).append('<div id="hbaseGraph"></div>');
		var hbaseView = new HbaseView({id:"hbaseGraph", rootView:this});
		
		// add event 
		var func = function(){
			alert("tesaaaaat");
		};
		sliderView.setEventOnFrom(func);
		
		
		
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

