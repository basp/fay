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
	
	config(ctrl) {
		return (el: Element, initialized: boolean) => {
			if (initialized) return;
			autosize(el);
			el.addEventListener('autosize:resized', () => {
				var h = $(el).outerHeight();
				this.emit('resized', h);
			});
		}
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
}

class Output implements MithrilModule {
	controller = () => {};
	
	view(ctrl) {
		return m('div');
	}
}

class App implements MithrilModule {
	input: Input;
	
	constructor() {
		this.input = new Input();
		this.input.on('command', cmd => {
			console.log(cmd);
		});
		this.input.on('resized', h => {
			console.log(h);
		});
	}

	controller = () => {};	
	
	view(ctrl) {
		return m('div', [
			m('div.output'),
			m('div.input', [this.input])
		]);
	}
}

$(() => {
	m.module(document.body, new App());
});