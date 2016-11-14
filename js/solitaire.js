$(function () {
	var setSolitaire = function () {
		var stock = $('#js-stock');
		var waste = $('#js-waste');
		var fundation = {
			spades: $('#js-foundation-spades'),
			hearts: $('#js-foundation-hearts'),
			clubs: $('#js-foundation-clubs'),
			tiles: $('#js-foundation-tiles')
		};
		var tableau = [$('#js-tableau-7'), $('#js-tableau-1'), $('#js-tableau-2'), $('#js-tableau-4'), $('#js-tableau-4'), $('#js-tableau-5'), $('#js-tableau-6')];
		var deck = new Deck();

		for (var i = 0; i < deck.cards.length; i++) {
			console.log(deck.getCard());
			stock.append(deck.getCard().$element);
		}
	};

	setSolitaire();


});