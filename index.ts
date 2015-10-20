/// <reference path="typings/tsd.d.ts" />

interface Element {
    offsetHeight: number;
}

var output = [];

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

const enum Key {
    ENTER = 13, 
    UP = 38, 
    DOWN = 40
}

// m.module(document.body, new TestComponent());

$(function () {
    var $input = $('textarea.chibi');
    
    function resizeInput(el) {
        var offset = el.offsetHeight - el.clientHeight;
        $(el).
            css('height', 'auto').
            css('height', el.scrollHeight + offset);
    }
    
    $input.on('keyup input', function () {
        resizeInput(this);
    });
    
    $input.keydown(function (e) {
        var cmd, $msg;
        
        switch (e.which) {
        case Key.ENTER:
            e.preventDefault();
            
            cmd = $(this).val();
            
            $(this).val('');
            resizeInput(this);
                                    
            return false;
        }
    });						
});
