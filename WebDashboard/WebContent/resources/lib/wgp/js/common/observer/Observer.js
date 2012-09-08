/**
 * observe parent object.
 * 
 * @param options options.
 * @returns {Observer} this
 */
function Observer(options){
	this.targetList_ = {};	
	this.subject_ = null;
};

Observer.prototype.setTarget = function(id, target) {
	this.targetList_[id] = target;
};

Observer.prototype.removeTarget = function(id) {
	delete this.targetList_[id];
};

Observer.prototype.setSubject = function(subject) {
	this.subject_ = subject;
};

Observer.prototype.removeSubject = function() {
	this.subject_ = null;
	
};

/**
 * add event to subjects.
 */
Observer.prototype.addEvent = function(){
	
};

/**
 * remove event from subjects
 */
Observer.prototype.removeEvent = function(){
	
};
