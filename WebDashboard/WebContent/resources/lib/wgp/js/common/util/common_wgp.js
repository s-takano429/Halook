/*
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
 */
var common = function() {
};

common.escapeTarget_ = {
	"!" : "%21",
	'"' : "%22",
	"#" : "%23",
	"$" : "%24",
	"%" : "%25",
	"&" : "%26",
	"'" : "%27",
	"(" : "%28",
	")" : "%29",
	"+" : "%2b"
};

common.escapeURL = function(targetURL) {
	var encodeUrl = "";
	if (!targetURL.length) {
		return targetURL;
	}
	for ( var count = 0; count < targetURL.length; count++) {
		var escapeChar = common.escapeTarget_[targetURL.substr(count, 1)];
		if (escapeChar) {
			encodeUrl += escapeChar;
		} else {
			encodeUrl += targetURL.substr(count, 1);
		}
	}
	return encodeUrl;
};

common.createQueryString = function(data) {
	var queryString = "";
	var index = 0;
	$.each(data, function(key, value) {
		if (index == 0) {
			queryString = queryString + "?" + key + "="
					+ common.escapeURL(value);
			index++;
		} else {
			queryString = queryString + "&" + key + "="
					+ common.escapeURL(value);
			index++;
		}
	});
	return queryString;
};

/**
 * create context path.
 * 
 * @returns {String} context path
 */
common.getContextPath = function() {
	var url = window.location.pathname;
	var urlList = url.split("/");
	return "/" + urlList[1];
};

common.getFrameReference = function(tag) {

	var offset = tag.offset();
	var borderTopWidth = common.removePixel(tag.css("border-top-width"));
	var borderRightWidth = common.removePixel(tag.css("border-right-width"));
	var borderBottomWidth = common.removePixel(tag.css("border-bottom-width"));
	var borderLeftWidth = common.removePixel(tag.css("border-left-width"));

	var refer = {
		id : tag.attr("id"),
		width : tag.width(),
		height : tag.height(),
		top : offset["top"],
		left : offset["left"],
		borderTopWidth : borderTopWidth,
		borderRightWidth : borderRightWidth,
		borderBottomWidth : borderBottomWidth,
		borderLeftWidth : borderLeftWidth
	};

	return refer;
};

/**
 * 引数にて渡された数値から"px"を除外して数値として返却する。
 */
common.removePixel = function(numberWithPixel) {
	return Number(numberWithPixel.replace("px", ""));
};

common.createTable = function(settings) {

	// デフォルト設定
	var settingArray = {
		datatype : "local",
		scrollrows : true,
		viewrecords : true,
		sortorder : "desc",
		rowNum : 10000,
		width : "980px"
	};
	// 各画面から渡されたoptionを設定
	var targetId;
	var isFilter;
	$
			.each(
					settings,
					function(index, object) {
						if ("targetId" == index) {
							targetId = object;
						} else if ("isFilter" == index) {
							isFilter = object;
						} else {
							// dataに"がある場合は&quot;に置き換える。
							if (index == "data") {
								$
										.each(
												object,
												function(rowIndex, rowObject) {
													$
															.each(
																	rowObject,
																	function(
																			cellIndex,
																			cellObject) {
																		if (cellObject) {
																			// JSONに変換できるものは対象外とする
																			var isJSON = false;
																			try {
																				var jsonData = $
																						.parseJSON(cellObject);

																				$
																						.each(
																								jsonData,
																								function(
																										jsonIndex,
																										jsonObject) {
																									var encodeTarget = "";
																									for ( var count = 0; count < cellObject.length; count++) {
																										var escapeChar = common.htmlEscapeTarget_[jsonObject
																												.substr(
																														count,
																														1)];
																										if (escapeChar) {
																											encodeTarget += escapeChar;
																										} else {
																											encodeTarget += jsonObject
																													.substr(
																															count,
																															1);
																										}
																									}
																									jsonData[jsonIndex] = encodeTarget;
																								});
																				object[rowIndex][cellIndex] = JSON
																						.stringify(jsonData);
																				isJSON = true;
																			} catch (ex) {
																				// 何もしない
																			}
																			if (isJSON == false) {
																				if (!cellObject.length) {
																					object[rowIndex][cellIndex] = cellObject;
																				} else {
																					var encodeTarget = "";
																					for ( var count = 0; count < cellObject.length; count++) {
																						var escapeChar = common.htmlEscapeTarget_[cellObject
																								.substr(
																										count,
																										1)];
																						if (escapeChar) {
																							encodeTarget += escapeChar;
																						} else {
																							encodeTarget += cellObject
																									.substr(
																											count,
																											1);
																						}
																					}
																					object[rowIndex][cellIndex] = encodeTarget;
																				}
																			}
																		}
																	});
												});
							}
							settingArray[index] = object;
						}
					});

	// テーブルの作成
	$("#" + targetId).jqGrid(settingArray);

	if (isFilter) {
		$("#" + targetId).filterToolbar({
			defaultSearch : 'cn'
		});
	}
};

