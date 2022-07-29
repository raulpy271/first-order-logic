
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
