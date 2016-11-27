SOLITAIRE.Board = function (deck, piles, deal) {
	var that = this;

	var createPile = function (id) {
		var model = new SOLITAIRE.PileModel(id);
		var view = new SOLITAIRE.PileView(model,$('#' + id));
		var controller = new SOLITAIRE.PileController(model, view);
		return model;
	};

	var getPiles = function () {
		var temp = {};
		for (var i = 0; i < piles.length; i += 1) {
			temp[piles[i]] = (createPile(piles[i]));
		}
		return temp;
	};


	this.piles = getPiles();

	var dealCards = function () {
		for (var key in deal) {
			if (deal.hasOwnProperty(key)) {
				for (var k = 0; k < deal[key]; k += 1) {
					console.log(that.piles)
					console.log(key)
					that.piles[key].addCard(deck.getRandomCard());
				}
			}
		}
	};


	this.init = function () {
		dealCards();
	};

};
