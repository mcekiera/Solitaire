SOLITAIRE.Rulebook = function () {
	"use strict";
	var isAce = function (card) {
		return card.getRank() === 'A';
	};

	var isKing = function (card) {
		return card.getRank() === 'K';
	};

	var isSameColor = function (first, second) {
		return first.getColor() === second.getColor();
	};

	var isRankOver = function (first, second) {
		return SOLITAIRE.ranks.indexOf(first.getRank()) === SOLITAIRE.ranks.indexOf(second.getRank()) + 1;
	};

	var isRankBelow = function (first, second) {
		return SOLITAIRE.ranks.indexOf(first.getRank()) === SOLITAIRE.ranks.indexOf(second.getRank()) - 1;
	};

	var isSameColorGroup = function (first, second) {
		if (first.getColor() === 'spades' || first.getColor() ===  'clubs') {
			return second.getColor() === 'spades' || second.getColor() === 'clubs';
		} else {
			return second.getColor() === 'tiles' || second.getColor() === 'hearts';
		}
	};

	var isSingleCard = function () {
		return $('.hold').length === 0;
	};

	var pileIsEmpty = function (card) {
		return typeof card === 'undefined';
	};

	var cardOnWaste = function (args) {
		return args.fromID === 'js-stack';
	};

	var aceOnFoundation = function (args) {
		return pileIsEmpty(args.onPile) && isSingleCard() && isAce(args.toDrop);
	};

	var kingOnEmptyPile = function (args) {
		return isKing(args.toDrop) && pileIsEmpty(args.onPile);
	};

	var cardOnFoundation = function (args) {
		try {
			return isSingleCard() && isRankBelow(args.onPile, args.toDrop) && isSameColor(args.onPile, args.toDrop);
		} catch (err) {
			return false;
		}
	};

	var cardOnTableau = function (args) {
		try {
			return !isSameColorGroup(args.toDrop, args.onPile) && isRankOver(args.onPile, args.toDrop);
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	this.get = {
		basic: [cardOnWaste],
		tableau: [kingOnEmptyPile, cardOnTableau],
		foundation: [aceOnFoundation, cardOnFoundation]
	};
};

