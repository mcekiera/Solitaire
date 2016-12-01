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

	it('should return true, if both cards are same color property', function () {
		var first = new SOLITAIRE.CardModel('spades', 'K');
		var second = new SOLITAIRE.CardModel('spades', '9');
		expect(rulebook.isSameColor(first, second)).toBe(true);
		var otherFirst = new SOLITAIRE.CardModel('spades', 'K');
		var otherSecond = new SOLITAIRE.CardModel('tiles', '9');
		expect(rulebook.isSameColor(otherFirst, otherSecond)).toBe(false);
	});

	it('should return true, if second card is one rank higher than first one, and false if not', function () {
		var first = new SOLITAIRE.CardModel('spades', '10');
		var second = new SOLITAIRE.CardModel('spades', '9');
		expect(rulebook.isRankOver(first, second)).toBe(true);
		var otherFirst = new SOLITAIRE.CardModel('spades', 'J');
		var otherSecond = new SOLITAIRE.CardModel('tiles', 'Q');
		expect(rulebook.isRankOver(otherFirst, otherSecond)).toBe(false);
	});

	it('should return true, if both cards belongs to same color group', function () {
		var first = new SOLITAIRE.CardModel('spades', '10');
		var second = new SOLITAIRE.CardModel('clubs', '9');
		expect(rulebook.isSameColorGroup(first, second)).toBe(true);
		var first1 = new SOLITAIRE.CardModel('spades', 'J');
		var second1 = new SOLITAIRE.CardModel('spades', 'Q');
		expect(rulebook.isSameColorGroup(first1, second1)).toBe(true);
		var first2 = new SOLITAIRE.CardModel('tiles', 'J');
		var second2 = new SOLITAIRE.CardModel('tiles', 'Q');
		expect(rulebook.isSameColorGroup(first2, second2)).toBe(true);
		var first3 = new SOLITAIRE.CardModel('hearts', 'J');
		var second3 = new SOLITAIRE.CardModel('tiles', 'Q');
		expect(rulebook.isSameColorGroup(first3, second3)).toBe(true);
	});

	it('should return false, if cards belongs to different color groups', function () {
		var first = new SOLITAIRE.CardModel('spades', '10');
		var second = new SOLITAIRE.CardModel('tiles', '9');
		expect(rulebook.isSameColorGroup(first, second)).toBe(false);
		var first1 = new SOLITAIRE.CardModel('hearts', 'J');
		var second1 = new SOLITAIRE.CardModel('spades', 'Q');
		expect(rulebook.isSameColorGroup(first1, second1)).toBe(false);
		var first2 = new SOLITAIRE.CardModel('hearts', 'J');
		var second2 = new SOLITAIRE.CardModel('clubs', 'Q');
		expect(rulebook.isSameColorGroup(first2, second2)).toBe(false);
		var first3 = new SOLITAIRE.CardModel('clubs', 'J');
		var second3 = new SOLITAIRE.CardModel('tiles', 'Q');
		expect(rulebook.isSameColorGroup(first3, second3)).toBe(false);
	});



});

