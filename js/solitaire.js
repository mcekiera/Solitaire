var SOLITAIRE = {
	init: function () {
		var that = this;
		this.colors = ['clubs', 'spades', 'hearts', 'tiles'];
		this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		this.cards = function () {
			var arr = [];

			for (var i = 0; i < that.colors.length; i++) {
				for (var k = 0; k < that.ranks.length; k++) {
					var model = new SOLITAIRE.cardModel(that.colors[i], that.ranks[k]);
					var view = new SOLITAIRE.CardView(model, $('#' + model.getID()));
					var controller = new SOLITAIRE.CardController(model, view);
					arr.push(model);
				}
			}

			return arr;
		}();
	},

	cardModel: ''
	

};





