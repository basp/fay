/// <reference path="../typings/jquery/jquery.d.ts" />

import $ = require('jquery');

interface Element {
    offsetHeight: number;
}

const enum Key {
    ENTER = 13
}

export default function chibi(
	handler: (cmd: string) => void, 
	target: any = 'div.chibi textarea') {
	
	var $input = $(target);
	var el = $input.get(0); 
	
	function resize() {
		var offset = el.offsetHeight - el.clientHeight;
		$(el).
			css('height', 'auto').
			css('height', el.scrollHeight + offset);		
	}
	
	$input.on('keyup input', e => {
		resize();
	});
	
	$input.keydown(e => {
		var cmd, $msg;
		
		switch (e.which) {
		case Key.ENTER:
			e.preventDefault();
			
			cmd = $(target).val();
			handler(cmd);
			
			$(target).val('');
			resize();		
	
			return false;
		}
	});
}						
