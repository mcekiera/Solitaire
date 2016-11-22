var solitaire = function() {
	"use strict";

	var deck = new Deck();
	var board = new Board(deck);

	var makeDraggable = function() {
		$('li.uncovered').draggable({
			oldZ: 0,
			stack: ".card",
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
				console.log($(this));
				$('.uncovered.hold').each(function() {
					console.log($(this));
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
					// // $(this).css('left', mainleft);
					// $(this).removeClass('ui-draggable-dragging');
					// $(this).animate({top: "0", left: "0"}, 500);
					// $(this).removeClass('hold');
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

	$('.deck ul').droppable({
		drop: function (event, ui) {
			console.log(event);
			console.log(ui);
			var target = $(event.target);
			var $hold = $(ui.draggable).nextAll();
			$(ui.draggable).appendTo(target);
			$hold.appendTo(target).css('left','').css('top','').css('position','relative');
			ui.draggable.css('left','').css('top','').css('position','relative');

			alignCards(ui.draggable, $hold);
		}
	});

	var alignCards = function(base, rest) {
		var z = base.css('z-index');
		var h = base.css('top');
		var w = base.css('left');
		rest.each(function () {
			z += 1;
			h += 10;
			$(this).css('z-index', z).css('left', w).css('top', h);
		});
	};

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
