function Card(figure, color) {
	this.figure = figure;
	this.color = color;
}

function Deck() {
	this.cards = [];
}

function createDeck() {
	var colors = ['Pik', 'Trefl', 'Heart', 'Bell'];
	var figures = ['1','2','3','4','5','6','7','8','9','10','11','12','13'];
	var set = [];

	for (var i = 0; i < color.length; i++) {
		for (var j = 0; i < figures.length; i++) {
			set.push(new Card(figures[j],colors[i]));
		}
	}
}

var deck = new Deck();
