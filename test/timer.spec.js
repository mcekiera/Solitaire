describe("Time keeping object", function () {
	var timer;

	beforeEach(function () {
		timer = new SOLITAIRE.TimerModel();
	});

	it("should start from zero", function () {
		expect(timer.getTime()).toBe("00:00");
	});

	it("should add one second at time", function () {
		timer.addSecond();
		expect(timer.getTime()).toBe("00:01");
		timer.addSecond();
		timer.addSecond();
		timer.addSecond();
		timer.addSecond();
		expect(timer.getTime()).toBe("00:05");
	});

	it("after 60 second should sum up to one minute", function () {
		for(var i = 0; i < 60; i += 1) {
			timer.addSecond();
		}
		expect(timer.getTime()).toBe("01:00");
	});

	it("should reset to zero", function () {
		for(var i = 0; i < 60; i += 1) {
			timer.addSecond();
		}
		timer.reset();
		expect(timer.getTime()).toBe("00:00");
	});
	
});
