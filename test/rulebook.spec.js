describe('Object, contains game rules. In a given case', function () {
	var rulebook;

	beforeEach(function () {
		"use strict";
		rulebook = new SOLITAIRE.Rulebook();
	});

	it('should return true if particular card is Ace rank, and return false if it is not an Ace rank card', function () {
		"use strict";
		var card = new SOLITAIRE.CardModel('spades', 'A');
		expect(rulebook.isAce(card)).toBe(true);
		var other = new SOLITAIRE.CardModel('clubs', '9');
		expect(rulebook.isAce(other)).toBe(false);
	});

	it('should return true if particular card is King rank, and return false if it is not an King rank card', function () {
		"use strict";
		var card = new SOLITAIRE.CardModel('spades', 'K');
		expect(rulebook.isKing(card)).toBe(true);
		var other = new SOLITAIRE.CardModel('clubs', '9');
		expect(rulebook.isKing(other)).toBe(false);
	});
});
