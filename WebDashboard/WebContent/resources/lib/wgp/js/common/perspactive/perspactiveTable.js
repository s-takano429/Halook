/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * 一つのパースペクティブを表すクラス
 */
function perspactiveTable(perspactiveInformation) {

	// パースペクティブテーブル情報を基にテーブルの段組情報を解釈しやすい形に変更する。
	var persepactiveYMax = perspactiveInformation.length;
	var persepactiveXMax = 0;
	for ( var index_y = 0; index_y < persepactiveYMax; index_y++) {
		if (persepactiveXMax < perspactiveInformation[index_y].length) {
			persepactiveXMax = perspactiveInformation[index_y].length;
		}
	}

	// あらかじめ必要な分の配列を生成しておく。
	var table = new Array(persepactiveYMax);
	for ( var index_y = 0; index_y < persepactiveYMax; index_y++) {
		table[index_y] = new Array(persepactiveXMax);
	}

	// パースペクティブテーブル情報を解釈しやすい形に再構成する。
	for ( var index_y = 0; index_y < persepactiveYMax; index_y++) {
		for ( var index_x = 0; index_x < perspactiveInformation[index_y].length; index_x++) {

			// パースペクティブ領域情報を取得する。
			var tableViewArea = perspactiveInformation[index_y][index_x];

			var findFlag = false;
			for ( var tableIndex_y = 0; tableIndex_y < table.length;) {
				for ( var tableIndex_x = 0; tableIndex_x < table[tableIndex_y].length;) {
					if (table[tableIndex_y][tableIndex_x] == undefined) {
						findFlag = true;
					}

					if (findFlag) {
						break;
					} else {
						tableIndex_x++;
					}
				}

				if (findFlag) {
					break;
				} else {
					tableIndex_y++;
				}
			}

			for ( var rowspanIndex = 0; rowspanIndex < tableViewArea.rowspan; rowspanIndex++) {
				for ( var colspanIndex = 0; colspanIndex < tableViewArea.colspan; colspanIndex++) {
					table[tableIndex_y + rowspanIndex][tableIndex_x
							+ colspanIndex] = tableViewArea;
				}
			}

			// パースペクティブ領域情報に最終行番号及び最終列番号を加える。
			tableViewArea.first_index_y = tableIndex_y;
			tableViewArea.first_index_x = tableIndex_x;
			tableViewArea.last_index_y = tableIndex_y + rowspanIndex - 1;
			tableViewArea.last_index_x = tableIndex_x + colspanIndex - 1;
		}
	}

	// 隣接するパースペクティブ領域に関する情報を設定する。
	var alreadySetting = {}; 
	for(var index_y=0; index_y < table.length; index_y++){
		for(var index_x=0; index_x < table[index_y].length; index_x++){

			var targetViewArea = table[index_y][index_x];
			if(alreadySetting[targetViewArea.drop_area_id] == true  ){
				continue;
			}
			alreadySetting[targetViewArea.drop_area_id] = true;

			// 左上方向・上方向・右上方向に隣接するパースペクティブ領域
			var left_up_view_array = [];
			var up_view_array = [];
			var right_up_view_array = [];

			// 左下方向・下方向･右下方向に隣接するパースペクティブ領域
			var left_bottom_view_array = [];
			var bottom_view_array = [];
			var right_bottom_view_array = [];

			// 左方向に隣接するパースペクティブ領域
			var left_view_array = [];

			// 右方向に隣接するパースペクティブ領域
			var right_view_array = [];

			var alreadySettingLoop = {};
			for(var temp_index_y=0; temp_index_y < table.length; temp_index_y++){
				for(var temp_index_x=0; temp_index_x < table[temp_index_y].length; temp_index_x++){

					var indexViewArea = table[temp_index_y][temp_index_x];
					if( indexViewArea.drop_area_id == targetViewArea.drop_area_id ||
						alreadySettingLoop[indexViewArea.drop_area_id] == true){
						continue;
					}
					alreadySettingLoop[indexViewArea.drop_area_id] = true;

					// 左上方向に隣接する場合
					if(targetViewArea.first_index_y - 1 == indexViewArea.last_index_y &&
						targetViewArea.first_index_x - 1 == indexViewArea.last_index_x 
					){
						left_up_view_array.push(indexViewArea);
						continue;
					}

					// 右上方向に隣接する場合
					if(targetViewArea.first_index_y - 1 == indexViewArea.last_index_y &&
						targetViewArea.last_index_x + 1 == indexViewArea.first_index_x
					){
						right_up_view_array.push(indexViewArea);
						continue;
					}

					// 左下方向に隣接する場合
					if(targetViewArea.last_index_y + 1 == indexViewArea.first_index_y &&
						targetViewArea.first_index_x - 1 == indexViewArea.last_index_x
					){
						left_bottom_view_array.push(indexViewArea);
						continue;
					}

					// 右下方向に隣接する場合
					if(targetViewArea.last_index_y + 1 == indexViewArea.first_index_y &&
						targetViewArea.last_index_x + 1 == indexViewArea.first_index_x
					){
						right_bottom_view_array.push(indexViewArea);
						continue;
					}

					// 上方向に隣接する場合
					if(targetViewArea.first_index_y - 1 == indexViewArea.last_index_y){
						up_view_array.push(indexViewArea);
						continue;
					}

					// 下方向に隣接する場合
					if(targetViewArea.last_index_y + 1 == indexViewArea.first_index_y){
						bottom_view_array.push(indexViewArea);
						continue;
					}

					// 左方向に隣接する場合
					if(targetViewArea.first_index_x - 1 == indexViewArea.last_index_x){
						left_view_array.push(indexViewArea);
						continue;
					}

					// 右方向に隣接する場合
					if(targetViewArea.last_index_x + 1 == indexViewArea.first_index_x){
						right_view_array.push(indexViewArea);
						continue;
					}
				}
			}

			// 隣接するパースペクティブ領域の情報を設定
			targetViewArea.left_up_view_array = left_up_view_array;
			targetViewArea.up_view_array = up_view_array;
			targetViewArea.right_up_view_array = right_up_view_array;

			targetViewArea.left_bottom_view_array = left_bottom_view_array
			targetViewArea.bottom_view_array = bottom_view_array;
			targetViewArea.right_bottom_view_array = right_bottom_view_array;

			targetViewArea.left_view_array = left_view_array;
			targetViewArea.right_view_array = right_view_array;
		}
	}

	// 生成したパースペクティブテーブルを2次元配列として保持する。
	this.table = table;
	this.targetIndex_x;
	this.targetIndex_y;

	this.max_width = 0;
	this.max_height = 0;

	// パースペクティブの最大幅を取得する。
	alreadySetting = {};
	for(var index_x = 0; index_x < this.table[0].length; index_x++){
		var indexViewArea = this.table[0][index_x];

		if(alreadySetting[ indexViewArea.drop_area_id ] != true){
			this.max_width = this.max_width + indexViewArea.width;
			alreadySetting[ indexViewArea.drop_area_id ] = true;
		}
	}
	
	// パースペクティブの最大高さを取得する。
	alreadySetting = {};
	for(var index_y = 0; index_y < this.table.length; index_y++){
		var indexViewArea = this.table[index_y][0];

		if(alreadySetting[ indexViewArea.drop_area_id ] != true){
			this.max_height = this.max_height + indexViewArea.height;
			alreadySetting[ indexViewArea.drop_area_id ] = true;
		}
	}

	// ドロップ可能なウィンドウの定義
	this.droppableClass = "perspactive_window";

	// 最小化時の幅
	this.minimize_width = 30;

	// 最小化時の高さ
	this.minimize_height = 20;
};

