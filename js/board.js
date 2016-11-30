SOLITAIRE.Board = function (deck, piles, deal) {
	"use strict";
	var that = this;

	var createPile = function (id) {
		var model = new SOLITAIRE.PileModel(id);
		var view = new SOLITAIRE.PileView(model,$('#' + id));
		var controller = new SOLITAIRE.PileController(model, view);
		controller.init();

		controller.moved.attach(function (sender, args) {
			moveCards(args);
		});

		return controller;
	};

	this.piles = (function () {
		var object = {};
		for (var key in piles) {
			if (piles.hasOwnProperty(key)) {
				that[key] = [];
				for (var i = 0; i < piles[key].length; i += 1) {
					var pile = createPile(piles[key][i]);
					object[piles[key][i]] = pile;
					that[key].push(pile);
				}
			}
		}
		return object;
	}());

	var dealCards = function () {
		for (var key in deal) {
			if (deal.hasOwnProperty(key)) {
				for (var k = 0; k < deal[key]; k += 1) {
					that.piles[key].addCard(deck.getRandomCard());
				}
			}
		}
	};

	var uncoverLast = function () {
		for(var c = 0; c < that.tableau.length; c += 1) {
			that.tableau[c].uncoverLast();
		}
	};

	var moveCards = function(args) {
		var fromPile = that.piles[args.fromID];
		var toPile = that.piles[args.toID];
		var index = fromPile.indexOf(args.cardID)

		toPile.addCards(fromPile.getCards(index));
	};

	var dealFromStack = function () {
		$('#' + that.piles['js-stack'].getID()).click(function () {
			console.log('in')
			var card = that.piles['js-stack'].getLastCard();
			card.uncover();
			var args = {
				cardID: card.getID(),
				fromID: that.piles['js-stack'].getID(),
				toID: that.piles['js-waste'].getID()
			};
			moveCards(args);
		});
	};

	this.init = function () {
		dealCards();
		uncoverLast();
		dealFromStack();



	};
};
