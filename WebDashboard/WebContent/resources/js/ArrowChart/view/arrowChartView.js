//paperの高さ
var paperHeight = 1500;
// paperの幅
var paperWidth = 725;
// 矢印絵画領域の始まるオフセット分
var startLineX = 100;
// ひとつのセルの高さの設定
var cellHeight = 80;
// アローチャート部分の長さ
var arrowChartWidth = paperWidth - startLineX;

// string offset
var stringHeightOffset = -10;

//IDと登場回数を記憶する辞書
var idCounter = {};

// //////////////////////////////////////アロー関数群////////////////////////////////////////////////////////////

// アローチャート座標をチャート全体座標系に直す。
function getChartPosition(x, y) {
	return {
		posX : x + startLineX,
		posY : y
	};
}

// /////////////時間から矢印の位置情報への変換を行う関数/////////////////////////////////
// ////////グローバルのminGraph と maxGraph//////////////////////////////////////////
// ////////rowNum は 0 はじまり/////////////////////////////////////////////////////
function calcArrowLengthAndStartPos(startTime, finishTime, trialTime,
		allTrialTime, rowNum) {
	var x = 0, y = 0, width = 0;
	// 幅
	width = arrowChartWidth * (finishTime - startTime) * 1.0 / intervalTime;
	// スタートx位置
	x = startLineX + arrowChartWidth * (startTime - minGraphTime) * 1.0
			/ intervalTime;
	// console.log("startLineX: " + startLineX + " arrowwidth " +
	// arrowChartWidth
	// + " intervalTime " + intervalTime + " startTime " + startTime
	// + " finishTime " + finishTime + " mingraph " + minGraphTime);
	// スタートy位置
	y = cellHeight * trialTime / (1 + allTrialTime) + rowNum * cellHeight;
	// console.log("x = " + x + " y = " + y + " width = " + width);
	return {
		posX : x,
		posY : y,
		length : width
	};
}

