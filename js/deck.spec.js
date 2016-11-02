var Deck = require('./deck.js');

describe('Deck', function() {
	it('has trefl cards', function() {
		var deck = new Deck();
		var trefl = deck.getCards().filter(card => card.color = 'Trefl');
		expect(trefl.length === 13);
	});

	it('has pik cards', function() {
		var deck = new Deck();
		var trefl = deck.getCards().filter(card => card.color = 'Pik');
		expect(trefl.length === 13);
	});

	it('has heart cards', function() {
		var deck = new Deck();
		var trefl = deck.getCards().filter(card => card.color = 'Heart');
		expect(trefl.length === 13);
	});

	it('has bell cards', function() {
		var deck = new Deck();
		var trefl = deck.getCards().filter(card => card.color = 'Bell');
		expect(trefl.length === 13);
	});

	it('get random card', function() {
		var deck = new Deck();
		var card = deck.getCard();
		expect(deck.getCards().indexOf(card) === -1);
	});


});