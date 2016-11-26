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

	this.clicked = new SOLITAIRE.Event(this);

	this.model.flip.attach(function () {
		if(that.model.getCovered()) {
			that.$element.removeClass('uncovered').addClass('covered');
		} else {
			that.$element.removeClass('covered').addClass('uncovered');
		}
	});

	this.$element.click(function () {
		console.log(that);
		that.clicked.notify({});
	});
};

SOLITAIRE.CardController = function (model, view) {

	view.clicked.attach(function () {
		model.setCover(false);
	});
};