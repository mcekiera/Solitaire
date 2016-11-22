function Stack($element, $deck) {
	"use strict";
	var that = this;
	this.$element = $element;
	this.cards = [];


	var filters = [];

	this.addFilter = function(f) {
		filters.push(f);
	};

	this.removeFilter = function (f) {
		filters.remove(f);
	};

	this.test = function (el) {

		var lastCard = $deck[that.$element.children().children().last().attr('id')];
		var card = $deck[el.attr('id')];
		for (var i = 0; i < filters.length; i++) {
			if(filters[i].call(lastCard, lastCard, card)) {
				return true;
			}
		}
		return false;
	};

	this.addCard = function(card) {
		this.cards.push(card);

		this.$element.find('ul').append(card.$element);
	};

}
