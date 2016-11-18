function Stack($element) {
	"use strict";
	this.$element = $element.find('ul');
	this.cards = [];
	console.log(this.$element.find('ul'));

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
			.append($('<li>').append(card.$element));

	};

}