/**
 * パースペクティブテーブルを使用可能な状態となるように位置指定などを適用する。
 */
perspactiveTable.prototype.prepareTable = function(){

	var table = this.table;
	var alreadySetting = {};

	var max_index_y = table.length;

	// zインデックス初期値
	var zIndex = 10;
	var zIndex_margin = 10;

	// パースペクティブエリア全体を囲むクラスのtop,leftを取得する。
	var dropAreaAllDiv = $("." + wgpStyleClassConstants.PERSPACTIVE_DROP_AREA_ALL);
	dropAreaAllDiv.width( this.max_width + 10 );
	dropAreaAllDiv.height( this.max_height + 10 );

	for(var index_y=0; index_y < max_index_y; index_y++){

		var max_index_x = table[index_y].length;
		for(var index_x=0; index_x < max_index_x; index_x++){

			// パースペクティブテーブル情報を取得する。
			var targetViewArea = table[index_y][index_x];

			// 既に設定済みの場合は処理を行なわない。
			if(alreadySetting[targetViewArea.drop_area_id]){
				continue;
			}else{
				alreadySetting[targetViewArea.drop_area_id] = true;
			}

			// 非表示でない場合に幅・高さの設定を行なう。
			if(!targetViewArea.hide_flag){
				
				var utilBarId = targetViewArea.util_bar_id;
				var miniRestoreIconId = targetViewArea.minimize_restore_id;
				var hideIconId = targetViewArea.hide_id;
				var dropAreaId = targetViewArea.drop_area_id;

				// 各ボタンについて指定を行なう。
				if(targetViewArea.minimize_flag){
					common.addClassWrapperJQuery( $("#" + miniRestoreIconId) , wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_RESTORE );
				}else{
					common.addClassWrapperJQuery( $("#" + miniRestoreIconId) , wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_MIN );
				}

				if(!targetViewArea.hide_flag){
					common.addClassWrapperJQuery( $("#" +hideIconId) , wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_HIDE );
				}

				// 一つ手前のパースペクティブの次に配置されるように位置を修正する。
				var sumTop = 0;
				if(index_y > 0){
					var beViewAreaTop = table[index_y - 1 ][index_x ];
					var tempViewDiv = $("#" + beViewAreaTop.drop_area_id);

					var tempViewDivPosition = tempViewDiv.position();
					sumTop = tempViewDivPosition.top + tempViewDiv.height();
				}else{
					sumTop = 3;
				}

				var sumLeft = 0;
				if(index_x > 0){
					beforeViewAreaLeft = table[index_y][index_x - 1];
					var tempViewDiv = $("#" + beforeViewAreaLeft.drop_area_id);

					var tempViewDivPosition = tempViewDiv.position();
					sumLeft = tempViewDivPosition.left + tempViewDiv.width();
				}else{
					sumLeft = 3;
				}

				// ドロップ領域について指定を行なう。
				var dropAreaDiv = $("#" + dropAreaId);
				dropAreaDiv.css("position", "absolute");
				dropAreaDiv.css("top", 0 + sumTop + 1 );
				dropAreaDiv.css("left", 0 + sumLeft + 1 );

				dropAreaDiv.width( targetViewArea.width );
				dropAreaDiv.height( targetViewArea.height );
				dropAreaDiv.zIndex( zIndex );

				// ユーティリティバーについて指定を行なう。
				var utilBarDiv = $("#" + utilBarId);
				utilBarDiv.css("position", "relative");
				utilBarDiv.css("top", 0 );
				utilBarDiv.css("left", 0 );
				utilBarDiv.width( "100%");
				utilBarDiv.zIndex( zIndex );

				// ビューの位置指定を行なうメソッドを呼び出す
				this.resetViewPosition(targetViewArea);
			}

			zIndex = zIndex + zIndex_margin;
		}
	}
};

