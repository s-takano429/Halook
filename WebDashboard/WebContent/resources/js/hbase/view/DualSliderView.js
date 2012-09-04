/////////////////////////////////////////////////////////
//               Following is constant                 //
/////////////////////////////////////////////////////////
halook.hbase.dualslider;
var _html = '';
	_html += '<form>\n';
	_html += '<fieldset>\n';
	//_html += '	<label for="valueA">From:</label>\n';
	_html += '	<select name="valueA" id="valueA">\n';
	//_html += '		<optgroup label="2003">\n';
	_html += '			<option value="24 <br>hours ago">24 hours ago</option>\n';
	_html += '			<option value="23 <br>hours ago">23 hours ago</option>\n';
	_html += '			<option value="22 <br>hours ago">22 hours ago</option>\n';
	_html += '			<option value="21 <br>hours ago">21 hours ago</option>\n';
	_html += '			<option value="20 <br>hours ago">20 hours ago</option>\n';
	_html += '			<option value="19 <br>hours ago">19 hours ago</option>\n';
	_html += '			<option value="18 <br>hours ago">18 hours ago</option>\n';
	_html += '			<option value="17 <br>hours ago">17 hours ago</option>\n';
	_html += '			<option value="16 <br>hours ago">16 hours ago</option>\n';
	_html += '			<option value="15 <br>hours ago">15 hours ago</option>\n';
	_html += '			<option value="14 <br>hours ago">14 hours ago</option>\n';
	_html += '			<option value="13 <br>hours ago">13 hours ago</option>\n';
	_html += '			<option value="12 <br>hours ago">12 hours ago</option>\n';
	_html += '			<option value="11 <br>hours ago">11 hours ago</option>\n';
	_html += '			<option value="10 <br>hours ago">10 hours ago</option>\n';
	_html += '			<option value="9 <br>hours ago">9 hours ago</option>\n';
	_html += '			<option value="8 <br>hours ago">8 hours ago</option>\n';
	_html += '			<option value="7 <br>hours ago">7 hours ago</option>\n';
	_html += '			<option value="6 <br>hours ago">6 hours ago</option>\n';
	_html += '			<option value="5 <br>hours ago">5 hours ago</option>\n';
	_html += '			<option value="4 <br>hours ago">4 hours ago</option>\n';
	_html += '			<option value="3 <br>hours ago">4 hours ago</option>\n';
	_html += '			<option value="2 <br>hours ago">2 hours ago</option>\n';
	_html += '			<option value="1 <br>hours ago" selected="selected">1 hour ago</option>\n';
	_html += '			<option value="now">Now</option>\n';
	//_html += '		</optgroup>\n';
	_html += '	</select>\n';
	//_html += '	<label for="valueB">To:</label>\n';
	_html += '	<select name="valueB" id="valueB">\n';
	//_html += '		<optgroup label="2003">\n';
	_html += '			<option value="24 <br>hours ago">24 hours ago</option>\n';
	_html += '			<option value="23 <br>hours ago">23 hours ago</option>\n';
	_html += '			<option value="22 <br>hours ago">22 hours ago</option>\n';
	_html += '			<option value="21 <br>hours ago">21 hours ago</option>\n';
	_html += '			<option value="20 <br>hours ago">20 hours ago</option>\n';
	_html += '			<option value="19 <br>hours ago">19 hours ago</option>\n';
	_html += '			<option value="18 <br>hours ago">18 hours ago</option>\n';
	_html += '			<option value="17 <br>hours ago">17 hours ago</option>\n';
	_html += '			<option value="16 <br>hours ago">16 hours ago</option>\n';
	_html += '			<option value="15 <br>hours ago">15 hours ago</option>\n';
	_html += '			<option value="14 <br>hours ago">14 hours ago</option>\n';
	_html += '			<option value="13 <br>hours ago">13 hours ago</option>\n';
	_html += '			<option value="12 <br>hours ago">12 hours ago</option>\n';
	_html += '			<option value="11 <br>hours ago">11 hours ago</option>\n';
	_html += '			<option value="10 <br>hours ago">10 hours ago</option>\n';
	_html += '			<option value="9 <br>hours ago">9 hours ago</option>\n';
	_html += '			<option value="8 <br>hours ago">8 hours ago</option>\n';
	_html += '			<option value="7 <br>hours ago">7 hours ago</option>\n';
	_html += '			<option value="6 <br>hours ago">6 hours ago</option>\n';
	_html += '			<option value="5 <br>hours ago">5 hours ago</option>\n';
	_html += '			<option value="4 <br>hours ago">4 hours ago</option>\n';
	_html += '			<option value="3 <br>hours ago">4 hours ago</option>\n';
	_html += '			<option value="2 <br>hours ago">2 hours ago</option>\n';
	_html += '			<option value="1 <br>hours ago">1 hour ago</option>\n';
	_html += '			<option value="now" selected="selected">Now</option>\n';
	//_html += '		</optgroup>\n';
	_html += '	</select>\n';
	_html += '</fieldset>\n';
	_html += '</form>\n';
halook.hbase.dualslider.selectHtml = _html;
halook.hbase.dualslider.unit = 60 * 60 * 1000; // hour
halook.hbase.dualslider.id = {};

var DualSliderView = wgp.AbstractView.extend({
	initialize: function(){
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		
		this.fromIdName = "valueA";
		this.toIdName = "valueB";
		this.sliderComponent = null;
		this.unit = halook.hbase.dualslider.unit;
		
		// add slider
		$("#" + this.$el.attr("id")).append(halook.hbase.dualslider.selectHtml);
		this.sliderComponent = $("select#valueA, select#valueB").selectToUISlider();
		
		// adjust slider visual
		$(".ui-slider").css({
			  margin: "30px 30px 50px 20px"
		});
		$("span.ui-slider-label-show").css({
			display: "block",
			fontSize: "14px",
			textAlign: "left",
			width: "100px",
			marginLeft: "2px"/*,
			border: "1px black solid"*/
				
		});
		
		//hide pull down menu
		$("select").hide();
		
		console.log('called initialize parent view');
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
	},
	getSliderComponet : function(){
		return this.sliderComponent;
	},
	getFromToAsArray: function(values){
		// values	: .ui-slider values 
		// 	  		  Ex: [4, 6]
		// return	: [from, to]
		//			  from and to are the time which means how long ago from now
		
		var from = (24 - values[0]) * this.unit;
		var to = (24 - values[1]) * this.unit;
		return [from, to];
	}
	
});

