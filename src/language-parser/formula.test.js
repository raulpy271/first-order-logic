
import {var_parser} from './term.js';
import {existencial_quantifier_parser, universal_quantifier_parser} from './formula.js';
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