/**
 * パースペクティブ領域内のビューの位置・大きさをリセットする。
 */
perspactiveTable.prototype.resetViewPosition = function(targetViewArea) {

	var margin = 10;

	// ビューが関連付いている場合のみ処理を行う。
	if(targetViewArea.isRerationView()){

		//　パースペクティブ領域の情報よりドロップ領域・バー領域を取得する。
		var dropAreaDiv = $("#" + targetViewArea.drop_area_id );
		var utilBarDiv = $("#" + targetViewArea.util_bar_id);

		// ビュー領域を取得する。
		var viewAreaDiv = $("#" + targetViewArea.view_div_id);

		// ビュー領域の位置及び大きさを再設定する。
		viewAreaDiv.width( dropAreaDiv.width() - margin );
		viewAreaDiv.height( dropAreaDiv.height() - utilBarDiv.height() - margin);
		viewAreaDiv.zIndex( dropAreaDiv.zIndex() + 1 );
		viewAreaDiv.css("overflow","auto");

		$.each( viewAreaDiv.children(), function(index , viewItem){

			if(viewItem.resizeFunction){
				viewItem.resizeFunction( viewAreaDiv.width(), viewAreaDiv.height() );
			}
		});
	}
};

/**
 * パースペクティブ領域にイベントを設定する。
 */
perspactiveTable.prototype.setPerspactiveEvent = function() {

	// パースペクティブテーブルに関連付けられているビューについて、
	// イベントの設定を行なう。
	var perspactiveTable = this.table;
	var max_index_y = perspactiveTable.length;
	var alreadySetting = {};
	for ( var index_y = 0; index_y < max_index_y; index_y++) {

		var max_index_x = perspactiveTable[index_y].length;
		for ( var index_x = 0; index_x < max_index_x; index_x++) {

			// パースペクティブ表示領域の情報を取得する。
			var tableViewArea = perspactiveTable[index_y][index_x];

			// 既に設定済みの場合は処理を行なわない。
			if(!alreadySetting[tableViewArea.drop_area_id]){

				this.setEventFunction(tableViewArea);
				alreadySetting[tableViewArea.drop_area_id] = true;
			}
		}
	}
};

