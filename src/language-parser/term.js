import {
    char,
    digits,
    sequenceOf,
    regex,
    recursiveParser,
    choice
} from 'arcsecond';
import tokens from './tokens.js';
import {listSurroundedByParentheses} from './parser_tools.js';

export const const_parser = sequenceOf([char(tokens.CONSTANT_SYMBOL), digits]);

export const var_parser = sequenceOf([char(tokens.VARIABLE_SYMBOL), digits]);

export const predicate_symbols = regex(tokens.PREDICATE_SYMBOL_RE);

export const predicate_parser = recursiveParser(() => choice(
    [
        sequenceOf([predicate_symbols, listSurroundedByParentheses(term_parser)]),
        predicate_symbols
    ]
));

export const term_parser = choice([const_parser, var_parser, predicate_parser]);
