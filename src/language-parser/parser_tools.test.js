import {digit} from 'arcsecond';
import {listSurroundedByParentheses, parsedEntireText} from './parser_tools.js';

test('list surrounded by parentheses parser', () => {
    let parseDigit = listSurroundedByParentheses(digit);
    expect(parsedEntireText(parseDigit, '(1,2,3)')).toBeTruthy()
    expect(parsedEntireText(parseDigit, '(1, 2, 3)')).toBeTruthy()
    expect(parsedEntireText(parseDigit, ' (1,2,3) ')).toBeTruthy()
    expect(parsedEntireText(parseDigit, '(  1, 2, 3 )')).toBeTruthy()
    expect(parsedEntireText(parseDigit, '(1)')).toBeTruthy()
    expect(parsedEntireText(parseDigit, '()')).toBeTruthy()
    expect(parsedEntireText(parseDigit, '(,)')).toBeFalsy()
    expect(parsedEntireText(parseDigit, '(1, 2,)')).toBeFalsy()
    expect(parsedEntireText(parseDigit, '(1, 2, s)')).toBeFalsy()
    expect(parsedEntireText(parseDigit, 's)')).toBeFalsy()
});
