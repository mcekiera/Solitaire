SOLITAIRE.Board = function (deck, piles, deal, rulebook, table) {
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
					var card = deck.getRandomCard();
					that.piles[key].addCard(card);
				}
			}
		}
	};

	var setScoreCard = function(){
		var model = new SOLITAIRE.ScoreModel(table);
		var view = new SOLITAIRE.ScoreView(model, $('#js-points'), $('#js-moves'));
		var controller = new SOLITAIRE.ScoreController(model, view);

		$('#js-board').on('points', function (event, args) {
			controller.countPoints(args);
		});
	};

	var setTimer = function () {
		var model = new SOLITAIRE.TimerModel();
		var view = new SOLITAIRE.TimerView(model, $('#js-time'));
		var controller = new SOLITAIRE.TimerController(model, view);

		controller.init();
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
		var cards = fromPile.getCards(index);
		toPile.addCards(cards);

		if (!args.revert) {
			registerMove({move: 'move', args: args});
		}

		$('#js-board').trigger('points',(args));
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

	var revert = {
		move: function (input) {
			 moveCards ({
				fromID: input.args.toID,
				toID: input.args.fromID,
				cardID: input.args.cardID,
				revert: true
			});
			if (input.args.prev) {
				that.piles[input.args.fromID].coverFirst();
			}

		},
		moveAll: function (input) {
			moveAllCards({
				fromID: input.args.toID,
				toID: input.args.fromID,
				revert: true
			});
		}
	};

	var isVictory = function () {
		var result =  that.piles['js-foundation-0'].length === 13 &&
			that.piles['js-foundation-1'].length === 13 &&
			that.piles['js-foundation-2'].length === 13 &&
			that.piles['js-foundation-3'].length === 13;
		if(result) {
			console.log('Victory!');
		}
		return result;
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
		setScoreCard();
		setTimer();

		$('#js-revert').click(function () {
			var move = moves.pop();
			revert[move.move](move);
		});

		$('#js-new-game').click(function () {
			SOLITAIRE.newGame();
		});

		$('#js-retry').click(function () {
			while (moves.length !== 0) {
				var move = moves.pop();
				revert[move.move](move);
			}
		});

		var finished = false;

		$('#js-board').on('points', function () {

			var tryWith = function (foundation, tableau, card) {
				if (!(typeof card === 'undefined')) {
					var cards = {
						fromID: tableau.getID(),
						toDrop: card,
						onPile: foundation.getLastCard()
					};
					if (foundation.test(cards)) {
						var args = {
							cardID: card.getID(),
							fromID: tableau.getID(),
							toID: foundation.getID(),
							prev: true
						};
						console.log(args);
						moveCards(args);
					}
				}
			};

			if($('.covered').length === 0 && that.piles['js-waste'].length() === 0 && !finished) {
				finished = true;
				for (var r = 0; r < 13; r += 1) {
					for (var i = 0; i < piles.tableau.length; i += 1) {
						var tableau = that.piles[piles.tableau[i]];
						for (var j = 0; j < piles.foundation.length; j += 1) {
							var foundation = that.piles[piles.foundation[j]];
							var card = tableau.getLastCard();
							tryWith(foundation, tableau, card);
						}
					}
				}
			}
		});
	};
};
