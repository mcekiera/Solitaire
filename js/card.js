SOLITAIRE.cardModel = function (color, rank) {
	var covered = true;
	var that = this;
	console.log(color + '-' + rank);
	this.getColor = function () {
		return color;
	};

	this.getRank = function () {
		return rank;
	};

	this.getID = function () {
		return color + '-' + rank;
	};

	this.getCovered = function () {
		return covered;
	};

	this.flip = new SOLITAIRE.Event(this);

	this.setCover = function (val) {
		covered = val;
		that.flip.notify({});
	};
};

SOLITAIRE.CardView = function (model, element) {
	var that = this;

	this.model = model;
	this.$element = element;

	this.uncover = new SOLITAIRE.Event(this);

	this.model.flip.attach(function () {
		if(that.model.getCovered()) {
			that.$element.removeClass('uncovered').addClass('covered');
		} else {
			that.$element.removeClass('covered').addClass('uncovered');
		}
	});
};

SOLITAIRE.CardController = function (model, view) {
	var v = view.$element;

	view.uncover.attach(function () {
		model.setCover(false);

		v.draggable({
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

		v.on('mousedown', function () {
			$(this).addClass('prime');
			$(this).nextAll().addClass('hold');
		});

		v.on('mouseup', function () {
			$(this).removeClass('prime');
		});
	});
};