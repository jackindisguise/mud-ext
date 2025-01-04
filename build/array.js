import { randomInt } from "./number.js";
/**
 * Pick an element from a set of options.
 * @param options
 * @returns
 */
export function pick(...options) {
    return options[randomInt(0, options.length - 1)];
}
/**
 * Replace elements in an array based on
 * @param array
 * @param rule
 * @param replace
 * @returns
 */
export function replace(array, rule, replace) {
    const replaced = [];
    array.forEach((value, index) => {
        if (value === rule)
            replaced[index] = replace;
        else if (rule instanceof RegExp &&
            typeof value === "string" &&
            rule.exec(value))
            replaced[index] = replace;
        else
            replaced[index] = value;
    });
    return replaced;
}
