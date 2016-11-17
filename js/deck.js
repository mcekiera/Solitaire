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


};

Deck.colors = ['clubs', 'spades', 'hearts', 'tiles'];
Deck.ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
