function Deck() {

		"use strict";

		var that = this;
		var set = [];

		for (var i = 0; i < Deck.colors.length; i++) {
			for (var j = 0; j < Deck.figures.length; j++) {
				set.push(new Card(Deck.figures[j], Deck.colors[i]));
			}
		}

		this.cards = set;
		this.getCard = function () {
			var rand = Math.random() * that.cards.length;
			return that.cards.splice(rand, 1)[0];
		};
	}

	Deck.colors = ["spades", "clubs", "hearts", "tiles"];
	Deck.figures = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

	function Card(figure, color) {
		"use strict";

		var that = this;
		this.figure = figure;
		this.color = color;
		this.toString = function () {
			return that.col + that.figure;
		};
		this.$element = createElement();

		function createElement() {
			var el = $('<div></div>');
			el.append('<span class="card__fig"><span class="card__interior"></span></span>');
			el.addClass('card card--' + that.color);
			el.attr('data-figure', that.figure);
			return el;
		}
	}

