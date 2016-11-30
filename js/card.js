SOLITAIRE.cardModel = function (color, rank) {
	var covered = true;
	var that = this;

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
	this.getColor = model.getColor;
	this.getRank = model.getRank;
	this.getCovered = model.getCovered;
	this.getID = model.getID;
	this.toString = function () {
		return model.getID();
	};

	this.uncover = function () {
		var v = view.$element;
		model.setCover(false);

		v.draggable({
			stack: ".card",

			revert : function(event, ui) {
				$(this).data("uiDraggable").originalPosition = {
					top : 0,
					left : 0
				};
				$('.uncovered.hold').each(function() {
					$(this).removeClass('ui-draggable-dragging');
					$(this).animate({top: "0", left: "0"}, 500);
					$(this).removeClass('hold');
				});
				return 'true';
			},

			start: function(event, ui) {
				$('.uncovered.hold').each(function() {
					$(this).trigger('dragstart');
				});
			},

			drag: function() {
				var maintop = $(this).css('top');
				var mainleft = $(this).css('left');
				var z = $(this).css('zIndex');

				$('.uncovered.hold').each(function() {
					z += 1;
					$(this).trigger('drag');
					$(this).addClass('ui-draggable-dragging');
					$(this).css('left', mainleft);
					$(this).css('top', maintop);
					$(this).css('zIndex',z);
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
	};
};