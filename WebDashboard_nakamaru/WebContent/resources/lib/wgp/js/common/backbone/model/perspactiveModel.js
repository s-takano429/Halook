
// パースペクティブテーブルモデル
wgp.PerspactiveModel = Backbone.Model.extend({
	defaults : {
		// 自身に関連付けられているビューのidを保持する。
		view_div_id : null,

		// 表示領域幅
		width : 0,

		// 表示領域高さ
		height : 0,

		// 表示領域の行結合
		rowspan : 0,

		// 表示領域の列結合
		colspan : 1,

		// 表示領域内のユーティリティバーのid
		util_bar_id : null,

		// ユーティリティバー内の最小化/元に戻すボタンのid
		minimize_restore_id : null,

		// ユーティリティバー内の非表示ボタンのid
		hide_id : null,

		// 表示領域のうち、ビューをドロップ可能な領域を示すid
		drop_area_id : null,

		// 最小化されている非表示領域を表示する際に適用する幅
		restoreWidth : null,

		// 最小化されている非表示領域を表示する際に適用する高さ
		restoreHeight : null,

		// 最小化されているかどうかを示すフラグ
		minimize_flag : false,

		// 非表示かどうかを示すフラグ
		hide_flag : false,

		// 隣接するパースペクティブ領域情報
		left_up_view_array : [],
		up_view_array : [],
		right_up_view_array : [],

		left_bottom_view_array : [],
		bottom_view_array : [],
		right_up_view_array : [],

		left_view_array : [],
		right_view_array : [],
	},
	isRerationView : function() {
		if (this.get("view_div_id") && this.get("view_div_id") != "") {
			return true;
		} else {
			return false;
		}
	}
});
