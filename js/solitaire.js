var SOLITAIRE = {
	init: function () {
		var that = this;
		this.colors = ['clubs', 'spades', 'hearts', 'tiles'];
		this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.deck = new SOLITAIRE.Deck();

		this.piles = function () {
			var piles = [];
			var r;
			for(r = 0; r < 7; r += 1) {
				var model = new SOLITAIRE.pileModel();
				var view = new SOLITAIRE.pileView(model, $('#js-tableau-' + r));
				console.log('#js-tableau-' + r)
				var controller = new SOLITAIRE.pileController(model, view);
				piles.push(model);
			}

			for(var t = 0; t < 7; t += 1) {
				for(var k = 1; k <= t+1; k += 1) {
					var card = that.deck.getRandomCard();
					console.log(card.getID());
					piles[t].addCard(card);
				}
			}
			return piles;
		}();
	},

	cardModel: ''
	

};





