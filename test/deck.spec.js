describe("Deck", function() {
    "use strict";

    it("has 13 Clubs cards", function() {
        var deck = new Deck();
        var clubs = deck.cards.filter(card => card.color === "clubs");
        expect(clubs.length === 13).toBe(true);
    });

    it("has 13 Spades cards", function() {
        var deck = new Deck();
        var spades = deck.cards.filter(card => card.color === "spades");
        expect(spades.length === 13).toBe(true);
    });

    it("has 13 Hearts cards", function() {
        var deck = new Deck();
        var hearts = deck.cards.filter(card => card.color === "hearts");
        expect(hearts.length === 13).toBe(true);
    });

    it("has 13 Tiles cards", function() {
        var deck = new Deck();
        var tiles = deck.cards.filter(card => card.color === "tiles");
        expect(tiles.length === 13).toBe(true);
    });

    it("has figures in 4 colors", function() {
        var deck = new Deck();
        var figure = deck.cards.filter(card => card.figure === 1);
        expect(figure.length === 4).toBe(true);
        expect(figure.filter(card => card.color === 'clubs').length === 1).toBe(true);
        expect(figure.filter(card => card.color === 'spades').length === 1).toBe(true);
        expect(figure.filter(card => card.color === 'hearts').length === 1).toBe(true);
        expect(figure.filter(card => card.color === 'tiles').length === 1).toBe(true);
    });

    it("length should decrease after it return random card", function() {
        var deck = new Deck();
        expect(deck.cards.length === 52).toBe(true);
        var card = deck.getCard();
        expect(deck.cards.length === 52).toBe(false);
    });

	it("should not contain card it already returned", function() {
		var deck = new Deck();
		var card = deck.getCard();
		expect(deck.cards).not.toContain(card);
		deck.cards.push(card);
		expect(deck.cards).toContain(card);
	});


});