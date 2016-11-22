var solitaire = function() {
	"use strict";

	var deck = new Deck();
	var board = new Board(deck);

	var updatePile = function(pile) {
		console.log('updatePile: pile, uncover.length, last');
		console.log(pile);
		console.log(pile.find('ul').find('uncovered').length);
		console.log(pile.find('ul').last());
		if(pile.children('ul').children('uncovered').length === 0) {
			pile.children().children().last().removeClass('covered').addClass('uncovered');
		}
	};

	var makeDraggable = function() {
		$('li.uncovered').draggable({
			oldZ: 0,
			stack: ".card, .deck",
			zIndex: 99,

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
				var z = $(this).css('z-index');

				$('.uncovered.hold').each(function() {
					z += 1;
					$(this).trigger('drag');
					$(this).addClass('ui-draggable-dragging');
					$(this).css('left', mainleft);
					$(this).css('top', maintop);
					$(this).css('z-index',z);
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
			}
		});
	};
	
	$('li.uncovered').on('mousedown', function () {
		$(this).addClass('prime');
		$(this).nextAll().addClass('hold');
	});

	$('li.uncovered').on('mouseup', function () {
		$(this).removeClass('prime');
	});

	$('#js-foundation-spades').droppable({
		drop: function (event, ui) {

			acceptedDrop(event, ui);
		},
		accept: function (val) {
			console.log(board.fundation.spades.$element);
			return board.fundation.spades.test(val);
		}
	});

	// $('.deck').droppable({
	// 	drop: function (event, ui) {
	// 		acceptedDrop(event, ui)
	// 	}
	// });

	var acceptedDrop = function (event, ui) {
		var target = $(event.target).find('ul');
		var $hold = $(ui.draggable).nextAll();
		var $parent = $(ui.draggable).parent().parent();
		$(ui.draggable).appendTo(target);
		$hold.appendTo(target).css('left','').css('top','').css('position','relative');
		$(ui.draggable).removeAttr('style');
		updatePile($parent);
	}

	$('#js-stack').click(function () {
		var card = board.stack.cards.pop();
		if(card) {
			card.$element.addClass('uncovered');
			card.$element.removeClass('covered');
			board.waste.addCard(card);
		}
		makeDraggable();
	});



	makeDraggable();

};

solitaire();
