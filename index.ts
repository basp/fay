/// <reference path="typings/tsd.d.ts" />

import $ = require('jquery');

$(() => {
	var $cmd = $('.chibi-command');
	
    const ENTER = 13,
          UP = 38,
          DOWN = 40;
	
	$cmd.keydown(x => {
		switch (x.which) {
			case ENTER:
				x.preventDefault();
				var input = $cmd.get(0).innerText;
				console.log(input);
				$cmd.text('');				
 				return false;
			case UP:
				return false;
			case DOWN:
				return false;
		}
	});	
});