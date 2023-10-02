(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./number.cjs", "chai"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const number = require("./number.cjs");
    const chai_1 = require("chai");
    describe("number.ts", () => {
        describe("randomInt", () => {
            it("full range", (done) => {
                let tests = 1000000;
                let low = 0;
                let high = 9;
                let range = high - low + 1;
                let results = new Array(range);
                let expectedDistribution = tests / range;
                for (let i = 0; i < tests; i++) {
                    const result = number.randomInt(low, high);
                    if (results[result])
                        results[result]++;
                    else
                        results[result] = 1;
                }
                for (let i = low; i <= high; i++)
                    (0, chai_1.expect)(results[i]).is.within(expectedDistribution * 0.95, expectedDistribution * 1.05);
                done();
            });
        });
    });
});
