
import {choice, char, str, whitespace, sequenceOf, optionalWhitespace, recursiveParser} from 'arcsecond';
import tokens from './tokens.js';
import {predicate_parser, const_parser, var_parser} from "./term.js";
import {surroundedByParentheses, optionalSurroundedByParentheses, surroundedBy} from "./parser_tools";
import {nodeTypes, tag_negation_operator, tag_result_binary_operator, tag_result_quantifier_operator} from './syntax_tree.js';


const quantifier = (quantifier_symbol_parser, quantifier_nodeType) => (
    formula_parser => (
        sequenceOf(
            [optionalWhitespace, quantifier_symbol_parser, var_parser, whitespace, formula_parser, optionalWhitespace]
        ).map(tag_result_quantifier_operator(quantifier_nodeType))
    )
);

const binary_formula_parser = binary_operator_parser => (
    recursiveParser(() => (
        surroundedByParentheses(sequenceOf([
            formula_parser, optionalWhitespace, binary_operator_parser, optionalWhitespace, formula_parser
        ]))
    ))
);

export const existencial_quantifier_parser = quantifier (char(tokens.EXISTENCIAL_QUANTIFIER), nodeTypes.EXISTENCIAL_QUANTIFIER);

export const universal_quantifier_parser = quantifier (char(tokens.UNIVERSAL_QUANTIFIER), nodeTypes.UNIVERSAL_QUANTIFIER);

export const atomic_formula_parser = optionalSurroundedByParentheses(
    surroundedBy (optionalWhitespace) (choice([predicate_parser, const_parser]))
);

export const negation_formula_parser = recursiveParser(() => (
    surroundedByParentheses(sequenceOf([
        char(tokens.NOT_SYMBOL), optionalWhitespace, formula_parser
    ])).map(tag_negation_operator)
)); 

export const and_formula_parser = binary_formula_parser(char(tokens.AND_SYMBOL)).map(
    tag_result_binary_operator(nodeTypes.AND_FORMULA)
);
export const or_formula_parser = binary_formula_parser(char(tokens.OR_SYMBOL)).map(
    tag_result_binary_operator(nodeTypes.OR_FORMULA)
);
export const implication_formula_parser = binary_formula_parser(str(tokens.IMPLICATION_SYMBOL)).map(
    tag_result_binary_operator(nodeTypes.IMPLICATION_FORMULA)
);

export const formula_parser = choice([
    and_formula_parser,
    or_formula_parser,
    negation_formula_parser,
    implication_formula_parser,
    recursiveParser(() => universal_quantifier_parser (formula_parser)),
    recursiveParser(() => existencial_quantifier_parser (formula_parser)),
    atomic_formula_parser
]);
