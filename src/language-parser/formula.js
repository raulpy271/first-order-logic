
import {choice, char, whitespace, sequenceOf, optionalWhitespace, recursiveParser} from 'arcsecond';
import tokens from './tokens.js';
import { predicate_parser, const_parser, var_parser} from "./term.js";
import {surroundedByParentheses} from "./parser_tools";


const quantifier = quantifier_symbol_parser => (
    formula_parser => (
        sequenceOf([quantifier_symbol_parser, var_parser, whitespace, formula_parser])
    )
);

const binary_formula_parser = binary_operator_parser => (
    recursiveParser(() => (
        surroundedByParentheses(sequenceOf([
            formula_parser, optionalWhitespace, binary_operator_parser, optionalWhitespace, formula_parser
        ]))
    ))
);

export const existencial_quantifier_parser = quantifier (char(tokens.EXISTENCIAL_QUANTIFIER));

export const universal_quantifier_parser = quantifier (char(tokens.UNIVERSAL_QUANTIFIER));

export const atomic_formula_parser = choice([predicate_parser, const_parser]);

export const negation_formula_parser = recursiveParser(() => (
    surroundedByParentheses(sequenceOf([
        char(tokens.NOT_SYMBOL), optionalWhitespace, formula_parser
    ]))
)); 

export const and_formula_parser = binary_formula_parser(char(tokens.AND_SYMBOL));
export const or_formula_parser = binary_formula_parser(char(tokens.OR_SYMBOL));

export const formula_parser = choice([
    and_formula_parser,
    or_formula_parser,
    negation_formula_parser,
    recursiveParser(() => universal_quantifier_parser (formula_parser)),
    recursiveParser(() => existencial_quantifier_parser (formula_parser)),
    atomic_formula_parser
]);
