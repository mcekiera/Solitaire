SOLITAIRE.TimerModel = function () {
	var that = this;

	var hours = {
		val: 0,
		increment: function () {
			this.val += 1;
		}
	};

	var minutes = {
		val: 0,
		increment: function () {
			this.val += 1;
			if (this.val === 60) {
				this.val = 0;
				hours.increment();
			}
		}
	};

	var seconds = {
		val: 0,
		increment: function () {
			this.val += 1;
			if (this.val === 60) {
				this.val = 0;
				minutes.increment();
			}
		}
	};

	var inTimeFormat = function (num) {
		return num < 10 ? '0' + num : num;
	}

	this.addSecond = function () {
		seconds.increment();
		that.changed.notify({});
	};

	this.getTime = function () {
		return inTimeFormat(hours.val) + ":" + inTimeFormat(minutes.val) + ":" + inTimeFormat(seconds.val);
	};

	this.changed = new SOLITAIRE.Event(this);

};

SOLITAIRE.TimerView = function (model, element) {
	var that = this;
	this.$element = element;
	this.model = model;

	this.model.changed.attach(function () {
		that.$element.text(model.getTime());
	});
};

SOLITAIRE.TimerController = function (model, view) {
	this.getTime = model.getTime();
	this.init = function () {
		setInterval(model.addSecond,1000);
		setInterval(function () {
			view.$element.trigger('points', {direct: -2});
		},10000);
	};

};