function Stack($element) {
	"use strict";
	this.$emement = $element;
	
	var filters = [];

	this.addFilter = function(f) {
		filters.push(f);
	};

	this.removeFilter = function (f) {
		filters.remove(f);
	};

}
