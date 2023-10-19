(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./number.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.replace = exports.pick = void 0;
    const number_1 = require("./number.cjs");
    /**
     * Pick an element from a set of options.
     * @param options
     * @returns
     */
    function pick(...options) {
        return options[(0, number_1.randomInt)(0, options.length - 1)];
    }
    exports.pick = pick;
    /**
     * Replace elements in an array based on
     * @param array
     * @param rule
     * @param replace
     * @returns
     */
    function replace(array, rule, replace) {
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
    exports.replace = replace;
});
