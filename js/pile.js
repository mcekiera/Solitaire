SOLITAIRE.PileModel = function (id) {
	var that = this;
	var cards = [];

	this.getID = function() {
		return id;
	};

	this.getCards = function () {
		return cards;
	};

	this.length = function () {
		return cards.length;
	};

	this.addCard = function(card) {
		cards.push(card);
		that.cardAdded.notify({});
	};

	this.removeCard = function (card) {
		cards.remove(card);
		that.cardRemoved.notify({});
	};

	this.cardAdded = new SOLITAIRE.Event(this);
	this.cardRemoved = new SOLITAIRE.Event(this);
};

SOLITAIRE.PileView = function (model, element) {
	var that = this;
	this.$element = element;

	this.updated = new SOLITAIRE.Event(this);

	model.cardAdded.attach(function () {
		that.updateView();
	});

	model.cardRemoved.attach(function () {
		that.updateView();
		that.updated.notify({});
	});

	this.updateView = function () {
		for (var i = 0; i < model.getCards().length; i++) {
			that.$element.children().append($('#' + model.getCards()[i].getID()));
		};
	};
};

SOLITAIRE.PileController = function (model, view) {
	var that = this;
	this.addCard = model.addCard;
	this.removeCard = model.removeCard;
	this.getID = model.getID;
	this.uncoverLast = function () {
		var card = model.getCards()[model.length() - 1];
		if (card.getCovered()) {
			card.uncover();
		}
	}


	view.updated.attach(function () {
		that.uncoverLast();
	});
};
