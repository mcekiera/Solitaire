var solitaire = function() {
	"use strict";

	var deck = new Deck();
	var board = new Board(deck);

	$('.uncovered').draggable({
		zIndex: 99999999,
		stack: ".card"
	});

	$('#js-stack').click(function () {
		var card = board.stack.cards.pop();
		card.$element.addClass('uncovered');
		board.waste.addCard(card);
	})




}

solitaire();
