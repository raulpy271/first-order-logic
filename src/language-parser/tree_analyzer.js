
import {nodeTypes} from "./syntax_tree.js";
import { predicate_symbols } from "./term.js";

export function getAllPredicateSymbols(tree) {
    let symbols = [];
    if (tree.type === nodeTypes.PREDICATE_SYMBOL) {
        if (typeof tree.value === "string") {
            symbols.push(tree.value);
        } else {
            for (let children of tree.value) {
                let children_symbols = getAllPredicateSymbols(children);
                symbols = symbols.concat(children_symbols);
            }
        }
    }
    if ([nodeTypes.OR_FORMULA, nodeTypes.AND_FORMULA, nodeTypes.IMPLICATION_FORMULA].includes(tree.type)) {
        symbols = symbols.concat(getAllPredicateSymbols(tree.value[0]));
        symbols = symbols.concat(getAllPredicateSymbols(tree.value[1]));
    }
    if ([nodeTypes.UNIVERSAL_QUANTIFIER, nodeTypes.EXISTENCIAL_QUANTIFIER].includes(tree.type)) {
        symbols = symbols.concat(getAllPredicateSymbols(tree.value[1]));
    }
    return symbols;
}
