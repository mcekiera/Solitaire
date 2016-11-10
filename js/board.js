function Board() {
    "use strict";

    var that = this;

    this.fundations = {
        tiles: [],
        hearts: [],
        clubs: [],
        spades: []
    };

    this.tableu = {
        "1" : [],
        "2" : [],
        "3" : [],
        "4" : [],
        "5" : [],
        "6" : [],
        "7" : []
    };

    this.stock = [];
    this.talon = [];

    this.set = function (deck) {
            for (var piles = 1; piles <= 7; piles++) {
                    if (that.tableu.hasOwnProperty(piles)) {
                            for (var i = 0; i < piles; i++) {
                                var card = deck.getCard();
                                that.tableu[piles].push(card);
                            }

                    }
            }

            while (deck.cards.length > 0) {
                that.stock.push(deck.getCard());
            }
    };
}