/**
 * 引数にて渡されたパースペクティブ領域にイベントを設定する。
 * 
 * @param tableViewArea
 */
perspactiveTable.prototype.setEventFunction = function(tableViewArea) {

	var instance = this;

	// パースペクティブ領域に対してリサイズイベントを設定する。
	$("#" + tableViewArea.drop_area_id).resizable({
		start : function(e, ui) {
			instance.resizeStartFunction(e.target.id);
		},
		resize : function(e, ui) {
			common.moveEndFront("#" + e.target.id);

		},
		stop : function(e, ui) {
			instance.resizeStopFunction(e.target.id);

		}
	}).droppable({
		accept : this.droppableClass,
		drop : function(e, ui) {

			// ドロップ領域のIDを取得する。
			var droppableTargetId = e.target.id;
			var draggableTargetId = ui.draggable.attr("id");

			instance.dropEventFunction(droppableTargetId, draggableTargetId);
		},
		out : function(e, ui) {

			// ドロップ領域より該当するパースペクティブ情報を取得する。
			var targetViewArea = instance.findPerspactiveFromId(e.target.id);

			// ドロップ領域に関連付くビュー情報を削除する。
			targetViewArea.view_div_id = "";

			// draggable要素のresizableイベントを活性にする。
			ui.draggable.resizable("enable");
		}
	});

	// ユーティリティバー領域に対してクリックイベントを適用する。
	$("#" + tableViewArea.minimize_restore_id).mousedown(function(event) {
		instance.minRestoreEventFunction(this.id);
	});

	$("#" + tableViewArea.hide_id).mousedown(function(event){
		instance.hideEventFunction(this.id);
	});

	$("#" + tableViewArea.util_bar_id).dblclick(function(event){
		instance.maximumEventFunction(this.id);
	});
};

/**
 * パースペクティブ領域のリサイズ開始時の処理を行う。
 */
perspactiveTable.prototype.resizeStartFunction = function() {
	this.memoryTablePosition();
};

perspactiveTable.prototype.resizeFunction = function(targetId){
	
};

/**
 * パースペクティブ領域の位置情報を記憶する。
 */
perspactiveTable.prototype.memoryTablePosition = function(){
	var perspactiveTable = this.table;

	// リサイズ前のパースペクティブテーブル上の全ての要素の幅、高さを設定しておく。
	var max_index_y = perspactiveTable.length;
	for ( var index_y = 0; index_y < max_index_y; index_y++) {

		var max_index_x = perspactiveTable[index_y].length;
		for ( var index_x = 0; index_x < max_index_x; index_x++) {
			var viewArea = perspactiveTable[index_y][index_x];
			var dropAreaDiv = $("#" + viewArea.drop_area_id);

			var position = dropAreaDiv.position();

			viewArea.top = position["top"];
			viewArea.left = position["left"];

			viewArea.width = dropAreaDiv.width();
			viewArea.height = dropAreaDiv.height();

		}
	}	
};

/**
 * パースペクティブ領域のリサイズ終了時の処理を行う。
 */
