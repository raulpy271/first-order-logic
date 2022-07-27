
import {var_parser} from './term.js';
import {existencial_quantifier_parser, universal_quantifier_parser, formula_parser} from './formula.js';
import {parsedEntireText} from './parser_tools.js';

test('Existencial quantifier parser', () => {
    let existencialParserOfVariables = existencial_quantifier_parser(var_parser);
    expect(parsedEntireText(existencialParserOfVariables, '!x12 x21')).toBeTruthy()
    expect(parsedEntireText(existencialParserOfVariables, '!x12   x12')).toBeTruthy()
    expect(parsedEntireText(existencialParserOfVariables, '!x12x21')).toBeFalsy()
    expect(parsedEntireText(existencialParserOfVariables, '!y12 x21')).toBeFalsy()
    expect(parsedEntireText(existencialParserOfVariables, '!y12')).toBeFalsy()
    expect(parsedEntireText(existencialParserOfVariables, '!x12')).toBeFalsy()
    expect(parsedEntireText(existencialParserOfVariables, '!x12 !x12')).toBeFalsy()
});

test('Universal quantifier parser', () => {
    let universalParserOfVariables = universal_quantifier_parser(var_parser);
    expect(parsedEntireText(universalParserOfVariables, '*x12 x21')).toBeTruthy()
    expect(parsedEntireText(universalParserOfVariables, '*x12   x12')).toBeTruthy()
    expect(parsedEntireText(universalParserOfVariables, '*x12x21')).toBeFalsy()
    expect(parsedEntireText(universalParserOfVariables, '*y12 x21')).toBeFalsy()
    expect(parsedEntireText(universalParserOfVariables, '*y12')).toBeFalsy()
    expect(parsedEntireText(universalParserOfVariables, '*x12')).toBeFalsy()
    expect(parsedEntireText(universalParserOfVariables, '*x12 !x12')).toBeFalsy()
});

test('Negation formula parser', () => {
    expect(parsedEntireText(formula_parser, '(~y12)')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '(~ y12)')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( ~ y12 )')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( ~ P(x12, y22) )')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( ~ (~ y12 ) )')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( ~ (~ (~ P) ) )')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( ~ (~ (~~ P) ) )')).toBeFalsy()
    expect(parsedEntireText(formula_parser, '( ~ (~ x12 ) )')).toBeFalsy()
    expect(parsedEntireText(formula_parser, '( ~ x12  )')).toBeFalsy()
    expect(parsedEntireText(formula_parser, ' x12  ')).toBeFalsy()
});

test('Conjunction formula parser', () => {
    expect(parsedEntireText(formula_parser, '(y12 & y12)')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '(y12&y12)')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '(y12 & (~y3) )')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( (P() & P(x12)) & (~y3) )')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( (P() & P(x12))  (~y3) )')).toBeFalsy()
    expect(parsedEntireText(formula_parser, '( x12 & P(x12) )')).toBeFalsy()
    expect(parsedEntireText(formula_parser, '( y12 & y12 & y12 )')).toBeFalsy()
});

test('Disjunction formula parser', () => {
    expect(parsedEntireText(formula_parser, '(y12 | y12)')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '(y12 | (~y3) )')).toBeTruthy()
    expect(parsedEntireText(formula_parser, '( x12 | P(x12) )')).toBeFalsy()
    expect(parsedEntireText(formula_parser, '( y12 | y12 | y12 )')).toBeFalsy()
});
