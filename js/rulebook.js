/**
 *	Object which contains rules of transitions between particular card piles. Every pile object has test method,
 *	which during attempt of adding, examines if given card meets the conditions. The diversified behavior is
 *	achieved by mixing couple different rules.
 * @constructor
 */

SOLITAIRE.Rulebook = function () {
	"use strict";
	var that = this;
	/**
	 * Determines, if given card is an Ace rank.
	 * @param card, examined card.
	 * @returns {boolean} true, if given card is Ace rank.
	 */
	this.isAce = function (card) {
		return card.getRank() === 'A';
	};

	/**
	 * Determines, if given card is an King rank.
	 * @param card, examined card.
	 * @returns {boolean} true, if given card is King rank.
	 */
	this.isKing = function (card) {
		return card.getRank() === 'K';
	};

	/**
	 * Determines, if compared cards are of the same color.
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true, if both cards are same color.
	 */
	this.isSameColor = function (first, second) {
		return first.getColor() === second.getColor();
	};

	/**
	 * Determines if first card is one rank higher than second one.
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true if second card is rank higher than first one.
	 */
	this.isRankOver = function (first, second) {
		return SOLITAIRE.ranks.indexOf(first.getRank()) === SOLITAIRE.ranks.indexOf(second.getRank()) + 1;
	};

	/**
	 * Determines if first card is one rank below than second one.
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true if second card is rank below than first one.
	 */
	this.isRankBelow = function (first, second) {
		return SOLITAIRE.ranks.indexOf(first.getRank()) === SOLITAIRE.ranks.indexOf(second.getRank()) - 1;
	};

	/**
	 * Determines if both cards belongs to same color group: red (tiles, hearts) or black (clubs, spades).
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true if both cards belongs to one color group.
	 */
	this.isSameColorGroup = function (first, second) {
		if (first.getColor() === 'spades' || first.getColor() ===  'clubs') {
			return second.getColor() === 'spades' || second.getColor() === 'clubs';
		} else {
			return second.getColor() === 'tiles' || second.getColor() === 'hearts';
		}
	};

	/**
	 * Determines, if user try to add more than one card to pile, when it is not allowed.
	 * @returns {boolean} true, if attempt includes only one card.
	 */
	this.isSingleCard = function () {
		return $('.hold').length === 0;
	};

	/**
	 * Determine if given pile object is empty.
	 * @param card, represent the first card in the pile, if present
	 * @returns {boolean} true if pile is empty.
	 */
	this.pileIsEmpty = function (card) {
		return typeof card === 'undefined';
	};

	/**
	 * Examine conditions which should be met for a game case: put card from the stack to the waste.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {*} true, if conditions are met: is a King rank, and pile is empty
	 */
	this.cardOnWaste = function (args) {
		return args.fromID === 'js-stack';
	};

	/**
	 * Examine conditions which should be met for a game case: Ace card on empty foundation pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {*} true, if conditions are met: is a King rank, and pile is empty
	 */
	this.aceOnFoundation = function (args) {
		return that.pileIsEmpty(args.onPile) && that.isSingleCard() && that.isAce(args.toDrop);
	};

	/**
	 * Examine conditions which should be met for a game case: King card on empty tableau pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {*} true, if conditions are met: is a King rank, and pile is empty
	 */
	this.kingOnEmptyPile = function (args) {
		return that.isKing(args.toDrop) && that.pileIsEmpty(args.onPile);
	};

	/**
	 * Determine when card could be added on top of particular fundation card pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {boolean} true, if card meets conditions
	 */
	this.cardOnFoundation = function (args) {
		try {
			return that.isSingleCard() && that.isRankBelow(args.onPile, args.toDrop) && that.isSameColor(args.onPile, args.toDrop);
		} catch (err) {
			return false;
		}
	};

	/**
	 * Determine when card could be added on top of particular tableau card pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {boolean} true, if card meets conditions
	 */
	this.cardOnTableau = function (args) {
		try {
			return !that.isSameColorGroup(args.toDrop, args.onPile) && that.isRankOver(args.onPile, args.toDrop);
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	/**
	 * Returns a recipe, determining which rule should be added to given type of card pile.
	 * @type {{basic: *[], tableau: *[], foundation: *[]}}
	 */
	this.get = {
		basic: [that.cardOnWaste],
		tableau: [that.kingOnEmptyPile, that.cardOnTableau],
		foundation: [that.aceOnFoundation, that.cardOnFoundation]
	};
};

