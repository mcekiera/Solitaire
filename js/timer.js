SOLITAIRE.TimerModel = function () {
	var that = this;

	var seconds = {
		val: 0,
		increment: function () {
			this.val += 1;
		}
	};

	var inTimeFormat = function (num) {
		return num < 10 ? '0' + num : num;
	};

	this.addSecond = function () {
		seconds.increment();
		that.changed.notify({});
	};

	this.getTime = function () {
		return inTimeFormat(Math.floor(seconds.val/60)) + ":" + inTimeFormat(Math.floor(seconds.val%60));
	};

	this.reset = function () {
		seconds.val = 0;
		that.changed.notify({});
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
	var working = false;
	var that = this;
	var intervalOne;
	var intervalTen;
	this.getTime = model.getTime;

	this.reset = function () {
		that.stop();
		model.reset();
		working = false;
	};

	this.isWorking = function () {
		return working;
	};


	this.init = function () {
		intervalOne = setInterval(model.addSecond,1000);
		intervalTen = setInterval(function () {
			view.$element.trigger('points', {direct: -2});
		},10000);
		working = true;
	};

	this.stop = function () {
		clearInterval(intervalOne);
		clearInterval(intervalTen);
	};

};