var regiondatamockcount=0 ;


function RegionDataMock(){
	regiondatamockcount++;
	var regionProperty1={
		type : wgp.constants.CHANGE_TYPE.ADD,
		num : regiondatamockcount, 
		colnum : "columnnumber"	
	};
	var sendRegionData=[{
		windowId : "region_area",
		data : [regionProperty1]
	}];
	appView.notifyEvent(sendRegionData);
};