// /////////////時間から×印の位置情報への変換を行う関数/////////////////////////////////
// ////////グローバルのminGraph と maxGraph//////////////////////////////////////////
// ////////rowNum は 0 はじまり/////////////////////////////////////////////////////
function calcErrorLengthAndStartPos(eventTime, trialTime, allTrialTime, rowNum) {
	// /////////ここで長さとスタート位置の計算
	var x = 0, y = 0;
	x = startLineX + arrowChartWidth * (eventTime - minGraphTime) * 1.0
			/ intervalTime;
	// スタートy位置
	y = cellHeight * trialTime * 1.0 / (1 + allTrialTime) + rowNum * cellHeight;
	// console.log("x = " + x + " y = " + y);

	return {
		posX : x,
		posY : y
	};
}

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ArrowChartView = wgp.AbstractView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new arrowModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();
		this.paper = new Raphael(document.getElementById(this.$el.attr("id")),
				this.width, this.height);
		this.paper.setSize(paperWidth, paperHeight);
		var sd = new Date();
		var fd = new Date();
		var subd = new Date();
		sd.setTime(sampleDatasJob.StartTime);
		fd.setTime(sampleDatasJob.FinishTime);
		subd.setTime(sampleDatasJob.SubmitTime);
		$("#right_info").html(
				"JobID:" + sampleDatasJob.JobID + "</br>JobName:"
						+ sampleDatasJob.JobName + "</br>STATUS:"
						+ sampleDatasJob.Status + "</br>");
		$("#left_info").html(
				"StartTime:" + sd.toLocaleString() + "</br>FinishTime:"
						+ fd.toLocaleString() + "</br>SUBMIT_TIME:"
						+ subd.toLocaleString() + "</br>");

		// 縦線の表示 端から100px
		var modelData5 = new wgp.MapElement({
			objectId : 0,
			objectName : null,
			height : paperHeight,
			width : 0,
			pointX : startLineX,
			pointY : 0,
			color : "blue"
		});
		new wgp.LineStateElementView({
			model : modelData5,
			paper : this.paper,
			state : "rerror"
		});
		
		///複数会登場するIDの記憶と番号登録
		for(var i = 0; i < sampleDatas.length; i++){
			var idstring = sampleDatas[i].TaskAttemptID;
			var idArray = idstring.split('_');
			idArray[5] = idArray[5].replace(/0/g, '');
			if(idArray[5] != 0){
				if(idCounter[(idArray[3]+"_"+idArray[4])] == undefined)
					idCounter[(idArray[3]+"_"+idArray[4])] = idArray[5];
				else if(idCounter[(idArray[3]+"_"+idArray[4])] < idArray[5])
					idCounter[(idArray[3]+"_"+idArray[4])] = idArray[5];
			}
		}
		
		

		// /セルの線引きの作成
		var cellCounter = Math.floor(paperHeight / cellHeight);
		// console.log(cellCounter + "aaa");
		for ( var i = 0; i < cellCounter + 1; i++) {
			// console.log(i * cellHeight + " cell height");

			var modelData6 = new wgp.MapElement({
				objectId : i + 10000,
				objectName : null,
				height : 0,
				width : paperWidth,
				pointX : 0,
				pointY : i * cellHeight,
				color : "black",
				strokeWidth : 2
			});
			new wgp.LineStateElementView({
				model : modelData6,
				paper : this.paper,
				state : "rerror"
			});
		}

		var i = 0;
		// console.log(sampleDatas);

		// 矢印たちと×印の絵画の作成
		var rowCounter = 0;
		for ( var i = 0; i < sampleDatas.length; i++) {
			var data = sampleDatas[i];
			var modelInfo;
//			if (DisplayMode == "task") {
//				var taskArray = data.TaskAttemptID.split('_');
//				taskArray[5] = taskArray[5].replace(/0/g, '');
//				if(taskArray[5] != 0){
//					rowCounter--;
//				}
				modelInfo = calcArrowLengthAndStartPos(data.StartTime,
						data.FinishTime, 1, 1, rowCounter);
//			} else if(DisplayMode == "node") {
//				modelInfo = calcArrowLengthAndStartPos(data.StartTime,
//						data.FinishTime, 1, 1, i);
//			}
			var modelData9 = new wgp.MapElement({
				objectId : 30000 + i,
				objectName : null,
				height : 0,
				width : modelInfo.length,
				pointX : modelInfo.posX,
				pointY : modelInfo.posY
			});

			// /ID情報を分解する。
			var targetID = data.TaskAttemptID;
			var stringArray = targetID.split('_');
			var stateString;
			// ///statusがエラーの場合の処理はこれも行う

			if (data.Status == "ERROR") {
				var errorInfo = calcErrorLengthAndStartPos(data.FinishTime, 1,
						1, i);
				var modelData3 = new wgp.MapElement({
					objectId : 15,
					objectName : null,
					height : 50,
					width : 50,
					pointX : errorInfo.posX,
					pointY : errorInfo.posY
				});
				if (stringArray[3] == 'm') {
					stateString = "merror";
				} else if (stringArray[3] == 'r') {
					stateString = "rerror";
				}
				new wgp.ErrorStateElementView({
					model : modelData3,
					paper : this.paper,
					state : stateString,
					info : data
				});

			} else {
				if (stringArray[3] == 'm') {

					stateString = "mnormal";
				} else if (stringArray[3] == 'r') {
					stateString = "rnormal";
				}
			}

			new wgp.ArrowStateElementView({
				model : modelData9,
				paper : this.paper,
				state : stateString,
				info : data
			});
			
			rowCounter++;
		}

		// textAreaの描画を行う。
		if (DisplayMode == "task") {
			var rowCounter = 0;
			for ( var i = 0; i < sampleDatas.length; i++) {
				var labelString = sampleDatas[i].TaskAttemptID;
				var stringArray = labelString.split('_');
				stringArray[5] = stringArray[5].replace(/0/g, '');
				if (stringArray[5] != 0) {
					//rowCounter--;
				}

				var modelData5 = new wgp.MapElement({
					objectId : 40000 + i,
					objectName : null,
					height : 0,
					width : 90,
					pointX : 5,
					pointY : cellHeight * 1.0 / 2 + rowCounter * cellHeight, // +
																				// stringHeightOffset,
					text : stringArray[3] + "_" + stringArray[4],
					fontSize : 20
				});
				console.log("-----------" + stringArray[3] + "_"
						+ stringArray[4]);
				new wgp.TextAreaStateElementView({
					model : modelData5,
					paper : this.paper,
					state : "merror"
				});
				rowCounter++;
			}
		} else if (DisplayMode == "node") {

			for ( var i = 0; i < sampleDatas.length; i++) {
				var labelString = sampleDatas[i].Hostname;
				var tmpLabelArray = labelString.split('/');
				labelString = tmpLabelArray.join('\n');
				var modelData5 = new wgp.MapElement({
					objectId : 40000 + i,
					objectName : null,
					height : 0,
					width : 90,
					pointX : 5,
					pointY : cellHeight * 1.0 / 2 + i * cellHeight,// +
																	// stringHeightOffset,//
																	// *
																	// tmpLabelArray.length,
					text : labelString,
					fontSize : 15
				});
				new wgp.TextAreaStateElementView({
					model : modelData5,
					paper : this.paper,
					state : "merror"
				});
			}
		}

		// var modelData = new wgp.MapElement({
		// objectId : 1,
		// objectName : null,
		// height : 0,
		// width : 100,
		// pointX : 150,
		// pointY : 50
		// });
		// new wgp.ArrowStateElementView({
		// model : modelData,
		// paper : this.paper,
		// state : "rerror"
		// });
		//
		// var modelData2 = new wgp.MapElement({
		// objectId : 12,
		// objectName : null,
		// height : 0,
		// width : 200,
		// pointX : 100,
		// pointY : 100
		// });
		// new wgp.ArrowStateElementView({
		// model : modelData2,
		// paper : this.paper,
		// state : "merror"
		// });

		// /////グラフのtaskのカウントを実行

		this.maxId = 0;

		var realTag = $("#" + this.$el.attr("id"));
		if (this.width == null) {
			this.width = realTag.width();
		}
		if (this.height == null) {
			this.height = realTag.height();
		}

		console.log('called initialize');
	},
	render : function() {

		// this.entity.resize(this.width, this.height);

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