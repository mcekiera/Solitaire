function Stack($element, $deck) {
	"use strict";
	var that = this;
	this.$element = $element.find('ul');
	this.cards = [];


	var filters = [];

	this.addFilter = function(f) {
		filters.push(f);
	};

	this.removeFilter = function (f) {
		filters.remove(f);
	};

	this.test = function (el) {
		var lastCard = $deck[that.$element.last().attr('id')];
		var card = $deck[el.attr('id')];
		for (var i = 0; i < filters.length; i++) {
			filters[i].apply(lastCard, card);
		}
	};

	this.addCard = function(card) {
		this.cards.push(card);
		console.log(card.$element);
		this.$element.append(card.$element);
	};

}
