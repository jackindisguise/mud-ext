(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./array.cjs", "chai"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const array_1 = require("./array.cjs");
    const chai_1 = require("chai");
    describe("array.ts", () => {
        it("pick", (done) => {
            const options = [1, 2, 3];
            const chosen = (0, array_1.pick)(...options);
            (0, chai_1.expect)(chosen).is.within(1, 3);
            done();
        });
    });
});
