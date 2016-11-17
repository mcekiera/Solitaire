function Card(color, rank) {
	this.color = color;
	this.rank = rank;
	this.id = this.color + '-' + this.rank;
	this.$element = $('#' + this.id);
}

Card.prototype.isSameColor = function (card) {
	return this.color === card.color;
};

Card.prototype.isRankOver = function (card) {
	return Deck.ranks.indexOf(this.rank) === Deck.ranks.indexOf(card.rank) + 1;
};

Card.prototype.isRankBelow = function (card) {
	return Deck.ranks.indexOf(this.rank) === Deck.ranks.indexOf(card.rank) - 1;
};

Card.prototype.isSameColorGroup = function (card) {
	if (this.color === 'spades' || this.color ===  'clubs') {
		return card.color === 'spades' || card.color === 'clubs';
	} else {
		return card.color === 'tiles' || card.color === 'hearts';
	}

};
