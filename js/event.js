SOLITAIRE.Event = function(sender) {
	this.sender = sender;
	this.listeners = [];
}

SOLITAIRE.Event.prototype = {
	attach : function (listener) {
		this.listeners.push(listener);
	},
	notify : function (args) {
		var index;

		for (index = 0; index < this.listeners.length; index += 1) {
			this.listeners[index](this.sender, args);
		}
	}
};
