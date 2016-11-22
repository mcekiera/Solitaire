function Board(deck) {

	var isAce = function (that, card) {
		return typeof that === 'undefined' && Card.isAce(card);
	};

	var isInColorOrder = function (that, card) {
		try {
			return that.isRankBelow(card) && that.isSameColor(card);
		} catch (err) {
			return false;
		}
	};

	var isSingleCard = function (that, card) {
		try {
			console.log('3 lines: that, card, nextall.length')
			console.log(that);
			console.log(card);
			console.log(card.$element.nextAll().length);
			return card.$element.nextAll().length === 0;
		} catch (err) {
			return false;
		}
	}

	this.stack = new Stack($('#js-stack'), deck);
	this.waste = new Stack($('#js-waste'), deck);

	this.fundation = {
		"js-foundation-spades": new Stack($('#js-foundation-spades'), deck),
		"js-foundation-clubs": new Stack($('#js-foundation-clubs'), deck),
		"js-foundation-tiles": new Stack($('#js-foundation-tiles'), deck),
		"js-foundation-hearts": new Stack($('#js-foundation-hearts'), deck)
	};

	this.fundation["js-foundation-spades"].addFilter(isAce);
	this.fundation["js-foundation-spades"].addFilter(isInColorOrder);
	this.fundation["js-foundation-spades"].addFilter(isSingleCard);
	this.fundation["js-foundation-clubs"].addFilter(isAce);
	this.fundation["js-foundation-clubs"].addFilter(isInColorOrder);
	this.fundation["js-foundation-clubs"].addFilter(isSingleCard);
	this.fundation["js-foundation-tiles"].addFilter(isAce);
	this.fundation["js-foundation-tiles"].addFilter(isInColorOrder);
	this.fundation["js-foundation-hearts"].addFilter(isAce);
	this.fundation["js-foundation-hearts"].addFilter(isInColorOrder);



	this.tableau = {
		1: new Stack($('#js-tableau-0'), deck),
		2: new Stack($('#js-tableau-1'), deck),
		3: new Stack($('#js-tableau-2'), deck),
		4: new Stack($('#js-tableau-3'), deck),
		5: new Stack($('#js-tableau-4'), deck),
		6: new Stack($('#js-tableau-5'), deck),
		7: new Stack($('#js-tableau-6'), deck)
	};

	for (var pile in this.tableau) {
		if(this.tableau.hasOwnProperty(pile)) {
			for (var n = pile; n > 0; n--) {
				this.tableau[pile].addCard(deck.getRandomCard());
			}
			this.tableau[pile].cards[pile-1].$element.addClass('uncovered').removeClass('covered');
		}
	}

	for (var c = deck.cards.length; c > 0; c--) {
		this.stack.addCard(deck.getRandomCard());
	}



}
