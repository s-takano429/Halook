var region_num = 5;
function hbaseMock(){
	
	var delta = 2;
	region_num += delta
	var hbaseProperty1 = {
			type		: wgp.constants.CHANGE_TYPE.ADD,
			//time		: "2012-08-28 14:00:00",
			time		: new Date(),
			region_num	: 4,
			amount		: 10,
			event		: "split"
		};
	
	sendData = [ {
		windowId : "contents_area_0",
		data : [hbaseProperty1]
	} ];
	
	appView.notifyEvent(sendData);
	//console.log('send data');
	
};