describe('Functions modifying DOM structure, ', function () {
	var rulebook;

	beforeEach(function () {
		rulebook = new SOLITAIRE.Rulebook();
		var f = jasmine.getFixtures();
		f.fixturesPath = 'base/test/fixture';
		loadFixtures('test.html');

	});	it('should return false, user is draggin more than one card (there are cards with "hold" class)', function () {
		expect($('.hold').length).toBe(0);
		expect(rulebook.isSingleCard()).toBe(true);
		$('#spades-A').addClass('hold');
		$('#spades-2').addClass('hold');
		expect($('.hold').length).toBe(2);
		expect(rulebook.isSingleCard()).toBe(false);
	});

	it('should return true, if pile is empty (first cord is undefined, and false if it is not', function () {
		var pile = SOLITAIRE.board.piles['js-tableau-0'];
		var c = pile.getCards(0);
		expect(rulebook.pileIsEmpty(pile.getCards(0)[0])).toBe(true);
		pile.addCard(c[0]);
		expect(rulebook.pileIsEmpty(pile.getCards(0)[0])).toBe(false);
	});

	it('should return true, if in given args the source of move is "js-stack"', function () {
		var args = {
			cardID: "spades-A",
			fromID: "js-stack",
			toID: "js-waste",
			prev: true
		};
		expect(rulebook.cardOnWaste(args)).toBe(true);
	});

	it('should return false, if in given args the source of move is not "js-stack"', function () {
		var args = {
			cardID: "spades-A",
			fromID: "js-waste",
			toID: "js-foundation-1",
			prev: true
		};
		expect(rulebook.cardOnWaste(args)).toBe(false);
	});

	it('should return true in case of attempt to add Ace rank card to empty foundation pile', function () {
		var card = new SOLITAIRE.CardModel('spades', 'A')
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: SOLITAIRE.board.piles['js-foundation-0'].getLastCard()
		};
		expect(rulebook.aceOnFoundation(args)).toBe(true);
	});

	it('should return true in case of attempt to add Ace rank card to empty foundation pile', function () {
		var card = new SOLITAIRE.CardModel('spades', '2')
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: SOLITAIRE.board.piles['js-foundation-0'].getLastCard()
		};
		expect(rulebook.aceOnFoundation(args)).toBe(false);
	});

	it('should return true in case of attempt to add King rank card to empty tableau pile', function () {
		var pile = SOLITAIRE.board.piles['js-tableau-0'];
		var c = pile.getCards(0);
		var card = new SOLITAIRE.CardModel('spades', 'K')
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: pile.getLastCard()
		};
		expect(rulebook.kingOnEmptyPile(args)).toBe(true);
	});

	it('should return false in case of attempt to add non-King rank card to empty tableau pile', function () {
		var pile = SOLITAIRE.board.piles['js-tableau-0'];
		var c = pile.getCards(0);
		var card = new SOLITAIRE.CardModel('spades', '2')
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: pile.getLastCard()
		};
		expect(rulebook.kingOnEmptyPile(args)).toBe(false);
	});

	it('should return true in case of attempt to add one rank higher card, than already on pile, to foundation pile', function () {
		var card = new SOLITAIRE.CardModel('spades', '2');
		var onTop = new SOLITAIRE.CardModel('spades', 'A');
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: onTop
		};
		expect(rulebook.cardOnFoundation(args)).toBe(true);
	});

	it('should return false in case of attempt to add non-Ace rank card to empty foundation pile', function () {
		var card = new SOLITAIRE.CardModel('spades', '2');
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: SOLITAIRE.board.piles['js-foundation-0'].getLastCard()
		};
		expect(rulebook.cardOnFoundation(args)).toBe(false);
	});

	it('should return false in case of attempt to add other than one rank higher card to foundation pile', function () {
		var card = new SOLITAIRE.CardModel('spades', '8');
		var onTop = new SOLITAIRE.CardModel('spades', '2');
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: onTop
		};
		expect(rulebook.cardOnFoundation(args)).toBe(false);
	});

	it('should return true in attempt to add one rank lower and different color group card, to tableau pile', function () {
		var card = new SOLITAIRE.CardModel('spades', '8');
		var onTop = new SOLITAIRE.CardModel('tiles', '9');
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: onTop
		};
		expect(rulebook.cardOnTableau(args)).toBe(true);
	});

	it('should return false in attempt to add one rank lower but same color group card, to tableau pile', function () {
		var card = new SOLITAIRE.CardModel('hearts', '8');
		var onTop = new SOLITAIRE.CardModel('tiles', '9');
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: onTop
		};
		expect(rulebook.cardOnTableau(args)).toBe(false);
	});

	it('should return false in attempt to add different color group but invalid rank card, to tableau pile', function () {
		var card = new SOLITAIRE.CardModel('clubs', '8');
		var onTop = new SOLITAIRE.CardModel('tiles', 'K');
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: onTop
		};
		expect(rulebook.cardOnTableau(args)).toBe(false);
	});

	it('should return false in attempt to add invalid color group and rank card to tableau pile', function () {
		var card = new SOLITAIRE.CardModel('hearts', '8');
		var onTop = new SOLITAIRE.CardModel('tiles', 'K');
		var args = {
			fromID: "js-stack",
			toDrop: card,
			onPile: onTop
		};
		expect(rulebook.cardOnTableau(args)).toBe(false);
	});


});