perspactiveTable.prototype.resizeStopFunction = function(targetId) {

	var targetDiv = $("#" + targetId);
	var perspactiveTable = this.table;

	// パースペクティブテーブル上の位置を取得する。
	var targetViewArea = this.findPerspactiveFromId(targetId);

	// リサイズ後の幅を取得する。
	var afterWidth = targetDiv.width();
	var afterHeight = targetDiv.height();
	var afterPosition = targetDiv.position();
	var afterTop = afterPosition.top;
	var afterLeft = afterPosition.left;

	// 変化量を計算する。
	var changeWidth = afterWidth - targetViewArea.width;
	var changeHeight = afterHeight - targetViewArea.height;
	var changeTop = afterTop - targetViewArea.top;
	var changeLeft = afterLeft - targetViewArea.left;

	var alreadyProcessed = {};

	var left_up_view_array = targetViewArea.left_up_view_array;
	var up_view_array = targetViewArea.up_view_array;
	var right_up_view_array = targetViewArea.right_up_view_array;

	var left_bottom_view_array = targetViewArea.left_bottom_view_array;
	var bottom_view_array = targetViewArea.bottom_view_array;
	var right_bottom_view_array = targetViewArea.right_bottom_view_array;

	var left_view_array = targetViewArea.left_view_array;
	var right_view_array = targetViewArea.right_view_array;

	// 左上方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(left_up_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id );
		indexDiv.width( indexDiv.width() - changeLeft );
		indexDiv.height( indexDiv.height() + changeTop );			
	});

	// 上方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(up_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id );
		indexDiv.height( indexDiv.height() + changeTop );			
	});

	// 右上方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(right_up_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id );
		var indexPosition = indexDiv.position();

		indexDiv.css("left", indexPosition["left"] + changeWidth );
		indexDiv.width( indexDiv.width() - changeWidth );
		indexDiv.height( indexDiv.height() + changeTop );
	});

	// 左方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(left_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id );

		indexDiv.width( indexDiv.width() + changeLeft );

		if(targetViewArea.first_index_y == indexViewArea.first_index_y){
			indexDiv.css("top", afterTop );
		}

		if(targetViewArea.last_index_y == indexViewArea.last_index_y){
			indexDiv.height( afterTop + afterHeight );
		}
	});

	// 右方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(right_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id );
		var indexPosition = indexDiv.position();

		indexDiv.css("left", indexPosition["left"] + changeWidth );
		indexDiv.width( indexDiv.width() - changeWidth );

		if(targetViewArea.first_index_y == indexViewArea.first_index_y){
			indexDiv.css("top", afterTop );
		}

		if(targetViewArea.last_index_y == indexViewArea.last_index_y){
			indexDiv.height( indexDiv.height() + changeHeight );
		}
	});

	// 左下方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(left_bottom_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id);
		var indexPosition = indexDiv.position();

		indexDiv.css("top", indexPosition["top"] + changeHeight);
		indexDiv.width( indexDiv.width() + changeLeft );
	});

	// 下方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(bottom_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id);
		var indexPosition = indexDiv.position();

		indexDiv.css("top", indexPosition["top"] + changeHeight);
		indexDiv.height( indexDiv.height() - changeHeight );
	});

	// 右下方向に隣接するパースペクティブ領域に対するリサイズ処理
	$.each(right_bottom_view_array, function(index, indexViewArea){
		var indexDiv = $("#" + indexViewArea.drop_area_id);
		var indexPosition = indexDiv.position();

		indexDiv.css("top", indexPosition["top"] + changeHeight);
		indexDiv.css("left", indexPosition["left"] + changeWidth );
		indexDiv.width( indexDiv.width() - changeWidth );
	});

	// 関連付くビューを再配置する。
	alreadyProcessed = {};
	for(var index_y = 0; index_y < perspactiveTable.length; index_y++){
		for(var index_x = 0; index_x < perspactiveTable[index_y].length; index_x++){

			var indexViewArea = perspactiveTable[index_y][index_x];

			// 処理済みの場合は除く
			if(alreadyProcessed[indexViewArea.view_div_id] == true){
				continue;
			}
			alreadyProcessed[indexViewArea.view_div_id] = true;

			this.resetViewPosition(indexViewArea);
		}
	}
};

/**
 * ユーティリティバーの【最小化/元に戻す】に関する操作を行なった際の処理を行う。
 * @param targetId
 */
