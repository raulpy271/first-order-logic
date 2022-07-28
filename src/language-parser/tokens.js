
const tokens = {
    EXISTENCIAL_QUANTIFIER : '!',
    UNIVERSAL_QUANTIFIER : '*',
    CONSTANT_SYMBOL : 'y',
    AND_SYMBOL : '&',
    OR_SYMBOL : '|',
    IMPLICATION_SYMBOL : '=>',
    NOT_SYMBOL : '~',
    VARIABLE_SYMBOL : 'x',
    PREDICATE_SYMBOL_RE : /^[a-wzA-Z][a-zA-Z]*\d*/
}

export default tokens;
