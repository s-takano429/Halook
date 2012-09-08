/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
*/
/**
 * コンテキストメニューを作成するクラス
 */
var contextMenuCreator = function(){
};
contextMenuCreator();

// デフォルトセッティング
contextMenuCreator.defaultSetting = {
	widthOverflowOffset : 0,
	heightOverflowOffset : 0,
	submenuLeftOffset : 0,
	submenuTopOffset : 0,
	fadeIn : 0,
	delay : 0,
	autoHide: true,
	autoAddSubmenuArrows : true
};

/**
 * コンテキストメニュー用のHTMLを作成する。(外部呼出用)
 * @param menuId コンテキストメニューを一意に識別するID
 * @param menuArray コンテキストメニューの内容を表す配列
 */
contextMenuCreator.initializeContextMenu = function(menuId, menuArray ){

	// 既に同一のコンテキストメニューが作成されている場合は処理を行わない。
	if($("#" + menuId).length != 0){
		return;
	}

	// コンテキストメニューとなるULタグ、LIタグの構成のHTML文字列を生成する。
	var contextMenuString = contextMenuCreator.createContextMenuString(menuId, menuArray);
	$("body").append(contextMenuString);
};

/**
 * コンテキストメニュー用のHTMLを作成する。
 * @param menuId コンテキストメニューを一意に識別するID
 * @param menuArray コンテキストメニューの内容を表す配列
 * @param parent コンテキストメニューを登録する親要素
 */
contextMenuCreator.createContextMenuString = function(menuId, menuArray ){

	var ulDto = new wgpDomDto(
		menuId
		,"ul"
		,null
		,[wgpStyleClassConstants.CONTEXT_MENU]
		,{display: "none" }
	);

	$.each(menuArray, function(index, contextMenu){

		var liDto = new wgpDomDto(
			contextMenu.menu_id
			,"li"
			,null
			,null
			,null
		);

		// サブメニューが存在する場合はさらに追加
		liDto.addChildren( [ contextMenu.menu_name ] );
		if( contextMenu.children && contextMenu.children.length > 0 ){
			liDto.addChildren(
				[
				 	contextMenuCreator.createContextMenuString(
				 		null, contextMenu.children)
				]
			);
		}

		ulDto.addChildren( [liDto] );
	});

	return wgpDomCreator.createDomStringCall(ulDto);
};

/**
 * 引数を基にコンテキストメニューを生成する。
 * @param targetId コンテキストメニューを適用するタグ
 * @param menuid コンテキストメニューを一意に識別するID
 * @param option 追加設定(又は上書き)するオプション
 */
contextMenuCreator.createContextMenu = function(targetId, menuId, option){

	// 設定内容を取得する。
	var setting = $.extend(true,
		{
			widthOverflowOffset : 0,
			heightOverflowOffset : 0,
			submenuLeftOffset : 0,
			submenuTopOffset : 0,
			fadeIn : 0,
			delay : 0,
			autoHide: true,
			autoAddSubmenuArrows : true
	}, option);

	// jeegoocontextの設定を適用する。
	$("#" + targetId).jeegoocontext(menuId, setting);
};

/**
 * 引数を基にコンテキストメニューを生成する。
 * @param selectorString コンテキストメニューを適用するセレクタ
 * @param menuid コンテキストメニューを一意に識別するID
 * @param option 追加設定(又は上書き)するオプション
 */
contextMenuCreator.createContextMenuSelector = function(selectorString, menuId, option){

	// 設定内容を取得する。
	var setting = $.extend(true,
		{
			widthOverflowOffset : 0,
			heightOverflowOffset : 0,
			submenuLeftOffset : 0,
			submenuTopOffset : 0,
			fadeIn : 0,
			delay : 0,
			autoHide: true,
			autoAddSubmenuArrows : true
	}, option);

	// jeegoocontextの設定を適用する。
	$(selectorString).jeegoocontext(menuId, setting);
};