var nodeCounter = 0;
function nodeInfomationMock() {
	nodeCounter++;
	if (nodeCounter > 10) {
		nodeCounter = 0;
	}
	var nodeInfomationProperty = {
		type : wgp.constants.CHANGE_TYPE.ADD,
		time : new Date(),
		value : nodeCounter
	};

	var sendNodeInfomationData = [ {
		windowId : "nodeGraph",
		data : [ nodeInfomationProperty ]
	} ];

	appView.notifyEvent(sendNodeInfomationData);

};