
import {choice, char, whitespace, sequenceOf, optionalWhitespace, recursiveParser} from 'arcsecond';
import tokens from './tokens.js';
import { predicate_parser, const_parser, var_parser} from "./term.js";
import {surroundedByParentheses} from "./parser_tools";


export const quantifier = quantifier_symbol_parser => (
    formula_parser => (
        sequenceOf([quantifier_symbol_parser, var_parser, whitespace, formula_parser])
    )
);

export const existencial_quantifier_parser = quantifier (char(tokens.EXISTENCIAL_QUANTIFIER));

export const universal_quantifier_parser = quantifier (char(tokens.UNIVERSAL_QUANTIFIER));

export const atomic_formula_parser = choice([predicate_parser, const_parser]);

export const negation_formula_parser = recursiveParser(() => (
    surroundedByParentheses(sequenceOf([
        char(tokens.NOT_SYMBOL), optionalWhitespace, formula_parser
    ]))
)); 

export const formula_parser = choice([
    negation_formula_parser,
    atomic_formula_parser
]);
