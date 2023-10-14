import { randomInt } from "./number.mjs";
/**
 * Pick an element from a set of options.
 * @param options
 * @returns
 */
export function pick(...options) {
    return options[randomInt(0, options.length - 1)];
}