perspactiveTable.prototype.minRestoreEventFunction = function(targetId){

	// パースペクティブテーブル上の位置情報を取得する。
	var targetViewArea = this.findPerspactiveFromId(targetId);

	var minRestoreDiv = $("#" + targetViewArea.minimize_restore_id);

	// 元に戻す処理を行う。
	if(minRestoreDiv.hasClass( wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_RESTORE )){

		// ドロップ領域を取得する。
		var dropAreaDiv = $("#" + targetViewArea.drop_area_id);

		// 最小化前の内容を取得する。
		var restoreWidth = targetViewArea.restoreWidth;
		var restoreHeight = targetViewArea.restoreHeight;
		var restoreTop = targetViewArea.restoreTop;
		var restoreLeft = targetViewArea.restoreLeft;

		// リサイズ開始処理を行う。
		this.resizeStartFunction();

		dropAreaDiv.width(restoreWidth);
		dropAreaDiv.height(restoreHeight);
		dropAreaDiv.css("top", restoreTop + "px");
		dropAreaDiv.css("left", restoreLeft + "px");

		//　リサイズ終了処理を行う。
		this.resizeStopFunction(targetViewArea.drop_area_id);

		// ビューが関連付いている場合は表示する。
		if(targetViewArea.isRerationView()){
			$("#" + targetViewArea.view_div_id).show();
		}

		// 最小化/元に戻すのボタン表示クラスを入れ替える。
		common.removeClassWrapperJQuery( minRestoreDiv , wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_RESTORE);
		common.addClassWrapperJQuery( minRestoreDiv ,  wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_MIN);

	// 最小化処理を行う。
	}else if(minRestoreDiv.hasClass( wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_MIN )){

		// ドロップ領域を取得する。
		var dropAreaDiv = $("#" + targetViewArea.drop_area_id);
		var dropAreaPosition = dropAreaDiv.position();

		// 最小化前の内容を登録する。
		targetViewArea.restoreWidth = dropAreaDiv.width();
		targetViewArea.restoreHeight = dropAreaDiv.height();
		targetViewArea.restoreTop = dropAreaPosition["top"];
		targetViewArea.restoreLeft = dropAreaPosition["left"];

		// リサイズ開始処理を行う。
		this.resizeStartFunction();

		var returnObject =
			this.decideMinHideWay(targetViewArea.drop_area_id , this.minimize_width , this.minimize_height);

		if(returnObject["width"]){
			dropAreaDiv.width( returnObject["width"] );
		}
		if(returnObject["height"]){
			dropAreaDiv.height( returnObject["height"] );
		}
		if(returnObject["top"]){
			dropAreaDiv.css("top", returnObject["top"] + "px");
		}
		if(returnObject["left"]){
			dropAreaDiv.css("left", returnObject["left"] + "px");
		}

		// リサイズ終了処理を行う。
		this.resizeStopFunction(targetViewArea.drop_area_id);		

		// ビューが関連付いている場合は非表示にする。
		if(targetViewArea.isRerationView()){
			$("#" + targetViewArea.view_div_id).hide();
		}

		// 最小化/元に戻すのボタン表示クラスを入れ替える。
		common.addClassWrapperJQuery( minRestoreDiv , wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_RESTORE);
		common.removeClassWrapperJQuery( minRestoreDiv ,  wgpStyleClassConstants.PERSPACTIVE_UTIL_BAR_MIN);

	}
};

/**
 * パースペクティブ領域の最大化処理を行う。
 * @param targetId
 */
perspactiveTable.prototype.maximumEventFunction = function(targetId){

	// 最大化時のクラス定義
	var perspactiveMaxClass = "perspactive-maximum";

	// パースペクティブ情報を取得する。
	var targetViewArea = this.findPerspactiveFromId(targetId);
	var perspactiveTable = this.table;

	var targetUtilBarDiv = $("#" + targetViewArea.util_bar_id);

	// 最大化処理を行う。
	if(!targetUtilBarDiv.hasClass(perspactiveMaxClass)){

		var dropAreaDiv = $("#" + targetViewArea.drop_area_id);
		var dropAreaPosition = dropAreaDiv.position();

		targetViewArea.restoreWidth = dropAreaDiv.width();
		targetViewArea.restoreHeight = dropAreaDiv.height();
		targetViewArea.restoreTop = dropAreaPosition["top"];
		targetViewArea.restoreLeft = dropAreaPosition["left"];
		targetViewArea.restoreZIndex = dropAreaDiv.zIndex();

		// zIndexを一番手前に更新する。
		var maxZIndex = this.getMaxZIndex(targetViewArea.drop_area_id);

		// 左上要素の座標を取得する。
		var topLeftViewDiv = $("#" + perspactiveTable[0][0].drop_area_id);
		var topLeftPosition = topLeftViewDiv.position();

		dropAreaDiv.width( this.max_width + 5);
		dropAreaDiv.height( this.max_height + 5 );
		dropAreaDiv.css("top", topLeftPosition["top"] + "px");
		dropAreaDiv.css("left", topLeftPosition["left"] + "px");
		dropAreaDiv.css("zIndex", maxZIndex + 1);

		// ビューの位置を再設定する。
		this.resetViewPosition(targetViewArea);

		// 最大化されていることを示すクラスを設定
		targetUtilBarDiv.addClass(perspactiveMaxClass);

		// リサイズをできなくする。
		dropAreaDiv.resizable("disable");

		// 半透明になるクラスのみ削除する。
		dropAreaDiv.removeClass("ui-state-disabled");


	// 元に戻す処理を行う。
	}else{

		// ドロップ領域を取得する。
		var dropAreaDiv = $("#" + targetViewArea.drop_area_id);

		// 最小化前の内容を取得する。
		var restoreWidth = targetViewArea.restoreWidth;
		var restoreHeight = targetViewArea.restoreHeight;
		var restoreTop = targetViewArea.restoreTop;
		var restoreLeft = targetViewArea.restoreLeft;
		var restoreZIndex = targetViewArea.restoreZIndex;

		dropAreaDiv.width(restoreWidth);
		dropAreaDiv.height(restoreHeight);
		dropAreaDiv.css("top", restoreTop + "px");
		dropAreaDiv.css("left", restoreLeft + "px");
		dropAreaDiv.zIndex( restoreZIndex );

		// リサイズをできなくする。
		dropAreaDiv.resizable("enable");

		// ビューの位置を再設定する。
		this.resetViewPosition(targetViewArea);

		// 最大化のクラスを削除
		targetUtilBarDiv.removeClass(perspactiveMaxClass);
	}
};

