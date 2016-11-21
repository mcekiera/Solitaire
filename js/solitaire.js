var solitaire = function() {
	"use strict";

	var deck = new Deck();
	var board = new Board(deck);

	var makeDraggable = function() {
		$('li.covered').draggable({
			oldZ: 0,
			stack: ".covered",

			revert : function(event, ui) {
				$(this).data("uiDraggable").originalPosition = {
					top : 0,
					left : 0,
					zIndex : $(this).next().css('z-index') - 1
				};
				return !event;
			},

			start: function() {
				console.log($(this));
				$('.covered.hold').each(function() {
					console.log($(this));
					$(this).trigger('dragstart');
				});
			},

			drag: function() {
				var maintop = $(this).css('top');
				var mainleft = $(this).css('left');
				console.log($(this));

				$('.covered.hold').each(function() {
					$(this).trigger('drag');
					$(this).addClass('ui-draggable-dragging');
					$(this).css('left', mainleft);
				});

				$('.covered.hold:first').css('top', maintop);
			},

			stop: function() {
				var maintop = $(this).css('top');
				var mainleft = $(this).css('left');

				$('.covered.hold').each(function() {
					$(this).trigger('dragstop');
					$(this).removeClass('ui-draggable-dragging');
					$(this).css('left', mainleft);
				});

				$('.covered.hold:first').css('top', maintop);
			}
		});
	};
	
	$('li.covered').on('mousedown mouseup', function () {
		$(this).toggleClass('prime');
		$(this).nextAll().toggleClass('hold');

	});

	// $('li.covered.prime').on('dragstart', function() {
	// 	console.log($(this));
	// 	$('.covered.hold').each(function() {
	// 		console.log($(this));
	// 		$(this).trigger('dragstart');
	// 	});
	// });

	// $('li.covered.prime').on('drag', function() {
	// 	var maintop = $(this).css('top');
	// 	var mainleft = $(this).css('left');
	// 	console.log($(this));
	//
	// 	$('.covered.hold').each(function() {
	// 		$(this).trigger('drag');
	// 		$(this).addClass('ui-draggable-dragging');
	// 		$(this).css('margin-left', mainleft);
	// 	});
	//
	// 	$('.covered.hold:first').css('margin-top', maintop);
	// });
	//
	// $('li.covered.prime').on('dragstop', function() {
	// 	var maintop = $(this).css('top');
	// 	var mainleft = $(this).css('left');
	//
	// 	$('.covered.hold').each(function() {
	// 		$(this).trigger('dragstop');
	// 		$(this).removeClass('ui-draggable-dragging');
	// 		$(this).css('margin-left', mainleft);
	// 	});
	//
	// 	$('.covered.hold:first').css('margin-top', maintop);
	// });


	$('.deck .card, .deck ul').droppable({
		drop: function (event, ui) {
			var target = $(event.target).parent();
			var $hold = $(ui.draggable).nextAll();
			$(ui.draggable).appendTo(target);
			$hold.appendTo(target).css('left','').css('top','').css('position','relative');
			ui.draggable.css('left','').css('top','').css('position','relative');
			var base = ui.draggable.css('z-index');
			$hold.each(function () {
				base += 1;
				$(this).css('z-index', base);
			});
		}
	});

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
