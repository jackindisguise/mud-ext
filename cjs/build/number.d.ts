/**
 * Linear interpolation!
 * @param low The low end of the value.
 * @param high The high end of the value.
 * @param mod The amount of interpolation between the low and high end.
 * @returns {number} The interpolated value.
 */
export declare function lerp(low: number, high: number, mod: number): number;
/**
 * Generates a random integer between 2 numbers inclusively.
 * @param low The low end of the random integer.
 * @param high The high end of the random integer.
 * @returns
 */
export declare function randomInt(low: number, high: number): number;
/**
 * Simulates a dice roll.
 * @param die The number of die to roll.
 * @param sides The number of sides on each die.
 * @param mod? A modifier for the final value.
 * @returns {number} The result of the dice roll.
 */
export declare function roll(die: number, sides: number, mod?: number): number;
/**
 * Returns the result of each simulated die being rolled.
 * @param die The number of die to roll.
 * @param sides The number of sides on each die.
 * @returns {number[]} The result of the rolls.
 */
export declare function actualRoll(die: number, sides: number): number[];
