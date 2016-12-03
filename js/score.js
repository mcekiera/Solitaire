SOLITAIRE.ScoreModel = function (table) {
	var that = this;
	var counter = 0;

	this.getPoints = function () {
		return counter;
	};
	this.updatePoints = function (val) {
		counter += val;
		that.update.notify({});
		console.log(counter);
	};
	this.table = table;
	this.update = new SOLITAIRE.Event(this);
};

SOLITAIRE.ScoreView = function (model, element) {
	var that = this;
	this.model = model;
	this.$element = element;

	this.model.update.attach(function () {
		that.$element.text(model.getPoints());
	});
};

SOLITAIRE.ScoreController = function (model, view) {
	var scoreMove = function(args) {
		var from = args.fromID.replace(/^[^-]*-|-[^-]*$/g,'');
		var to =  args.toID.replace(/^[^-]*-|-[^-]*$/g,'');
		console.log(from + ',' + to);

		var points = model.table[from][to];
		return typeof points === 'undefined' ? 0 : points;
	};

	this.countPoints = function(args) {
		"use strict";
		if (!args.revert) {
			model.updatePoints( scoreMove(args));
		} else {
			model.updatePoints(-scoreMove({
				fromID: args.toID,
				toID: args.fromID,
				cardID: args.cardID
			}));
		}
		console.log('countPoints');
	};
};