/**
 * Linear interpolation!
 * @param low The low end of the value.
 * @param high The high end of the value.
 * @param mod The amount of interpolation between the low and high end.
 * @returns {number} The interpolated value.
 */
export function lerp(low, high, mod) {
    return low + (high - low) * mod;
}
/**
 * Generates a random integer between 2 numbers inclusively.
 * @param low The low end of the random integer.
 * @param high The high end of the random integer.
 * @returns
 */
export function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}
/**
 * Simulates a dice roll.
 * @param die The number of die to roll.
 * @param sides The number of sides on each die.
 * @param mod? A modifier for the final value.
 * @returns {number} The result of the dice roll.
 */
export function roll(die, sides, mod) {
    if (mod)
        return randomInt(die, die * sides) + mod;
    return randomInt(die, die * sides);
}
