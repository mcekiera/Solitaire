function Stack($element) {
	"use strict";
	this.$element = $element;
	this.cards = [];
	console.log(this.$element);

	var filters = [];

	this.addFilter = function(f) {
		filters.push(f);
	};

	this.removeFilter = function (f) {
		filters.remove(f);
	};

	this.addCard = function(card) {
		this.cards.push(card);
		console.log(card.$element)
		this.$element
			.append('<li>')
			.append(card.$element);
	};

}
