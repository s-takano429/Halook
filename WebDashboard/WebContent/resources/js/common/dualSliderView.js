/////////////////////////////////////////////////////////
//               Following is constant                 //
/////////////////////////////////////////////////////////

halook.common = {};
halook.common.dualslider = {};
halook.common.dualslider.scaleUnitString = 'hours';
halook.common.dualslider.scaleUnit = 60 * 60 * 1000; // millisecond
halook.common.dualslider.scaleNum = 24 * 1;
halook.common.dualslider.groupString = 'days';
halook.common.dualslider.groupNum = 24;
halook.common.dualslider.idFrom = 'dualSliderFromValue';
halook.common.dualslider.idTo = 'dualSliderToValue';

halook.DualSliderView = wgp.AbstractView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;

		this.sliderComponent = null;
		this.scaleUnitString = halook.common.dualslider.scaleUnitString;
		this.scaleUnit = halook.common.dualslider.scaleUnit;
		this.scaleNum = halook.common.dualslider.scaleNum;
		this.idFrom = halook.common.dualslider.idFrom;
		this.groupString = halook.common.dualslider.groupString;
		this.groupNum = halook.common.dualslider.groupNum;
		this.idTo = halook.common.dualslider.idTo;

		// add slider
		var htmlString = this._getHtml(this.scaleUnitString, this.scaleNum,
				this.groupString, this.groupNum);
		$("#" + this.$el.attr("id")).append(htmlString);
		this._selectSliderScale(this.idFrom, this.scaleNum - 1);
		this._selectSliderScale(this.idTo, this.scaleNum);
		this.sliderComponent = $(
				'select#' + this.idFrom + ', select#' + this.idTo)
				.selectToUISlider();

		// adjust slider visual
		$(".ui-slider").css({
			margin : "50px 30px 50px 20px"
		});

		// adjust label on slider
		$("span.ui-slider-label-show").css({
			display : "block",
			fontSize : "14px",
			textAlign : "left",
			width : "100px",
			marginLeft : "2px"// ,
		// border: "1px black solid"
		});

		// adjust label of group on slider
		$(".ui-slider dt").css({
			// padding : '10px auto 10px auto',
			top : '-70px'
		});
		$("dl.ui-slider-scale dt span").css({
			color : 'red',
			fontSize : '14px'
		});

		// hide pull down menu
		$("select").hide();
		$("select").attr({
			"class" : "pull-slider"
		});

		console.log('initialize (dual slider)');
	},
	render : function() {
		console.log('call render (dual slider)');
	},
	onAdd : function(element) {
		console.log('call onAdd (dual slider)');
	},
	onChange : function(element) {
		console.log('called changeModel (dual slider)');
	},
	onRemove : function(element) {
		console.log('called removeModel (dual slider)');
	},
	_getHtml : function(scaleUnitString, scaleNum, groupString, groupNum) {
		var htmlStr = '';
		htmlStr += '<form>\n';
		htmlStr += '<fieldset>\n';
		htmlStr += '  <select id="' + this.idFrom + '">\n';

		var _htmlStr = '';
		for ( var scale = scaleNum; scale > 0; scale--) {
			if (scale % groupNum == 0) {
				var _groupString = (scale / groupNum) + ' ' + groupString
						+ ' ago';
				_htmlStr += '    <optgroup label="' + _groupString + '">\n';
			}
			;
			_htmlStr += '    <option value="' + scale + '<br>'
					+ scaleUnitString + ' ago">' + scale + ' '
					+ scaleUnitString + ' ago</option>\n';
		}
		;
		_htmlStr += '    <option value="Now">Now</option>\n';

		htmlStr += _htmlStr
		htmlStr += '  </select>\n';
		htmlStr += '  <select id="' + this.idTo + '">\n';
		htmlStr += _htmlStr
		htmlStr += '  </select>\n';
		htmlStr += '</fieldset>\n';
		htmlStr += '</form>\n';

		return htmlStr;
	},
	_selectSliderScale : function(idName, value) {
		$('#' + idName + ' option:eq(' + value + ')').attr("selected",
				"selected");
	},
	_getFromToAsArray : function(values) {
		// values : .ui-slider values
		// Ex: [4, 6]
		// return : [fromMillisecond, toMillisecond]
		// the time which means how long ago from now

		var fromMillisecond = (this.scaleNum - values[0]) * this.scaleUnit;
		var toMillisecond = (this.scaleNum - values[1]) * this.scaleUnit;
		return [ fromMillisecond, toMillisecond ];
	},
	setScaleMovedEvent : function(func) {
		var instance = this;
		this.sliderComponent.bind("slidechange", function(event, ui) {
			var fromtoMillisecond = instance._getFromToAsArray(ui.values);
			var fromMillisecond = fromtoMillisecond[0];
			var toMillisecond = fromtoMillisecond[1];
			func(fromMillisecond, toMillisecond);
		});
	}
});
