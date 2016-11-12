

$(function() {


	var card = $(".card" ).draggable({
		zIndex: 99999999,
		stack: ".card",

		drag: function(){
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


});