/**
 * Object represents full deck of 52 playing cards. Cards are available by array in cards property, or by separate
 *  for each card, named with id property of given card. The constructor has two properties, colors - the set of permitted
 * color values, and ranks - set of permitted rank property values.
 * @constructor
 */

function Deck() {
	"use strict";
	var that = this;


	this.cards = function () {
		var arr = [];

		for (var i = 0; i < Deck.colors.length; i++) {
			for (var k = 0; k < Deck.ranks.length; k++) {
				var card = new Card(Deck.colors[i], Deck.ranks[k]);
				that[card.id] = card;
				arr.push(card);
			}
		}

		return arr;
	}();

	this.getRandomCard = function () {
		var index = Math.random() * this.cards.length;
		return this.cards.splice(index,1);
	};


};

Deck.colors = ['clubs', 'spades', 'hearts', 'tiles'];
Deck.ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
