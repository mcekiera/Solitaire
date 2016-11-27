SOLITAIRE.PileModel = function (id) {
	var that = this;
	var cards = [];

	this.getID = function() {
		return id;
	};

	this.getCards = function () {
		return cards;
	};


	this.addCard = function(card) {
		cards.push(card);
		that.cardAdded.notify({});
	};

	this.removeCard = function (card) {
		cards.remove(card);
		that.cardAdded.notify({});
	};

	this.cardAdded = new SOLITAIRE.Event(this);
	this.cardRemoved = new SOLITAIRE.Event(this);

};

SOLITAIRE.PileView = function (model, element) {
	var that = this;
	this.$element = element;

	model.cardAdded.attach(function () {
		that.updateView();
	});

	model.cardRemoved.attach(function () {
		that.updateView();
	});

	this.updateView = function () {
		// that.$element.children().empty();
		for (var i = 0; i < model.getCards().length; i++) {
			that.$element.children().append($('#' + model.getCards()[i].getID()));
		};
	};
};

SOLITAIRE.PileController = function (model, view) {

};
