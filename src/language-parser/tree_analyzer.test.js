
import {nodeTypes} from './syntax_tree.js';
import {formula_parser} from './formula.js';
import {getAllPredicateSymbols, allPredicateSymbolsInTreeAreInThisArray, getPredicateSymbolsNotInExpectedArray} from './tree_analyzer.js';

test('getAllPredicateSymbols of a formula with ony predicate symbols', () => {
    let tree = {type: nodeTypes.PREDICATE_SYMBOL, value: "Q"};
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["Q"]);
    tree = {
        type: nodeTypes.PREDICATE_SYMBOL,
        value:[
            {type: nodeTypes.PREDICATE_SYMBOL, value: "P"}, 
            {type: nodeTypes.VARIABLE, value: "x1"},
            {type: nodeTypes.PREDICATE_SYMBOL, value: [{type: nodeTypes.PREDICATE_SYMBOL, value: "Q"}, {type: nodeTypes.CONSTANT, value: "y2"}]},
        ]
    };
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["P", "Q"]);
});

test('getAllPredicateSymbols of a formula with binary operators', () => {
    let tree = formula_parser.run('(P | Q)').result;
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["P", "Q"]);
    tree = formula_parser.run('(y12 | (Q & S))').result;
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["Q", "S"]);
});

test('getAllPredicateSymbols of a formula with negation operator', () => {
    let tree = formula_parser.run('(~(y12 | Q))').result;
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["Q"]);
    tree = formula_parser.run('( ~ ( Q | (~ S) ) )').result;
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["Q", "S"]);
});

test('getAllPredicateSymbols of a formula with binary operators and quantifiers', () => {
    let tree = formula_parser.run('!x12 P(x12)').result;
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["P"]);
    tree = formula_parser.run('!x12 y12').result;
    expect(getAllPredicateSymbols(tree)).toStrictEqual([]);
    tree = formula_parser.run('*x12 !x14 (P(x12) => Q(x14, S))').result;
    expect(getAllPredicateSymbols(tree)).toStrictEqual(["P", "Q", "S"]);
});

test('get predicate symbol not included in array', () => {
    let tree = formula_parser.run('!x12 P(x12)').result;
    expect(allPredicateSymbolsInTreeAreInThisArray(tree, ["P", "Q"])).toBeTruthy();
    expect(getPredicateSymbolsNotInExpectedArray(tree, ["P", "Q"])).toBeFalsy();
    tree = formula_parser.run('!x12 P(x12, S, Q)').result;
    expect(allPredicateSymbolsInTreeAreInThisArray(tree, ["P", "Q"])).toBeFalsy();
    expect(getPredicateSymbolsNotInExpectedArray(tree, ["P", "Q"])).toBe("S");
});

