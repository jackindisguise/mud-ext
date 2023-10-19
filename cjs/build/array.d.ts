/**
 * Pick an element from a set of options.
 * @param options
 * @returns
 */
export declare function pick<type>(...options: type[]): type;
/**
 * Replace elements in an array based on
 * @param array
 * @param rule
 * @param replace
 * @returns
 */
export declare function replace<type>(array: type[], rule: RegExp | type, replace: type): type[];
