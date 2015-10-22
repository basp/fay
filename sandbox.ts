/// <reference path="typings/tsd.d.ts" />
/// <reference path="sandbox.d.ts" />

import acorn = require('acorn/dist/acorn_loose');
import walk = require('acorn/dist/walk');

var literals = [];

var names = [];
var vars = {};

var builtins = {};

function tryParseInt(s: string) {
	return parseInt(s);
}

function ins(i: string, args = []) {
	var argStr = args.join(' ');
	console.log(`\t${i}\t\t${argStr}`);
}

function lbl(l: string) {
	console.log(`${l}:`);
}

function dir(d: string, args = []) {
	var argStr = args.join(' ');
	console.log(`.${d} ${argStr}`);
}

class IntermediateWalker implements Walker {	
	Program(node, state, c) {
		// Strict doesn't do anything for now;
		// (might require declarations later).
		dir('strict', [0]);
		for(var i = 0; i < node.body.length; i++) {
			c(node.body[i], state);
		}
	}
	
	AssignmentExpression(node, state, c) {
		// We only support simple assignment (ident = expr) 
		// and hab no checks for built-ins just yet.
		c(node.right, state);
		let name = node.left.name;
		ins(`put`, [name]);
	}
	
	ArrayExpression(node, state, c) {
		ins(`make_empty_list`);
		for (let x of node.elements) {
			c(x, state);
			ins(`list_append`);
		}
	}
	
	ForStatement(node, state, c) {
		console.log(node);
		c(node, state);
	}
	
	ForInStatement(node, state, c) {
		c(node.right, state);
		ins(`num`, [0]);
		lbl(`top`);
		ins(`for`, [node.left.name, 'done']);
		for (var i = 0; i < node.body.body.length; i++) {
			c(node.body.body[i], state);
		}
		lbl(`done`);
	}
	
	Literal(node, state, c) {
		ins(`ìmm`, [node.raw]);
	}
	
	Identifier(node, state, c) {
		// Should always be in rhs context (i.e. reading).
		ins(`push`, [node.name])
	}
	
	ReturnStatement(node, state, c) {
		// Only support return with explicit argument for now.
		ins(`return`);
	}
}

var code = `
for (x in thing) {
	quux = "bar";
	foo = x;
}
return 0;
`;
var node = acorn.parse_dammit(code);

var logger = {
	Program: (node) => console.log(node),
	Expression: (node) => console.log(node),
	ForStatement: (node) => console.log(node),
	ForInStatement: (node) => console.log(node)
}; 

// walk.simple(node, logger);

var intermediate = new IntermediateWalker();
var state = {};
walk.recursive(node, state, intermediate);
