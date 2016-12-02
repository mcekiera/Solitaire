SOLITAIRE.Board = function (deck, piles, deal, rulebook) {
	"use strict";
	var that = this;
	var moves = [];

	var createPile = function (id) {
		var model = new SOLITAIRE.PileModel(id);
		var view = new SOLITAIRE.PileView(model,$('#' + id));
		var controller = new SOLITAIRE.PileController(model, view);
		controller.init();

		controller.moved.attach(function (sender, args) {
			moveCards(args);
		});

		if(id !== 'js-stack') {
			view.updated.attach(function () {
				controller.uncoverLast();
			});
		}

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
		var index = fromPile.indexOf(args.cardID);
		toPile.addCards(fromPile.getCards(index));

		if (!args.revert) {
			registerMove({move: 'move', args: args});
		}
	};

	var moveAllCards = function (args) {
		var fromPile = that.piles[args.fromID];
		var toPile = that.piles[args.toID];

		var pile = fromPile.getCards(0);
		pile.reverse();
		pile.forEach(function (card) {
			(card.getCovered() ? card.uncover : card.cover)();
		});
		toPile.addCards(pile);

		if (!args.revert) {
			registerMove({move: 'moveAll', args: args});
		}
	};

	var dealFromStack = function () {
		var stack = that.piles['js-stack'];
		var args;
		$('#js-stack').click(function () {
			console.log(stack.length())
			if(stack.length() === 0) {
				args = {
					fromID: that.piles['js-waste'].getID(),
					toID: that.piles['js-stack'].getID(),
					prev: true
				};
				moveAllCards(args);
			} else {
				var card = that.piles['js-stack'].getLastCard();
				args = {
					cardID: card.getID(),
					fromID: that.piles['js-stack'].getID(),
					toID: that.piles['js-waste'].getID(),
					prev: true
				};
				moveCards(args);
				card.uncover();
				}
			});
	};

	var setRules = function () {
		for (var key in piles) {
			if (piles.hasOwnProperty(key)) {
				var rule = rulebook.get[key];
				for (var i = 0; i < piles[key].length; i += 1) {
					that.piles[piles[key][i]].setRules(rule);
				}
			}
		}
	};

	var revert = function (input) {
		switch (input.move) {
			case 'move':
				moveCards ({
					fromID: input.args.toID,
					toID: input.args.fromID,
					cardID: input.args.cardID,
					revert: true
				});
				if (input.args.prev) {
					that.piles[input.args.fromID].coverFirst();
				}
				break;
			case 'moveAll':
				moveAllCards({
					fromID: input.args.toID,
					toID: input.args.fromID,
					revert: true
				});
		}
	};

	var cleanMoves = function () {
		moves = [];
	};

	var registerMove = function (args) {
		moves.push(args);
	};

	this.init = function () {
		dealCards();
		uncoverLast();
		dealFromStack();
		setRules();
		cleanMoves();

		$('#js-revert').click(function () {
			revert(moves.pop());
		});

		$('#js-new-game').click(function () {
			SOLITAIRE.newGame();
		});
	};
};
