function Deck() {
	"use strict";

	var that = this;
	var colors = ["spades", "clubs", "hearts", "tiles"];
	var figures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	var set = [];

	for (var i = 0; i < colors.length; i++) {
		for (var j = 0; j < figures.length; j++) {
			// var card = new Card(figures[j], colors[i]);
			set.push(new Card(figures[j], colors[i]));
		}
	}

	this.cards = set;
	this.getCard = function () {
		var rand = Math.random() * that.cards.length;
		return that.cards.pop();
	};
}

function Card(figure, color) {
	"use strict";

	var that = this;
	this.figure = figure;
	this.color = color;
	// this.toString = function () {
	// 	return that.col + that.fig;
	// };
	// this.html = "<div class=\"card card--" + this.color + "\" data-figure=\"" + this.figure + "\"><span class=\"card__fig\"><span class=\"card__interior\"></span></span></div>";
}
