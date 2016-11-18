function solitaire() {
	"use strict";

	var deck = new Deck();

	var stack = new Stack($('js-stack'));
	var waste = new Stack($('js-waste'));

	var fundation = {
		spades: new Stack($('js-foundation-spades')),
		clubs: new Stack($('js-foundation-clubs')),
		tiles: new Stack($('js-foundation-tiles')),
		hearts: new Stack($('js-foundation-hearts'))
	};

	var tableau = {
		1: new Stack($('js-tableau-0')),
		2: new Stack($('js-tableau-1')),
		3: new Stack($('js-tableau-2')),
		4: new Stack($('js-tableau-3')),
		5: new Stack($('js-tableau-4')),
		6: new Stack($('js-tableau-5')),
		7: new Stack($('js-tableau-6'))
	};






}
