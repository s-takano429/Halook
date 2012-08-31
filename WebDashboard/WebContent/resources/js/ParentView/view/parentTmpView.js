////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var DisplayMode = "node";//"task";


var sampleDatasJob = {
	StartTime : 1346160591456,
	FinishTime : 1346160991946,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	JobName : "PiEstimator",
	Status : "SUCCESS",
};
var sampleDatas = [ {
	StartTime : 1346160591456,
	FinishTime : 1346160591946,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_m_000004_1",
	Hostname : "/abcfield/raoh",
	Status : "SUCCESS",
}, {
	StartTime : 1346160591856,
	FinishTime : 1346160592046,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_r_000033_0",
	Hostname : "/default-rack/raoh02",
	Status : "ERROR",
}, {
	StartTime : 1346160591556,
	FinishTime : 1346160591846,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_m_000004_2",
	Hostname : "/default-rack/kenma",
	Status : "ERROR",
}, {
	StartTime : 1346160591956,
	FinishTime : 1346160592319,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_m_000004_0",
	Hostname : "/default-rack/raoh05",
	Status : "SUCCESS",
}, {
	StartTime : 1346160591446,
	FinishTime : 1346160592246,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_r_000013_0",
	Hostname : "/abcfield/raoh",
	Status : "SUCCESS",
}, {
	StartTime : 1346160591756,
	FinishTime : 1346160592046,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_r_000083_0",
	Hostname : "/default-rack/raoh02",
	Status : "ERROR",
}, {
	StartTime : 1346160591556,
	FinishTime : 1346160592140,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_m_000025_0",
	Hostname : "/oioioi/raoh",
	Status : "SUCCESS",
}, {
	StartTime : 1346160591956,
	FinishTime : 1346160592046,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_r_000033_1",
	Hostname : "/default-rack/raoh02",
	Status : "ERROR",
}, {
	StartTime : 1346160591446,
	FinishTime : 1346160592246,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_m_000028_0",
	Hostname : "/abcfield/raoh",
	Status : "SUCCESS",
}, {
	StartTime : 1346160591756,
	FinishTime : 1346160592046,
	SubmitTime : 1346160591446,
	JobID : "job_201208281744_0012",
	TaskAttemptID : "attempt_201306281744_0012_m_000033_0",
	Hostname : "/default-rack02/menma02",
	Status : "ERROR",
}, ];

// グラフ最小の時間
var minGraphTime = 1346160591446;
// グラフ最大の時間
var maxGraphTime = 1346160592319;
// グラフのインターバルの時間
var intervalTime = maxGraphTime - minGraphTime;
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////ソートの関数の実装///////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ソートのモードを設定///
var sortString = "default";
// ソートのモードとソート用関数の対応付け辞書
// 新しくソートを追加するときは、ここにその名前と、比較関数の定義を対応付ける。
// デフォルトは、taskID順に表示
var taskSortFunctionTable = {
	"task" : taskIDSort,
	"node" : nodeSort
};

// ソートを実際に行う関数
function executeTaskSort(array, mode) {
	if (taskSortFunctionTable[mode] != null) {
		console.log("execute sort");
		array.sort(taskSortFunctionTable[mode]);
	} else
		console.log("didn't execute sort");
}

// 以下ソート関数群
function taskIDSort(first, second) {
	var firstArray = first.TaskAttemptID.split('_');
	var secondArray = second.TaskAttemptID.split('_');
	
	firstArray[4] = firstArray[4].replace(/0/g, '');
	firstArray[5] = firstArray[5].replace(/0/g, '');
	secondArray[4] = secondArray[4].replace(/0/g, '');
	secondArray[5] = secondArray[5].replace(/0/g, '');
	
	
	console.log("sort start"+firstArray[4]+"  "+secondArray[4]);
	console.log("sort start"+firstArray[5]+"  "+secondArray[5]);
	
//	console.log(parseInt(firstArray[1]), parseInt(secondArray[1]));
//	if (parseInt(firstArray[1]) > parseInt(secondArray[1])) {
//		console.log(parseInt(firstArray[1]), parseInt(secondArray[1]));
//		return 1;
//	} else if (parseInt(firstArray[1]) == parseInt(secondArray[1])) {
//		console.log(parseInt(firstArray[2]), parseInt(secondArray[2]));
//		if (parseInt(firstArray[2]) > parseInt(secondArray[2])) {
//			console.log(parseInt(firstArray[2]), parseInt(secondArray[2]));
//			return 1;
//		} else if (parseInt(firstArray[2]) == parseInt(secondArray[2])) {
			console.log(parseInt(firstArray[4]), parseInt(secondArray[4]));
			if (parseInt(firstArray[4]) > parseInt(secondArray[4])) {
				console.log(parseInt(firstArray[4]), parseInt(secondArray[4]));
				return 1;
			} else if (parseInt(firstArray[4]) == parseInt(secondArray[4])) {
				console.log(parseInt(firstArray[5]), parseInt(secondArray[5]));
				if (parseInt(firstArray[5]) > parseInt(secondArray[5])) {
					console.log(parseInt(firstArray[5]), parseInt(secondArray[5]));
					return 1;
				}
			}
//		}
//	}
	return -1;
}