/**
 * パースペクティブ領域の非表示処理を行う。
 */
perspactiveTable.prototype.hideEventFunction = function(targetId){

	// パースペクティブ情報を取得する。
	var targetViewArea = this.findPerspactiveFromId(targetId);

	// ドロップ領域を取得する。
	var dropAreaDiv = $("#" + targetViewArea.drop_area_id);
	var dropAreaOffset = dropAreaDiv.offset();

	// リサイズ開始処理を行う。
	this.resizeStartFunction();

	var returnObject = this.decideMinHideWay(targetViewArea.drop_area_id, 0, 0);
	if(returnObject["width"] || returnObject["width"] == 0){
		dropAreaDiv.width( returnObject["width"] );
	}
	if(returnObject["height"] || returnObject["height"] == 0){
		dropAreaDiv.height( returnObject["height"] );
	}
	if(returnObject["top"] || returnObject["top"] == 0 ){
		dropAreaDiv.css("top", returnObject["top"] + "px");
	}
	if(returnObject["left"] || returnObject["left"] == 0){
		dropAreaDiv.css("left", returnObject["left"] + "px");
	}

	// リサイズ終了処理を行う。
	this.resizeStopFunction(targetViewArea.drop_area_id);

	// パースペクティブ領域を非表示にする。
	$("#" + targetViewArea.drop_area_id).hide();

	// ビューが関連付いている場合はビューを非表示にする。
	if(targetViewArea.isRerationView()){
		$("#" + targetViewArea.view_div_id).hide();
	}
};

/**
 * 最小化又は非表示時にパースペクティブを
 */
perspactiveTable.prototype.decideMinHideWay = function(targetId , minimizeWidth , minimizeHeight){

	var perspactiveTable = this.table;

	// パースペクティブ領域情報を取得する。
	var targetViewArea = this.findPerspactiveFromId(targetId);
	var returnObject = {};

	var targetDiv = $("#" + targetViewArea.drop_area_id);
	var targetWidth = targetDiv.width();
	var targetHeight = targetDiv.height();
	var targetOffset = targetDiv.offset();
	var targetTop = targetOffset.top;
	var targetLeft = targetOffset.left;

	var up_view_array = targetViewArea.up_view_array;
	var bottom_view_array = targetViewArea.bottom_view_array;
	var left_view_array = targetViewArea.left_view_array;
	var right_view_array = targetViewArea.right_view_array;

	// 一番下のパースペクティブかつ行結合がない場合
	if(targetViewArea.last_index_y == perspactiveTable.length - 1 &&
		targetViewArea.rowspan == 1
	){

		returnObject["height"] = minimizeHeight;
		returnObject["top"] = targetTop + targetHeight - minimizeHeight;

	// 一番左のパースペクティブの場合
	}else if(left_view_array.length == 0  ){

		// 左方向にリサイズする。
		returnObject["width"] = minimizeWidth;

	// 一番右のパースペクティブの場合
	}else if(right_view_array.length == 0){

		// 右方向にリサイズする。
		returnObject["width"] = minimizeWidth;
		returnObject["left"] = targetLeft + targetWidth - minimizeWidth;

	}else{

		var findFlag = false;

		// 右に隣接する行を確認
		for(var index = 0; index < right_view_array.length && !findFlag; index++){

			// 自身と同じ開始行、終了行か確認
			if(targetViewArea.first_index_y == right_view_array[index].first_index_y &&
				targetViewArea.last_index_y == right_view_array[index].last_index_y
			){
				returnObject["width"] = minimizeWidth;
				returnObject["left"] = targetLeft;
				findFlag = true;
			}
		}

		// 左に隣接する行を確認
		for(var index = 0; index < left_view_array.length && !findFlag; index++){

			// 自身と同じ開始行、終了行か確認
			if(targetViewArea.first_index_y == left_view_array[index].first_index_y &&
				targetViewArea.last_index_y == left_view_array[index].last_index_y
			){
				returnObject["width"] = minimizeWidth;
				returnObject["left"] = targetLeft + targetWidth;
				findFlag = true;
			}
		}
	}

	return returnObject;
};

