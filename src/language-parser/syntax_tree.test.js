

import {const_parser, var_parser, predicate_symbols, term_parser, predicate_parser} from './term.js';
import {nodeTypes} from './syntax_tree.js';

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

