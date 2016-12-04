SOLITAIRE.ScoreModel = function (table) {
	var that = this;
	var points = 0;
	var moves = 0;

	this.getPoints = function () {
		return points;
	};

	this.getMoves = function () {
		return moves;
	};

	this.updatePoints = function (val, countMove) {
		points += val;
		points = points < 0 ? 0 : points;
		moves += countMove ? 1 : 0;
		that.update.notify({});
		console.log(points);
	};

	this.reset = function () {
		points = 0;
		moves = 0;
		that.update.notify({});
	};

	this.table = table;
	this.update = new SOLITAIRE.Event(this);
};

SOLITAIRE.ScoreView = function (model, points, moves) {
	var that = this;
	this.model = model;
	this.$points = points;
	this.$moves = moves;

	this.model.update.attach(function () {
		that.$points.text(model.getPoints());
		that.$moves.text(model.getMoves());
	});
};

SOLITAIRE.ScoreController = function (model, view) {
	this.reset = model.reset;

	var scoreMove = function(args) {
		var from = args.fromID.replace(/^[^-]*-|-[^-]*$/g,'');
		var to =  args.toID.replace(/^[^-]*-|-[^-]*$/g,'');
		console.log(from + ',' + to);

		var points = model.table[from][to];
		return typeof points === 'undefined' ? 0 : points;
	};

	this.countPoints = function(args) {
		"use strict";
		if(args.direct) {
			model.updatePoints(args.direct, false);
		} else if (!args.revert) {
			model.updatePoints(scoreMove(args), true);
		} else {
			model.updatePoints(-scoreMove({
				fromID: args.toID,
				toID: args.fromID,
				cardID: args.cardID
			}), true);
		}
		console.log('countPoints');
	};
};