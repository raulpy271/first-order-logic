

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
    let result = predicate_symbols.run('P');
    expect(result.result).toStrictEqual({type: nodeTypes.PREDICATE_SYMBOL, value:"P"});
});

