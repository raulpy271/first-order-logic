
import {const_parser, var_parser, predicate_symbols, term_parser, predicate_parser} from './term.js';
import {nodeTypes} from './syntax_tree.js';
import { formula_parser } from './formula.js';

test('constant syntax tree parser', () => {
    let result = const_parser.run('y12');
    expect(result.result).toStrictEqual({type: nodeTypes.CONSTANT, value:"y12"});
});

test('variable syntax tree parser', () => {
    let result = var_parser.run('x12');
    expect(result.result).toStrictEqual({type: nodeTypes.VARIABLE, value:"x12"});
});

test('predicate symbol syntax tree parser', () => {
    let result = predicate_parser.run('P');
    expect(result.result).toStrictEqual({type: nodeTypes.PREDICATE_SYMBOL, value:"P"});
    result = predicate_parser.run('P()');
    expect(result.result).toStrictEqual({type: nodeTypes.PREDICATE_SYMBOL, value:"P"});
    result = predicate_parser.run('P(x1)');
    expect(result.result).toStrictEqual(
        {
            type: nodeTypes.PREDICATE_SYMBOL,
            value:[{type: nodeTypes.PREDICATE_SYMBOL, value: "P"}, {type: nodeTypes.VARIABLE, value: "x1"}]
        }
    );
    result = predicate_parser.run('P(x1, Q(y2))');
    expect(result.result).toStrictEqual(
        {
            type: nodeTypes.PREDICATE_SYMBOL,
            value:[
                {type: nodeTypes.PREDICATE_SYMBOL, value: "P"}, 
                {type: nodeTypes.VARIABLE, value: "x1"},
                {type: nodeTypes.PREDICATE_SYMBOL, value: [{type: nodeTypes.PREDICATE_SYMBOL, value: "Q"}, {type: nodeTypes.CONSTANT, value: "y2"}]},
            ]
        }
    );
});

test('Disjunction syntax tree parser', () => {
    let result = formula_parser.run('(y12 | y12)');
    expect(result.result).toStrictEqual({
        type: nodeTypes.OR_FORMULA, 
        value:[
            {type: nodeTypes.CONSTANT, value: "y12"}, 
            {type: nodeTypes.CONSTANT, value: "y12"},
        ]
    });
    result = formula_parser.run('( (y12 | P) | y12)');
    expect(result.result).toStrictEqual({
        type: nodeTypes.OR_FORMULA, 
        value:[
            {type: nodeTypes.OR_FORMULA, value: [
                {type: nodeTypes.CONSTANT, value: "y12"},
                {type: nodeTypes.PREDICATE_SYMBOL, value: "P"}
            ]}, 
            {type: nodeTypes.CONSTANT, value: "y12"},
        ]
    });
});

test('Conjunction syntax tree parser', () => {
    let result = formula_parser.run('(y12 & y12)');
    expect(result.result).toStrictEqual({
        type: nodeTypes.AND_FORMULA, 
        value:[
            {type: nodeTypes.CONSTANT, value: "y12"}, 
            {type: nodeTypes.CONSTANT, value: "y12"},
        ]
    });
});

test('Negation syntax tree parser', () => {
    let result = formula_parser.run(' ( ~ (y12 & y12)) ');
    expect(result.result).toStrictEqual({
        type: nodeTypes.NOT_FORMULA,
        value: {
            type: nodeTypes.AND_FORMULA, 
            value:[
                {type: nodeTypes.CONSTANT, value: "y12"}, 
                {type: nodeTypes.CONSTANT, value: "y12"},
            ]
        }
    });
});

test('Implication syntax tree parser', () => {
    let result = formula_parser.run('(y12 => y12)');
    expect(result.result).toStrictEqual({
        type: nodeTypes.IMPLICATION_FORMULA, 
        value:[
            {type: nodeTypes.CONSTANT, value: "y12"}, 
            {type: nodeTypes.CONSTANT, value: "y12"},
        ]
    });
});

test('Universal quantifier syntax tree parser', () => {
    let result = formula_parser.run('*x1 P(x1)');
    expect(result.result).toStrictEqual({
        type: nodeTypes.UNIVERSAL_QUANTIFIER, 
        value:[
            {type: nodeTypes.VARIABLE, value: "x1"}, 
            {type: nodeTypes.PREDICATE_SYMBOL, value: [
                {type: nodeTypes.PREDICATE_SYMBOL, value: "P"}, 
                {type: nodeTypes.VARIABLE, value: "x1"} 
            ]},
        ]
    });
    result = formula_parser.run('*x1 (P(x1) => y1)');
    expect(result.result).toStrictEqual({
        type: nodeTypes.UNIVERSAL_QUANTIFIER, 
        value:[
            {type: nodeTypes.VARIABLE, value: "x1"}, 
            {type: nodeTypes.IMPLICATION_FORMULA, value: [
                {type: nodeTypes.PREDICATE_SYMBOL, value:[
                    {type: nodeTypes.PREDICATE_SYMBOL, value: "P"}, 
                    {type: nodeTypes.VARIABLE, value: "x1"} 
                ]},
                {type: nodeTypes.CONSTANT, value: "y1"} 
            ]},
        ]
    });
});

test('Existencial quantifier syntax tree parser', () => {
    let result = formula_parser.run('!x1 y12');
    expect(result.result).toStrictEqual({
        type: nodeTypes.EXISTENCIAL_QUANTIFIER, 
        value:[
            {type: nodeTypes.VARIABLE, value: "x1"}, 
            {type: nodeTypes.CONSTANT, value: "y12"}
        ]
    });
});
