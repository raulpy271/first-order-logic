import {
    char,
    digits,
    sequenceOf,
    regex,
    recursiveParser,
    choice
} from 'arcsecond';
import {listSurroundedByParentheses} from './parser_tools.js';

export const const_parser = sequenceOf([char('y'), digits]);

export const var_parser = sequenceOf([char('x'), digits]);

export const predicate_symbols = regex(/^[a-wzA-Z][a-zA-Z]*\d*/);

export const predicate_parser = recursiveParser(() => choice(
    [
        sequenceOf([predicate_symbols, listSurroundedByParentheses(term_parser)]),
        predicate_symbols
    ]
));

export const term_parser = choice([const_parser, var_parser, predicate_parser]);
