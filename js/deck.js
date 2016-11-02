function Deck() {

	function Card(figure, color) {
    var that = this;
    this.fig = figure;
    this.col = color;
    
    this.toString = function() {
  		return that.col + that.fig;
    }
  }
  
  this.getCards = function(){
    var colors = ['Pik', 'Trefl', 'Heart', 'Bell'];
    var figures = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    var set = [];

    for (var i = 0; i < colors.length; i++) {
      for (var j = 0; j < figures.length; j++) {
        set.push(new Card(figures[j],colors[i]));
      }
    }
    return set;
  }
}

module.exports = Deck;