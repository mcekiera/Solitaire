function Board(deck) {

	this.stack = new Stack($('#js-stack'), deck);
	this.waste = new Stack($('#js-waste'), deck);

	this.fundation = {
		spades: new Stack($('#js-foundation-spades'), deck),
		clubs: new Stack($('#js-foundation-clubs'), deck),
		tiles: new Stack($('#js-foundation-tiles'), deck),
		hearts: new Stack($('#js-foundation-hearts'), deck)
	};

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
