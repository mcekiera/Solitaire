describe('Object, representing a single card', function () {
	var card;

	beforeEach(function () {
		card = new Card('spades','A');
	})

	it('should return true if compared with other card of same color, and false if it is not', function() {
		"use strict";
		var other1 = new Card('spades', '9');
		expect(card.isSameColor(other1)).toBe(true);
		var other2 = new Card('clubs', '9');
		expect(card.isSameColor(other2)).toBe(false);
	});

	it('should return true if given card is next in color rank sequence, or false if it is not', function () {
		var other1 = new Card('spades', '2');
		expect(other1.isRankOver(card)).toBe(true);
		var other2 = new Card('spades', '9');
		expect(other2.isRankOver(card)).toBe(false);
		expect(other1.isRankOver(other2)).toBe(false);
		expect(other1.isRankOver(other1)).toBe(false);
	});

	it('should return true if given card is previous in color rank sequence, or false if it is not', function () {
		var other1 = new Card('spades', '2');
		expect(card.isRankBelow(other1)).toBe(true);
		var other2 = new Card('spades', '9');
		expect(other2.isRankBelow(card)).toBe(false);
		expect(other1.isRankBelow(other2)).toBe(false);
		expect(other1.isRankBelow(other1)).toBe(false);
		var other3 = new Card('tiles', '8');
		expect(other3.isRankBelow(other2)).toBe(true);
	});

	it('should return true if given card is in same color group as other', function () {
		var other1 = new Card('clubs', '2');
		expect(other1.isSameColorGroup(card)).toBe(true);
		var other2 = new Card('tiles', '9');
		expect(other2.isSameColorGroup(card)).toBe(false);
		var other3 = new Card('hearts','A');
		expect(other2.isSameColorGroup(other3)).toBe(true);
	});
})
