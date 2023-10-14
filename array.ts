import { randomInt } from "./number";

/**
 * Pick an element from a set of options.
 * @param options
 * @returns
 */
export function pick<type>(...options: type[]): type {
	return options[randomInt(0, options.length - 1)];
}
