describe('Deck object, which represents deck of cards', function () {
	var deck;

	beforeEach(function () {
		deck = new Deck();
	});

	it('should have 52 cards', function () {
		expect(deck.cards.length).toEqual(52);
	});

	it('should have 13 clubs cards', function () {
		var clubs = deck.cards.filter(card => card.color === 'clubs');
		expect(clubs.length).toEqual(13);
	});

	it('should have 13 hearts cards', function () {
		var hearts = deck.cards.filter(card => card.color === 'hearts');
		expect(hearts.length).toEqual(13);
	});

	it('should have 13 tiles cards', function () {
		var tiles = deck.cards.filter(card => card.color === 'tiles');
		expect(tiles.length).toEqual(13);
	});


	it('should have 13 spades cards', function () {
		var spades = deck.cards.filter(card => card.color === 'spades');
		expect(spades.length).toEqual(13);
	});

	it('should have 13 spades cards', function () {
		for (var i = 0; i < Deck.colors.length; i++) {
			for (var k = 0; k < Deck.ranks.length; k++) {
				expect(deck[Deck.colors[i] + '-' + Deck.ranks[k]]).not.toBeUndefined();
			}
		}
	});

	it('should return random card, and remove it from collection', function () {
		expect(deck.cards.length).toEqual(52);
		for (var i = 52; i >=1; i -= 1) {
			var card = deck.getRandomCard();
			expect(card).not.toBeUndefined();
			expect(card.$element).not.toBeUndefined();
			expect(deck.cards.length).toEqual(i - 1);
			expect(deck.cards).not.toContain(card);
		}
	});

})
;
