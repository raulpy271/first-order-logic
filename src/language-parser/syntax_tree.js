
export const nodeTypes = {
    "VARIABLE":"VARIABLE",
    "CONSTANT":"CONSTANT",
    "PREDICATE_SYMBOL":"PREDICATE_SYMBOL",
}

export const tag_result = type => value => {
    return {type, value};
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
