/**
 *	Object which contains rules of transitions between particular card piles. Every pile object has test method,
 *	which during attempt of adding, examines if given card meets the conditions. The diversified behavior is
 *	achieved by mixing couple different rules.
 * @constructor
 */

SOLITAIRE.Rulebook = function () {
	"use strict";

	/**
	 * Determines, if given card is an Ace rank.
	 * @param card, examined card.
	 * @returns {boolean} true, if given card is Ace rank.
	 */
	var isAce = function (card) {
		return card.getRank() === 'A';
	};

	/**
	 * Determines, if given card is an King rank.
	 * @param card, examined card.
	 * @returns {boolean} true, if given card is King rank.
	 */
	var isKing = function (card) {
		return card.getRank() === 'K';
	};

	/**
	 * Determines, if compared cards are of the same color.
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true, if both cards are same color.
	 */
	var isSameColor = function (first, second) {
		return first.getColor() === second.getColor();
	};

	/**
	 * Determines if second card is one rank higher than first one.
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true if second card is rank higher than first one.
	 */
	var isRankOver = function (first, second) {
		return SOLITAIRE.ranks.indexOf(first.getRank()) === SOLITAIRE.ranks.indexOf(second.getRank()) + 1;
	};

	/**
	 * Determines if second card is one rank below than first one.
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true if second card is rank below than first one.
	 */
	var isRankBelow = function (first, second) {
		return SOLITAIRE.ranks.indexOf(first.getRank()) === SOLITAIRE.ranks.indexOf(second.getRank()) - 1;
	};

	/**
	 * Determines if both cards belongs to same color group: red (tiles, hearts) or black (clubs, spades).
	 * @param first, compared card.
	 * @param second, compared card.
	 * @returns {boolean} true if both cards belongs to one color group.
	 */
	var isSameColorGroup = function (first, second) {
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
	var isSingleCard = function () {
		return $('.hold').length === 0;
	};

	/**
	 * Determine if given pile object is empty.
	 * @param card, represent the first card in the pile, if present
	 * @returns {boolean} true if pile is empty.
	 */
	var pileIsEmpty = function (card) {
		return typeof card === 'undefined';
	};

	/**
	 * Examine conditions which should be met for a game case: put card from the stack to the waste.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {*} true, if conditions are met: is a King rank, and pile is empty
	 */
	var cardOnWaste = function (args) {
		return args.fromID === 'js-stack';
	};

	/**
	 * Examine conditions which should be met for a game case: Ace card on empty foundation pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {*} true, if conditions are met: is a King rank, and pile is empty
	 */
	var aceOnFoundation = function (args) {
		return pileIsEmpty(args.onPile) && isSingleCard() && isAce(args.toDrop);
	};

	/**
	 * Examine conditions which should be met for a game case: King card on empty tableau pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {*} true, if conditions are met: is a King rank, and pile is empty
	 */
	var kingOnEmptyPile = function (args) {
		return isKing(args.toDrop) && pileIsEmpty(args.onPile);
	};

	/**
	 * Determine when card could be added on top of particular fundation card pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {boolean} true, if card meets conditions
	 */
	var cardOnFoundation = function (args) {
		try {
			return isSingleCard() && isRankBelow(args.onPile, args.toDrop) && isSameColor(args.onPile, args.toDrop);
		} catch (err) {
			return false;
		}
	};

	/**
	 * Determine when card could be added on top of particular tableau card pile.
	 * @param args contains references to object necessary to examine particular case
	 * @returns {boolean} true, if card meets conditions
	 */
	var cardOnTableau = function (args) {
		try {
			return !isSameColorGroup(args.toDrop, args.onPile) && isRankOver(args.onPile, args.toDrop);
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
		basic: [cardOnWaste],
		tableau: [kingOnEmptyPile, cardOnTableau],
		foundation: [aceOnFoundation, cardOnFoundation]
	};
};