function nodeSort(first, second) {
	// そのまんま
	if (first.Hostname < second.Hostname)
		return -1;
	// 並び替え
	if (first.Hostname > second.Hostname)
		return 1;
	// 等しいときは、時間順
	if (first.StartTime > second.StartTime)
		return 1;
	return -1;
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ParentTmpView = wgp.AbstractView
		.extend({
			initialize : function() {
				this.viewType = wgp.constants.VIEW_TYPE.VIEW;
				this.collection = new parentTmpModelCollection();
				this.attributes = {};
				this.registerCollectionEvent();
				
				// /sortを実施
				executeTaskSort(sampleDatas, DisplayMode);
				for ( var i = 0; i < sampleDatas.length; i++) {
					console.log("HostName :" + sampleDatas[i].Hostname+" "+sampleDatas[i].StartTime);
				}
				for ( var i = 0; i < sampleDatas.length; i++) {
					console.log("taskName :"  + sampleDatas[i].TaskAttemptID);
				}
				// セレクトメニューの追加を行う。////////////////////////////////////////////
				$("#" + this.$el.attr("id"))
						.append(
								'<form><select name="job select" id="jobSelecter"><option value="1">job1</option><option value="2">job2</option><option value="3">job3</option></select></form><div class="clearSpace"></div>'
										+ '<div id="jobInfoSpace" style="border:solid;border-color:green;border-width:4px;"><div id="right_info"></div><div id="left_info"></div></div>'
										+ '<div class="clearSpace"></div>');
				$("#jobSelecter").css({
					width : "200px",
					height : "20px",
					marginTop : "10px",
					marginRight : "10px",
					float : "right",
				});
				$("#jobInfoSpace").css({
					width : "600px",
					height : "60px",
					marginTop : "10px",
					marginRight : "10px",
					float : "right",
				});
				$("#right_info").css({
					width : "300px",
					height : "60px",
					float : "right",
				});
				$("#left_info").css({
					width : "300px",
					height : "60px",
					float : "left",
				});
				$(".clearSpace").css({
					height : "5px",
					clear : "both"
				});
				// ///////////////////////////////////////////////////////////

				// ボタンたちの追加を行う。////////////////////////////////////////////
				$("#" + this.$el.attr("id"))
						.append(
								'<div id="buttons"><input type="button" id="taskButton" value="task"></input></br><input type="button" id="nodeButton" value="node"></input></br><div id="taskInfoSpace" style="border:solid;border-color:red;border-width:4px;"></div>');
				$("#buttons").css({
					marginLeft : "10px",
					float : "left",
				});
				$("#taskButton").css({
					width : "100px",
					height : "40px",
				});
				$("#nodeButton").css({
					// marginLeft:"10px",
					width : "100px",
					height : "40px",
				});
				$("#taskInfoSpace").css({
					width : "110px",
					height : "400px",
					marginTop : "5px",
					marginRight : "5px",
					float : "left",
				});
				// ///////////////////////////////////////////////////////////

				// arrow用のdiv Tagの作成を行う。////////////////////////////////////
				$("#" + this.$el.attr("id")).append(
						'<div id="arrowChart"></div>');
				$("#arrowChart").css({
					width : "750px",
					height : "350px",
					overflow : "scroll",
					overflowX:"hidden",
					float : "right",
					backgroundColor : "#EEEEEE"
				});
				var arrowView = new ArrowChartView({
					id : "arrowChart",
					rootView : this
				});
				// /////////////////////////////////////////////////////////////////

				// graph用のdiv Tagの作成を行う。//////////////////////////////////////
				$("#" + this.$el.attr("id")).append(
						'<div id="dygraphChart"></div>');
				$("#dygraphChart").css({
					width : "700px",
					height : "200px",
					backgroundColor : "#EEEEEE",
					float : "right",
				});

				

				var dygraphView = new DygraphChartView({
					id : "dygraphChart",
					rootView : this
				});

				// /////////////////////////////////////////////////////////////////

				this.maxId = 0;

				var realTag = $("#" + this.$el.attr("id"));
				if (this.width == null) {
					this.width = realTag.width();
				}
				if (this.height == null) {
					this.height = realTag.height();
				}

				// console.log('called initialize parent view');
			},
			render : function() {
				// console.log('call render');
			},
			onAdd : function(element) {
				// console.log('call onAdd');
			},
			onChange : function(element) {
				// console.log('called changeModel');
			},
			onRemove : function(element) {
				// console.log('called removeModel');
			},

		});