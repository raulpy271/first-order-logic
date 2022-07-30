
export const nodeTypes = {
    "VARIABLE":"VARIABLE",
    "CONSTANT":"CONSTANT",
    "PREDICATE_SYMBOL":"PREDICATE_SYMBOL",
    "OR_FORMULA":"OR_FORMULA",
    "AND_FORMULA":"AND_FORMULA",
    "NOT_FORMULA":"NOT_FORMULA",
    "IMPLICATION_FORMULA":"IMPLICATION_FORMULA",
    "UNIVERSAL_QUANTIFIER":"UNIVERSAL_QUANTIFIER",
    "EXISTENCIAL_QUANTIFIER":"EXISTENCIAL_QUANTIFIER",
}

export const tag_result = type => value => {
    return {type, value};
};

export const tag_result_binary_operator = type => values => {
    return {
        type: type,
        value: [values[0], values[4]]
    }
};

export const tag_negation_operator = values => {
    return {
        type: nodeTypes.NOT_FORMULA,
        value: values[2]
    }
};

export const tag_result_quantifier_operator = type => values => {
    return {
        type: type,
        value: [values[2], values[4]]
    }
};

export const map_const = values => {
    return {"type": nodeTypes.CONSTANT, "value": values.join("")}
};

export const map_var = values => {
    return {"type": nodeTypes.VARIABLE, "value": values.join("")}
};

export const map_list_of_predicate_symbol_arguments = values => {
    let [predicate_symbol_result, predicate_symbol_args] = values;
    if (predicate_symbol_args.length) {
        return tag_result (nodeTypes.PREDICATE_SYMBOL) ([predicate_symbol_result].concat(predicate_symbol_args))
    } else {
        return predicate_symbol_result;
    }
};
