var SOLITAIRE = {
	init: function () {
		var that = this;

		var piles = {
			basic: ['js-stack', 'js-waste'],
			tableau: ['js-tableau-0', 'js-tableau-1', 'js-tableau-2', 'js-tableau-3', 'js-tableau-4', 'js-tableau-5', 'js-tableau-6'],
			foundation: ['js-foundation-0', 'js-foundation-1', 'js-foundation-2', 'js-foundation-3']
		};
		var deal = {
			'js-stack': 24,
			'js-tableau-0': 1,
			'js-tableau-1': 2,
			'js-tableau-2': 3,
			'js-tableau-3': 4,
			'js-tableau-4': 5,
			'js-tableau-5': 6,
			'js-tableau-6': 7
		};

		var table = {
			tableau: {
				foundation: 10,
				tableau: 0
			},
			foundation: {
				tableau: -15
			},
			waste: {
				tableau: 5,
				foundation: 10
			},
			stack: {
				waste: 0,
				tableau: 0,
				foundation: 0
			}
		};

		this.colors = ['clubs', 'spades', 'hearts', 'tiles'];
		this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.deck = new SOLITAIRE.Deck();
		this.rules = new SOLITAIRE.Rulebook();
		this.board = new SOLITAIRE.Board(this.deck,piles,deal,this.rules,table);
		this.board.init();

		this.newGame = function () {
			location.reload();
		};
	}
};





