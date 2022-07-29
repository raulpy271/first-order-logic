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
import {map_const, map_var, tag_result, nodeTypes, map_list_of_predicate_symbol_arguments} from './syntax_tree.js';

export const const_parser = (sequenceOf([char(tokens.CONSTANT_SYMBOL), digits])).map(map_const);

export const var_parser = (sequenceOf([char(tokens.VARIABLE_SYMBOL), digits])).map(map_var);

export const predicate_symbols = regex(tokens.PREDICATE_SYMBOL_RE).map(tag_result(nodeTypes.PREDICATE_SYMBOL));

export const predicate_parser = recursiveParser(() => choice(
    [
        sequenceOf([predicate_symbols, listSurroundedByParentheses(term_parser)]).map(map_list_of_predicate_symbol_arguments),
        predicate_symbols
    ]
));

export const term_parser = choice([const_parser, var_parser, predicate_parser]);
