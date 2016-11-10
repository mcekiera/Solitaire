describe("Deck", function() {
    "use strict";

    it("has 13 Clubs cards", function() {
        var deck = new Deck();
        var clubs = deck.cards.filter(card => card.color === "Clubs");
        expect(clubs.length === 13).toBe(true);
    });

    it("has 13 Spades cards", function() {
        var deck = new Deck();
        var spades = deck.cards.filter(card => card.color === "Spades");
        expect(spades.length === 13).toBe(true);
    });

    it("has 13 Hearts cards", function() {
        var deck = new Deck();
        var hearts = deck.cards.filter(card => card.color === "Hearts");
        expect(hearts.length === 13).toBe(true);
    });

    it("has 13 Tiles cards", function() {
        var deck = new Deck();
        var tiles = deck.cards.filter(card => card.color === "Tiles");
        expect(tiles.length === 13).toBe(true);
    });

    it("each figure has 4 colors", function() {
        var deck = new Deck();
        var figure = deck.cards.filter(card => card.figure === 1);
        console.log(figure);
        expect(figure.length === 4).toBe(true);
        expect(figure).toContain({figure: 1, color: "Clubs"});
        expect(figure).toContain({figure: 1, color: "Hearts"});
        expect(figure).toContain({figure: 1, color: "Tiles"});
        expect(figure).toContain({figure: 1, color: "Spades"});
    });

    it("get random card", function() {
        var deck = new Deck();
        expect(deck.cards.length === 52).toBe(true);
        var card = deck.getCard();
        expect(deck.cards).not.toContain(card);
        expect(deck.cards.length === 52).toBe(false);
    });


});