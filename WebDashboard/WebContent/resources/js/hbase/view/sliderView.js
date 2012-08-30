
var SliderView = wgp.AbstractView.extend({
	initialize: function(){
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		
		//
		this.fromIdName = "valueA";
		this.toIdName = "valueB";
		
		// define slider html string
		sliderHtmlString = '';
		sliderHtmlString += '<form>\n';
		sliderHtmlString += '<fieldset>\n';
		//sliderHtmlString += '	<label for="valueA">From:</label>\n';
		sliderHtmlString += '	<select name="valueA" id="valueA">\n';
		//sliderHtmlString += '		<optgroup label="2003">\n';
		sliderHtmlString += '			<option value="24">24h</option>\n';
		sliderHtmlString += '			<option value="23">23h</option>\n';
		sliderHtmlString += '			<option value="22">22h</option>\n';
		sliderHtmlString += '			<option value="21">21h</option>\n';
		sliderHtmlString += '			<option value="20">20h</option>\n';
		sliderHtmlString += '			<option value="19">19h</option>\n';
		sliderHtmlString += '			<option value="18">18h</option>\n';
		sliderHtmlString += '			<option value="17">17h</option>\n';
		sliderHtmlString += '			<option value="16">16h</option>\n';
		sliderHtmlString += '			<option value="15">15h</option>\n';
		sliderHtmlString += '			<option value="14">14h</option>\n';
		sliderHtmlString += '			<option value="13">13h</option>\n';
		sliderHtmlString += '			<option value="12">12h</option>\n';
		sliderHtmlString += '			<option value="11">11h</option>\n';
		sliderHtmlString += '			<option value="10">10h</option>\n';
		sliderHtmlString += '			<option value="9">9h</option>\n';
		sliderHtmlString += '			<option value="8">8h</option>\n';
		sliderHtmlString += '			<option value="7">7h</option>\n';
		sliderHtmlString += '			<option value="6">6h</option>\n';
		sliderHtmlString += '			<option value="5">5h</option>\n';
		sliderHtmlString += '			<option value="4">4h</option>\n';
		sliderHtmlString += '			<option value="3">4h</option>\n';
		sliderHtmlString += '			<option value="2">2h</option>\n';
		sliderHtmlString += '			<option value="1" selected="selected">1h</option>\n';
		sliderHtmlString += '			<option value="0">Now</option>\n';
		//sliderHtmlString += '		</optgroup>\n';
		sliderHtmlString += '	</select>\n';
		
		//sliderHtmlString += '	<label for="valueB">To:</label>\n';
		sliderHtmlString += '	<select name="valueB" id="valueB">\n';
		//sliderHtmlString += '		<optgroup label="2003">\n';
		sliderHtmlString += '			<option value="24">24h</option>\n';
		sliderHtmlString += '			<option value="23">23h</option>\n';
		sliderHtmlString += '			<option value="22">22h</option>\n';
		sliderHtmlString += '			<option value="21">21h</option>\n';
		sliderHtmlString += '			<option value="20">20h</option>\n';
		sliderHtmlString += '			<option value="19">19h</option>\n';
		sliderHtmlString += '			<option value="18">18h</option>\n';
		sliderHtmlString += '			<option value="17">17h</option>\n';
		sliderHtmlString += '			<option value="16">16h</option>\n';
		sliderHtmlString += '			<option value="15">15h</option>\n';
		sliderHtmlString += '			<option value="14">14h</option>\n';
		sliderHtmlString += '			<option value="13">13h</option>\n';
		sliderHtmlString += '			<option value="12">12h</option>\n';
		sliderHtmlString += '			<option value="11">11h</option>\n';
		sliderHtmlString += '			<option value="10">10h</option>\n';
		sliderHtmlString += '			<option value="9">9h</option>\n';
		sliderHtmlString += '			<option value="8">8h</option>\n';
		sliderHtmlString += '			<option value="7">7h</option>\n';
		sliderHtmlString += '			<option value="6">6h</option>\n';
		sliderHtmlString += '			<option value="5">5h</option>\n';
		sliderHtmlString += '			<option value="4">4h</option>\n';
		sliderHtmlString += '			<option value="3">4h</option>\n';
		sliderHtmlString += '			<option value="2">2h</option>\n';
		sliderHtmlString += '			<option value="1">1h</option>\n';
		sliderHtmlString += '			<option value="0" selected="selected">Now</option>\n';
		//sliderHtmlString += '		</optgroup>\n';
		sliderHtmlString += '	</select>\n';
		sliderHtmlString += '</fieldset>\n';
		sliderHtmlString += '</form>\n';
		
		// add slider
		$("#" + this.$el.attr("id")).append(sliderHtmlString);
		$("select#valueA, select#valueB").selectToUISlider();
		
		// adjust slider visual
		$(".ui-slider").css({
			  margin: "30px 30px 50px 20px"
		});
		
		//hide pull down menu
		$("select").hide();
		
		console.log(this.test);
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
	//
	setEventOnFrom: function(func){
		//alert("select#" + this.fromIdName)
		//$("select#" + this.fromIdName).bind("click", func);
		$("#handle_" + this.fromIdName).bind("click", func);
		$("select#" + this.fromIdName).change(func);
		//$("#handle_" + this.fromIdName).change(func);
		$(".ui-slider-tic").bind("click", func);
		$(".ui-slider-scale").bind("click", func);
		$(".ui-slider").bind("click", func);
		$("#valueA").change(func);
		
	}
	
});

