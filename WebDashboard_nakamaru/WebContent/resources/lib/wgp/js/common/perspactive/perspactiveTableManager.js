/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * パースペクティブを管理するクラス。
 * @returns
 */
perspactiveTableManager = function(){

	// パースペクティブを作成するクラス
	this.tableCreator = new perspactiveTableCreator();
	this.table;

	var instance = this;
	perspactiveTableManager = function(){
		return instance;
	};
};

/**
 * パースペクティブテーブルの初期化処理を行う。
 */
perspactiveTableManager.prototype.initializePerspactiveTable = function(parentDivId, table){

	// パースペクティブテーブルの実体となるテーブル要素を作成する。
	this.tableCreator.createTableTags(parentDivId, table);

	// パースペクティブテーブル情報を作成し、イベントを適用する。
	this.table = new perspactiveTable(table);
	this.table.prepareTable();
	this.table.setPerspactiveEvent();
};

/**
 * パースペクティブに特定のビューを関連付ける。
 * ※指定したビューが存在しない場合は新規作成する。
 */
perspactiveTableManager.prototype.dropView = function(droppableTargetId, viewId){

	var viewDiv = $("#" + viewId);
	if(viewDiv.length == 0){
		var viewAreaDto = new wgpDomDto(
			viewId
			,"div"
			,null
			,[wgpStyleClassConstants.PERSPACTIVE_VIEW_AREA]
			,null
		);

		$("#" + droppableTargetId).append( wgpDomCreator.createDomStringCall(viewAreaDto) );
	}else{
		$("#" + droppableTargetId).append( viewDiv );
	}

	this.table.dropEventFunction(droppableTargetId, viewId);
};