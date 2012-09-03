<meta charset="UTF-8" />
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--
 WGP  0.1  - Web Graphical Platform
 Copyright (c) 2012, WGP.LICENSES.COM
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2012-04-29
-->
<%@ page import="java.io.File"%>
<%@ page import="java.lang.String"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page import="org.wgp.util.FileNameFilter"%>
<%@ page import="org.wgp.util.FilePathUtil"%>

<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/model/nodeInfomationModel.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/nodeInfomationView.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/mock/nodeInfomationMock.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/model/resourceGraphModel.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/resourceGraphView.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/separaterElementView.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/common/draggable.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/common/sliderView.js"
	type="text/javaScript"></script>


<script
	src="<%=request.getContextPath()%>/resources/js/common/dateSlider/js/jQDateRangeSlider.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/common/dateSlider/js/jQDateRangeSliderHandle.js"
	type="text/javaScript"></script>



<script
	src="<%=request.getContextPath()%>/resources/js/common/selectToUISlider.jQuery.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/common/sliderElementView.js"
	type="text/javaScript"></script>
<script
	src="<%=request.getContextPath()%>/resources/js/nodeinfomation/view/columnMultiAreaView.js"
	type="text/javaScript"></script>


<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/nodeInfo/iThing.css"
	type="text/css" media="all">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/ui.slider.extras.css"
	type="text/css" media="all">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/nodeInfo/nodeStyles.css"
	type="text/css" media="all">