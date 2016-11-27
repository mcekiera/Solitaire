SOLITAIRE.Board = function (deck, piles, deal) {
	var that = this;

	var createPile = function (id) {
		var model = new SOLITAIRE.PileModel(id);
		var view = new SOLITAIRE.PileView(model,$('#' + id));
		var controller = new SOLITAIRE.PileController(model, view);
		return controller;
	};

	var getPiles = function () {
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
	};


	this.piles = getPiles();

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


	this.init = function () {
		dealCards();
		uncoverLast();
	};

};
