/**
 * Created by Pacin on 2016-11-11.
 */


$(function() {


	var card = $(".card" ).draggable({
		zIndex: 99999999,
		stack: ".card",

		drag: function(){
			var offset = $(this).offset();
			var xPos = offset.left;
			var yPos = offset.top;
			console.log(xPos);
			console.log(yPos);
		},

		revert : function() {
			$(this).data("uiDraggable").originalPosition = {
				top : 0,
				left : 0
			};
			return true;
		}
	});
	$(".card").droppable();


});