SOLITAIRE.PileModel = function (id) {
	var that = this;

	this.cards = [];
	this.getID = function() {
		return id;
	};

	this.getCards = function (index) {
		var hand = that.cards.splice(index);
		that.cardRemoved.notify({});
		return hand;

	};

	this.length = function () {
		return that.cards.length;
	};

	this.addCard = function(card) {
		that.cards.push(card);
		that.cardAdded.notify({items: [card]});
	};

	this.addCards = function (cards) {
		that.cards = that.cards.concat(cards);
		that.cardAdded.notify({items: cards});
	};

	this.indexOf = function(card) {
		for (var i = 0; i < that.cards.length; i += 1) {
			if(that.cards[i].getID() === card) {
				return i;
			}
		}
	};

	this.cardAdded = new SOLITAIRE.Event(this);
	this.cardRemoved = new SOLITAIRE.Event(this);
};

SOLITAIRE.PileView = function (model, element) {
	var that = this;
	this.$element = element;

	this.updated = new SOLITAIRE.Event(this);

	model.cardAdded.attach(function (event, args) {
		console.log('args: ' + args.items);
		for (var i = 0; i < args.items.length; i += 1) {
			$('#' + args.items[i]).css('left', '').css('top', '');
		}
		that.updateView();
	});

	model.cardRemoved.attach(function () {
		that.updateView();
		that.updated.notify({});
	});

	this.updateView = function () {
		var len =  model.cards.length;
		console.log(model.getID() + ': ' + len)
		if (len >= 10 && !that.$element.children().hasClass('tight')) {
			that.$element.children().toggleClass('tight');
		} else if(len < 10 && that.$element.children().hasClass('tight')){
			that.$element.children().toggleClass('tight');
		}

		for (var i = 0; i < len; i++) {
			var $card = $('#' + model.cards[i].getID());
			that.$element.children().append($card);
		}
	};
};

SOLITAIRE.PileController = function (model, view) {
	var that = this;
	this.addCard = model.addCard;
	this.addCards = model.addCards;
	this.removeCard = model.removeCard;
	this.getID = model.getID;
	this.getCards = model.getCards;
	this.length = function () {
		return model.cards.length;
	};

	this.toString = function () {
		return model.cards.toString();
	};

	this.indexOf = model.indexOf;

	this.moved = new SOLITAIRE.Event(this);

	this.uncoverLast = function () {
		var card = that.getLastCard();
		console.log('last:' + card)
		if (typeof card !== 'undefined' && card.getCovered()) {
			card.uncover();
		}
	};

	this.getLastCard = function () {
		return model.cards[model.cards.length-1];
	};
	
	this.init = function () {
		view.$element.children().droppable({
			stack: '.card',
			drop: function (event, ui) {
				var trans = {
					cardID: ui.draggable.attr('id'),
					fromID: ui.draggable.parent().parent().attr('id'),
					toID: $(event.target).parent().attr('id')
				};
				that.moved.notify(trans);
			}
		});
	};
};
