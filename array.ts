import { randomInt } from "./number.js";

export function pick<type>(options: type[]): type; // accepts a single array of the type, which it picks from
export function pick<type>(...options: type[]): type; // accepts arbitrary amount of arguments of the type, which it picks from
/**
 * Pick an element from a set of options.
 * @param options
 * @returns
 */
export function pick<type>(...options: type[]): type {
	if (Array.isArray(options[0])) options = options[0];
	return options[randomInt(0, options.length - 1)];
}

/**
 * Replace elements in an array based on
 * @param array
 * @param rule
 * @param replace
 * @returns
 */
export function replace<type>(
	array: type[],
	rule: RegExp | type,
	replace: type
): type[] {
	const replaced: type[] = [];
	array.forEach((value, index) => {
		if (value === rule) replaced[index] = replace;
		else if (
			rule instanceof RegExp &&
			typeof value === "string" &&
			rule.exec(value)
		)
			replaced[index] = replace;
		else replaced[index] = value;
	});

	return replaced;
}
