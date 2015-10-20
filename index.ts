/// <reference path="typings/tsd.d.ts" />

class TestComponent {
    view(ctrl) {
        return m('h3', {config: this.config()}, ctrl.title);
    }
    
    controller() {
        return { title: 'Hello from controller!' }
    }
    
    config() {
        return function (foo, bar) {
            console.log('Chibi da yo!');
        }
    }
};

$(() => {
    chibi(cmd => { console.log(cmd) });
});