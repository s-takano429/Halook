var ParentTmpView = wgp.AbstractView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new parentTmpModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();
		//セレクトメニューの追加を行う。////////////////////////////////////////////
//		$("#" + this.$el.attr("id")).append('<form><select name="job select" id="jobSelecter"><option value="1">job1</option><option value="2">job2</option><option value="3">job3</option></select></form><div id="jobInfoSpace" style="border-style=solid;border-color:red;border-width:10px;">aaa</div><div id="clearSpace"></div>');
//		$("#jobSelecter").css({
//			width:"200px",
//			height:"20px",
//			marginTop:"10px",
//			marginRight:"10px",
//			float:"right",
//		});
//		$("#jobInfoSpace").css({
//			width:"600px",
//			height:"80px",
//			marginTop:"10px",
//			marginRight:"10px",
//			float:"right",
//		});
//		$("#clearSpace").css({
//			height:"10px",
//			clear:"both"
//		});
		/////////////////////////////////////////////////////////////
		
		
		//ganttChart用のdiv Tagの作成を行う。////////////////////////////////////
		$("#" + this.$el.attr("id")).append('<div id="ganttChart"></div>');
		$("#ganttChart").css({
			width:"900px",
			height:"400px",
			float:"right",
			backgroundColor:"lightcyan"
		});
		var ganttChartView = new ganttChartChartView({id:"ganttChart", rootView:this});
		///////////////////////////////////////////////////////////////////
		
		this.maxId = 0;

		var realTag = $("#" + this.$el.attr("id"));
        if (this.width == null) {
            this.width = realTag.width();
        }
        if (this.height == null) {
            this.height = realTag.height();
        }

        
		console.log('called initialize parent view');
	},
	render : function() {
		console.log('call render');
	},
	onAdd : function(element) {
		console.log('call onAdd');
	},
	onChange : function(element) {
		console.log('called changeModel');
	},
	onRemove : function(element) {
		console.log('called removeModel');
	},
	

});