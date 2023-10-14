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
    exports.pick = void 0;
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
});
