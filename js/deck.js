SOLITAIRE.Deck = function () {
	var that = this;
	var createCards = function () {
		var array = [];

		for (var i = 0; i < SOLITAIRE.colors.length; i++) {
			for (var k = 0; k < SOLITAIRE.ranks.length; k++) {
				var model = new SOLITAIRE.cardModel(SOLITAIRE.colors[i], SOLITAIRE.ranks[k]);
				var view = new SOLITAIRE.CardView(model, $('#' + model.getID()));
				var controller = new SOLITAIRE.CardController(model, view);
				that[model.getID()] = model;
				array.push(controller);
			}
		}

		return array;
	};

	this.cards = createCards();

	this.getRandomCard = function () {
		var index = Math.random() * that.cards.length;
		return that.cards.splice(index,1)[0];
	};
};
