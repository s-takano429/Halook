//var hdfsViewTestDataSender = function (){

	var now = new Date();
	var year = now.getYear(); // 年
	var month = now.getMonth() + 1; // 月
	var day = now.getDate(); // 日
	var hour = now.getHours(); // 時
	var min = now.getMinutes(); // 分
	var sec = now.getSeconds(); // 秒
	
	dataNo = 0;
	dataFromServer = {};
	setDataFromServer();
	function setDataFromServer(){
	dataFromServer = {
		timestamp : year+month+day+"_"+hour+":"+min+":"+sec,
		data : [
			        {host : "host1", rack : "rack1", capacity : 49.2, used : 2.93},
			        {host : "host2", rack : "rack1", capacity : 89.2, used : 2.93},
			        {host : "host3", rack : "rack1", capacity : 69.2, used : 2.93},
			        {host : "host4", rack : "rack1", capacity : 45.2, used : 2.93},
			        {host : "host5", rack : "rack1", capacity : 45.2, used : 2.93},
			        {host : "host6", rack : "rack1", capacity : 54.2, used : 2.93},
			        {host : "host7", rack : "rack1", capacity : 9.2, used : 2.93},
			        {host : "host8", rack : "rack1", capacity : 43.2, used : 2.93},
			        {host : "host9", rack : "rack1", capacity : 45.2, used : 2.93 + dataNo},
			        {host : "host10", rack : "rack2", capacity : 67.2, used : 2.93 + dataNo},
			        {host : "host11", rack : "rack2", capacity : 20.2, used : 2.93},
			        {host : "host12", rack : "rack2", capacity : 49.2, used : 2.93},
			        {host : "host13", rack : "rack2", capacity : 492, used : 2.93},
			        {host : "host14", rack : "rack2", capacity : 45, used : 2.93},
			        {host : "host15", rack : "rack2", capacity : 52, used : 2.93},
			        {host : "host16", rack : "rack2", capacity : 47.2, used : 2.93},
			        {host : "host17", rack : "rack2", capacity : 45.2, used : 2.93},
			        {host : "host18", rack : "rack2", capacity : 73.2, used : 2.93},
			        {host : "host19", rack : "rack3", capacity : 99.2, used : 2.93},
			        {host : "host20", rack : "rack3", capacity : 56.2, used : 2.93},
			        {host : "host21", rack : "rack3", capacity : 89.2, used : 2.93},
			        {host : "host22", rack : "rack3", capacity : 79.2, used : 2.93},
			        {host : "host23", rack : "rack3", capacity : 89, used : 2.93},
			        {host : "host24", rack : "rack3", capacity : 442, used : 2.93},
			        {host : "host25", rack : "rack3", capacity : 456, used : 2.93},
			        {host : "host26", rack : "rack3", capacity : 42, used : 2.93},
			        {host : "host27", rack : "rack3", capacity : 51, used : 2.93},
			        {host : "host28", rack : "rack3", capacity : 67.2, used : 2.93},
			        {host : "host29", rack : "rack3", capacity : 96.2, used : 2.93},
			        {host : "host30", rack : "rack3", capacity : 47.2, used : 2.93},
			        {host : "host31", rack : "rack3", capacity : 130.2, used : 2.93},
			        {host : "host32", rack : "rack3", capacity : 45, used : 2.93},
			        {host : "host33", rack : "rack4", capacity : 450, used : 2.93},
			        {host : "host34", rack : "rack4", capacity : 93, used : 2.93},
			        {host : "host35", rack : "rack4", capacity : 42, used : 2.93},
			        {host : "host36", rack : "rack4", capacity : 49.2, used : 2.93}			         
		        ]
	};
	}