/**
 * パースペクティブ領域にビューがドロップされた際の処理を行う。
 * 
 * @param droppableTargetId
 *            ドロップ領域
 * @param draggableTargetId
 *            ドロップされたビュー
 */
perspactiveTable.prototype.dropEventFunction = function(droppableTargetId,
		draggableTargetId) {

	// ドロップ領域より該当するパースペクティブ情報を取得する。
	targetViewArea = this.findPerspactiveFromId(droppableTargetId);

	// ドロップ領域に関連付くビューがない場合、又は関連付けが変わらない場合
	if (!targetViewArea.view_div_id || targetViewArea.view_id_id == draggableTargetId) {

		// ビューの関連付けを行なう。
		targetViewArea.view_div_id = draggableTargetId;

		var targetViewDiv = $("#" + targetViewArea.view_div_id);

		// ドロップ領域の子要素として扱われるように移動する。
		$("#" + targetViewArea.drop_area_id).append(targetViewDiv);

		this.resetViewPosition(targetViewArea);

		// draggable要素のresizableイベントを非活性にする。
		targetViewDiv.resizable("disable");

		// 半透明になるクラスのみ削除する。
		targetViewDiv.removeClass("ui-state-disabled");
	}
};

/**
 * いずれかのIDを基にパースペクティブテーブル領域の情報を取得する。
 */
perspactiveTable.prototype.findPerspactiveFromId = function(argument_id) {
	var max_index_y = this.table.length;
	for ( var index_y = 0; index_y < max_index_y; index_y++) {

		var max_index_x = this.table[index_y].length;
		for ( var index_x = 0; index_x < max_index_x; index_x++) {

			// パースペクティブ表示領域の情報を取得する。
			// ※いずれかのid属性情報と一致するかどうか確認する。
			var tableViewArea = this.table[index_y][index_x];
			if (tableViewArea.drop_area_id == argument_id ||
				tableViewArea.util_bar_id == argument_id ||
				tableViewArea.minimize_restore_id == argument_id ||
				tableViewArea.hide_id == argument_id
			) {
				return tableViewArea;
			}
		}
	}
};

/**
 * 引数にて指定したビュー領域のzインデックスを確認し、
 * 一番大きいzIndexの値を取得する。
 * @param targetId
 */
perspactiveTable.prototype.getMaxZIndex = function(targetId) {

	var perspactiveTable = this.table;
	var targetViewArea = this.findPerspactiveFromId(targetId);
	var targetDiv = $("#" + targetViewArea.drop_area_id);
	var maxZIndex = targetDiv.zIndex();

	for(var index_y = 0; index_y < perspactiveTable.length; index_y++){

		for(var index_x = 0; index_x < perspactiveTable[index_y].length; index_x++){

			var indexViewArea = perspactiveTable[index_y][index_x];
			var dropAreaDiv = $("#" + indexViewArea.drop_area_id);

			// ドロップ領域及びビュー領域それぞれのzインデックスについて確認
			if(dropAreaDiv.zIndex() >= maxZIndex){
				maxZIndex = dropAreaDiv.zIndex();
			}

			if(indexViewArea.isRerationView()){
				var viewAreaDiv = $("#" + indexViewArea.view_div_id);

				if(viewAreaDiv.zIndex() > maxZIndex ){
					maxZIndex = viewAreaDiv.zIndex();
				}
			}
		}
	}

	return maxZIndex;
};

/**
 * 引数にて渡された数値から"px"を除外して数値として返却する。
 * ※共通クラスへ移動予定
 */
perspactiveTable.prototype.removePixel = function(numberWithPixel){
	return Number(numberWithPixel.replace("px",""));
};
