/**
 * Created by kris on 13/10/15.
 */

function Builder() {
	var that = this;

	this.currentView = '';

	this.buildDoc = function(resource) {
		console.log(resource);
		var parser = new DOMParser();
		var doc = parser.parseFromString(resource, "application/xml");
		that.currentView = doc;
		return doc;
	};

	this.getCurrentView = function() {
		return that.currentView;
	};
}

module.exports = new Builder();