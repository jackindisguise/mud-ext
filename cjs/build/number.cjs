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
    exports.randomInt = exports.lerp = void 0;
    function lerp(low, high, mod) {
        return low + (high - low) * mod;
    }
    exports.lerp = lerp;
    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low + 1)) + low;
    }
    exports.randomInt = randomInt;
});
