/// <reference path="typings/tsd.d.ts" />

import m = require('mithril');
import $ = require('jquery');
import autosize = require('autosize');

import {EventEmitter} from 'events';

const enum Key {
	ENTER = 13,
	UP = 38,
	DOWN = 40
}

class Input extends EventEmitter implements MithrilModule {
	value = m.prop('fubar');
	
	controller = () => {};
	
	view(ctrl) {
		return m('textarea[rows=1]', {
			config: this.config(ctrl),
			style: {
				display: 'block'
			},
			onkeydown: this.onKeyDown.bind(this),
			oninput: (e: Event) => {
				this.value(e.target['value']);
				this.resize(e.srcElement);
			},	
			value: this.value()
		});
	}
	
	private onKeyDown(e: KeyboardEvent) {
		switch (e.which) {
		case Key.ENTER:
			e.preventDefault();
			this.emit('command', e.target['value']);
			e.target['value'] = '';
			this.value('');
			this.resize(e.srcElement);		
			return false;
		case Key.UP:
			e.preventDefault();
			return false;
		case Key.DOWN:
			e.preventDefault();
			return false;
		default:
			return true;
		}		
	}

	private resize(el: Element) {
		var evt = document.createEvent('Event');
		evt.initEvent('autosize:update', true, true);
		el.dispatchEvent(evt);
	}

	private config(ctrl) {
		return (el: Element, initialized: boolean) => {
			if (initialized) return;
			autosize(el);
			el.addEventListener('autosize:resized', () => {
				this.emit('resized');
			});
		}
	}	
}

class App implements MithrilModule {
	input: Input;
	
	constructor() {
		this.input = new Input();
		this.input.on('command', this.onCommand.bind(this));	
		this.input.on('resized', this.onResized.bind(this));
	}

	controller = () => {};	
	
	view(ctrl) {
		return m('div', {config: this.config(ctrl)}, [
			m('div.output', {
				style: {
					'overflow-y': 'auto'
				}
			}),
			m('div.input', {
				style: {
					position: 'absolute',
					bottom: '0px'
				}	
			}, [this.input])
		]);
	}
	
	private resizeOutput(bottomOffset: number) {
		var totalHeight = $(window).innerHeight();
		m.startComputation();
		$('div.output').outerHeight(totalHeight - bottomOffset);
		m.endComputation();		
	}	

	private onResized() {
		var bottomOffset = $('div.input').outerHeight();
		this.resizeOutput(bottomOffset);		
	}

	private onCommand(cmd: string) {
		var $msg;
		m.startComputation();
		$msg = $(`<div class="echo">${cmd}</div>`);
		$('div.output').append($msg);
		m.endComputation();		
	}

	private config(ctrl) {
		return (el: Element, initialized: boolean) => {
			if (initialized) return;
			$(window).resize(() => {
				var bottomOffset = $('div.input').outerHeight();
				this.resizeOutput(bottomOffset);
			});	
		}
	}	
}

$(() => {
	m.module(document.body, new App());
});