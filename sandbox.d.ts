/// <reference path="typings/tsd.d.ts" />

interface C {
	(node: ESTree.Node, state: any): void;
} 

interface Walker {
	AssignmentExpression(node: ESTree.AssignmentExpression, state: any, c: C): void;
	Literal(node: ESTree.Literal, state: any, c: C): void;
	Identifier(node: ESTree.Identifier, state: any, c: C): void;
	ReturnStatement(node: ESTree.ReturnStatement, state: any, c: C): void;
}