/**
 * 引数にて指定した要素を最前面に表示する
 * 
 * @param attribute
 * @param list
 */
common.moveEndFront = function(tagId) {

	var moveEndFrontTag = $(tagId);

	// 一つ上の親要素の子要素を取得する。
	var childrenList = moveEndFrontTag.parent().children();

	// 現在最前面である要素を取得する。
	var currentFrontTag;
	$.each(childrenList, function(index, child) {
		var childTag = $("#" + child.id);

		if (currentFrontTag) {
			if (childTag.zIndex() > currentFrontTag.zIndex()) {
				currentFrontTag = childTag;
			}
		} else {
			currentFrontTag = childTag;
		}
	});

	// 最前面の要素とzIndexを入れ替える。
	var tempZIndex = moveEndFrontTag.zIndex();
	moveEndFrontTag.zIndex(currentFrontTag.zIndex());
	currentFrontTag.zIndex(tempZIndex);
};

/**
 * 引数にて指定した要素についてzIndexの最大値を新しく算出して設定する。
 * 
 * @param tagId
 */
common.calculateMaxZIndex = function(tagId) {

	var moveEndFrontTag = $(tagId);

	// 一つ上の親要素の子要素を取得する。
	var childrenList = moveEndFrontTag.parent().children();

	// 現在最前面である要素を取得する。
	var currentFrontTag;
	$.each(childrenList, function(index, child) {

		var childTag = $("#" + child.id);

		if (currentFrontTag) {
			if (childTag.zIndex() > currentFrontTag.zIndex()) {
				currentFrontTag = childTag;
			}
		} else {
			currentFrontTag = childTag;
		}
	});

	var zIndex;
	if (!currentFrontTag) {
		zIndex = 1;
	} else {
		zIndex = currentFrontTag.zIndex() + 1;
	}

	// zIndexの最大値を払い出して設定する。
	moveEndFrontTag.zIndex(zIndex);
};

common.addClassWrapperJQuery = function(jQueryTag, addClass) {

	var addClassArray = [ addClass ];
	if (wgpStyleClassConstants.STYLE_ADD_SETTING[addClass]) {
		addClassArray = addClassArray
				.concat(wgpStyleClassConstants.STYLE_ADD_SETTING[addClass]);
	}

	$.each(addClassArray, function(index, addClass) {
		jQueryTag.addClass(addClass);
	});
};

common.removeClassWrapperJQuery = function(jQueryTag, removeClass) {

	var removeClassArray = [ removeClass ];
	if (wgpStyleClassConstants.STYLE_ADD_SETTING[removeClass]) {
		removeClassArray = removeClassArray
				.concat(wgpStyleClassConstants.STYLE_ADD_SETTING[removeClass]);
	}

	$.each(removeClassArray, function(index, removeClass) {
		jQueryTag.removeClass(removeClass);
	});
};

common.createMultiSelector = function(idList) {
	var selectorList = [];
	var isFirst = true;
	$.each(idList, function(index, id) {
		if (isFirst) {
			selectorList.push("#" + id);
			isFirst = false;
			return true;
		}
		selectorList.push(", #" + id);
	});
	return selectorList.join("");
};