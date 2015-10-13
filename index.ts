/// <reference path="typings/tsd.d.ts" />

import $ = require('jquery');

function execute(input: string) {
	return [0];
}

$(() => {
	var $cmd = $('.command');
	var $console = $('.console');
	
    const ENTER = 13,
          UP = 38,
          DOWN = 40;

	$cmd.keydown(x => {
		switch (x.which) {
			case ENTER: {
				x.preventDefault();
				let input = $cmd.get(0).innerText;
				let result = execute(input);
				console.log(result);
				$cmd.text('');
 				return false;
			}
			case UP:
				return false;
			case DOWN:
				return false;
		}
	});	
});