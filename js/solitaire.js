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
		var tableau = [$('#js-tableau-0'), $('#js-tableau-1'), $('#js-tableau-2'), $('#js-tableau-3'), $('#js-tableau-4'), $('#js-tableau-5'), $('#js-tableau-6')];
		var deck = new Deck();

		for (var q = 0; q < 7; q++) {
			for (var s = q + 1; s > 0; s--) {
				tableau[q].append(deck.getCard().$element);
			}
		}

		for (var i = 0; i < deck.cards.length; i++) {
			stock.append(deck.getCard().$element);
		}

		$(".card" ).draggable({
			zIndex: 99999999,
			stack: ".card",

			drag: function(){
				// $(this).addClass('flipped');
				var offset = $(this).offset(),
					xPos = offset.left,
					yPos = offset.top;
			},

			revert : function() {
				$(this).data("uiDraggable").originalPosition = {
					top : 0,
					left : 0
				};
				return true;
			}
		});

		$('.deck').droppable({
			drop: function (event, ui) {
				var target = $(event.target);
				$(ui.draggable).appendTo(target);
				$(ui.draggable).css("left", 0);
				$(ui.draggable).css("top", 0);

			}
		});

		console.log($('#js-stock .card:last-child'));
		console.log($('#js-stock .card:last-child').attr('data-figure'));
	};

	setSolitaire();


});