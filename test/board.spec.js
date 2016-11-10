describe("Game board setting", function() {

    it("setting board makes deck empty", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(deck.cards.length).toBe(0);
    });

    it("first tableu pile has 1 card", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["1"].length).toBe(1);
    });

    it("1st tableu pile has 1 card", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["1"].length).toBe(1);
    });

    it("2nd tableu pile has 2 cards", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["2"].length).toBe(2);
    });

    it("3rd tableu pile has 3 cards", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["3"].length).toBe(3);
    });

    it("4th tableu pile has 4 cards", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["4"].length).toBe(4);
    });

    it("5th tableu pile has 5 cards", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["5"].length).toBe(5);
    });

    it("6th tableu pile has 6 cards", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["6"].length).toBe(6);
    });

    it("7th tableu pile has 7 cards", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.tableu["7"].length).toBe(7);
    });

    it("stock pile has 24 cards", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.stock.length).toBe(24);
    });

    it("talon pile is emtpy", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.talon.length).toBe(0);
    });

    it("fundation piles are emtpy", function() {
        var deck = new Deck();
        var board = new Board();
        board.set(deck);
        expect(board.fundations["tiles"].length).toBe(0);
        expect(board.fundations["clubs"].length).toBe(0);
        expect(board.fundations["spades"].length).toBe(0);
        expect(board.fundations["hearts"].length).toBe(0);
    });

});