var solitaire = function() {
	"use strict";

	var deck = new Deck();
	var board = new Board(deck);

	/**
	 * Adds a 'uncovered' class to card object, if there is no uncovered card in the pile.
	 * @param pile a stack object, from which card object was removed
	 */
	var updatePile = function(pile) {
		if(pile.children('uncovered').length === 0) {
			pile.children().last().removeClass('covered').addClass('uncovered');
			makeDraggable();
		}
	};

	var updateOrder = function (pile) {
		var listItems = pile.children().children();
		var base = parseInt(listItems.first().css('z-index'),10);
		for(var i = 0; i < listItems.length; i++) {
			listItems.eq(i).css('z-index',base + i);
		}
	};

	var makeDraggable = function() {
		$('li.uncovered').draggable({
			stack: ".card",

			revert : function(event, ui) {
				$(this).data("uiDraggable").originalPosition = {
					top : 0,
					left : 0,
					zIndex : $(this).next().css('z-index') - 1
				};
				$('.uncovered.hold').each(function() {
					$(this).removeClass('ui-draggable-dragging');
					$(this).animate({top: "0", left: "0"}, 500);
					$(this).removeClass('hold');
				});
				return 'true';
			},

			start: function() {
				$('.uncovered.hold').each(function() {
					$(this).trigger('dragstart');
				});
			},

			drag: function() {
				var maintop = $(this).css('top');
				var mainleft = $(this).css('left');

				$('.uncovered.hold').each(function() {
					$(this).trigger('drag');
					$(this).addClass('ui-draggable-dragging');
					$(this).css('left', mainleft);
					$(this).css('top', maintop);
				});
			},

			stop: function() {
				var maintop = $(this).css('top');
				var mainleft = $(this).css('left');


				$('.uncovered.hold').each(function() {
					$(this).trigger('dragstop');
					$(this).removeClass('ui-draggable-dragging');
				});

				$('.uncovered.hold:first').css('top', maintop);
				$(this).removeClass('prime');
				$('.hold').removeClass('hold');
			}
		});

		$('li.uncovered').on('mousedown', function () {
			$(this).addClass('prime');
			$(this).nextAll().addClass('hold');
		});

		$('li.uncovered').on('mouseup', function () {
			$(this).removeClass('prime');
		});
	};
	
	// DROPPABLE //

	/**
	 * Function restricting which card could be added to given fundation stack;
	 */
	$('#js-foundation-spades ul, #js-foundation-clubs ul, #js-foundation-hearts ul, #js-foundation-tiles ul').droppable({
		drop: function (event, ui) {
			acceptedDrop(event, ui);
		},
		accept: function (val) {
			return board.fundation[$(this).parent().attr('id')].test(val);
		}
	});

	$('.tableau ul').droppable({
		drop: function (event, ui) {
			acceptedDrop(event, ui);
		},
		accept: function (val) {
			var num = /\d/.exec($(this).parent().attr('id'));
			console.log(board.tableau[num].test(val));
			return board.tableau[num].test(val);
		}
	});

	var acceptedDrop = function (event, ui) {
		var $target = $(event.target);
		var $hold = $(ui.draggable).nextAll();
		var $parent = $(ui.draggable).parent();
		$(ui.draggable).appendTo($target).css('left','').css('top','');;
		$hold.appendTo($target).css('left','').css('top','');
		updatePile($parent);
		updateOrder($target.parent());
	}

	$('#js-stack').click(function () {
		var card = board.stack.cards.pop();
		if(card) {
			card.$element.addClass('uncovered');
			card.$element.removeClass('covered');
			board.waste.addCard(card);
		}
		makeDraggable();
		updateOrder($('#js-waste'));
	});



	makeDraggable();
};

solitaire();
