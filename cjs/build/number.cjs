(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.actualRoll = exports.roll = exports.randomInt = exports.lerp = void 0;
    /**
     * Linear interpolation!
     * @param low The low end of the value.
     * @param high The high end of the value.
     * @param mod The amount of interpolation between the low and high end.
     * @returns {number} The interpolated value.
     */
    function lerp(low, high, mod) {
        return low + (high - low) * mod;
    }
    exports.lerp = lerp;
    /**
     * Generates a random integer between 2 numbers inclusively.
     * @param low The low end of the random integer.
     * @param high The high end of the random integer.
     * @returns
     */
    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low + 1)) + low;
    }
    exports.randomInt = randomInt;
    /**
     * Simulates a dice roll.
     * @param die The number of die to roll.
     * @param sides The number of sides on each die.
     * @param mod? A modifier for the final value.
     * @returns {number} The result of the dice roll.
     */
    function roll(die, sides, mod) {
        if (mod)
            return randomInt(die, die * sides) + mod;
        return randomInt(die, die * sides);
    }
    exports.roll = roll;
    /**
     * Returns the result of each simulated die being rolled.
     * @param die The number of die to roll.
     * @param sides The number of sides on each die.
     * @returns {number[]} The result of the rolls.
     */
    function actualRoll(die, sides) {
        let results = [];
        for (let i = 0; i < die; i++)
            results.push(randomInt(1, sides));
        return results;
    }
    exports.actualRoll = actualRoll;
});
