
import {const_parser, var_parser, predicate_symbols, term_parser, predicate_parser} from './term.js';
import {parsedEntireText} from './parser_tools.js'

test('constant parser', () => {
    let result = const_parser.run('y12');
    expect(result.isError).toBeFalsy();
    result = const_parser.run('x12');
    expect(result.isError).toBeTruthy();
    result = const_parser.run('ysdf');
    expect(result.isError).toBeTruthy();
});

test('variable parser', () => {
    let result = var_parser.run('x12');
    expect(result.isError).toBeFalsy();
    result = var_parser.run('y12');
    expect(result.isError).toBeTruthy();
    result = var_parser.run('xsdf');
    expect(result.isError).toBeTruthy();
});

test('predicate symbol parser', () => {
    let result = predicate_symbols.run('P1');
    expect(result.isError).toBeFalsy();
    result = predicate_symbols.run('PQ');
    expect(result.isError).toBeFalsy();
    result = predicate_symbols.run('y12');
    expect(result.isError).toBeTruthy();
    result = predicate_symbols.run('x12');
    expect(result.isError).toBeTruthy();
    result = predicate_symbols.run('x12(');
    expect(result.isError).toBeTruthy();
});

test('variables and consts in term parser', () => {
    expect(parsedEntireText(term_parser, 'Q12')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'x12')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'y12')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'q')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'q()')).toBeTruthy();
    expect(parsedEntireText(term_parser, '12')).toBeFalsy();
});

test('recursive predicate parser', () => {
    expect(parsedEntireText(term_parser, 'p1(x12, x34)')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'p1(x12, x34, q, y12, p4)')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'p1  ( x12, x34, q, q(), p4 ) ')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'p1( x12, x34, q, q(y5), p4(x12, y2, P(T) ) ) ')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'p1( x12, x34, q, q(y5), p4(x12, y2, P(T, Q, Q() ) ) ) ')).toBeTruthy();
    expect(parsedEntireText(term_parser, 'y12( x12, x34, q, q(y5), p4(x12, y2, P(T) ) ) ')).toBeFalsy();
    expect(parsedEntireText(term_parser, 'p2( x12, x34, q, q(y5), p4(x12, y2, x(T) ) ) ')).toBeFalsy();
    expect(parsedEntireText(term_parser, 'p2( x12, x34, q, q(y5), p4(x12, y2, P(T ) ) ')).toBeFalsy();
    expect(parsedEntireText(term_parser, 'p2() x ')).toBeFalsy();
    expect(parsedEntireText(term_parser, 'p2() - x ')).toBeFalsy();
    expect(parsedEntireText(term_parser, 'y()')).toBeFalsy();
});
