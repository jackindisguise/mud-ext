var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    const number = __importStar(require("./number.cjs"));
    const chai_1 = require("chai");
    describe("number.ts", () => {
        it("lerp", (done) => {
            (0, chai_1.expect)(number.lerp(0, 100, 0.5)).is.equal(50);
            (0, chai_1.expect)(number.lerp(-50, 50, 0.5)).is.equal(0);
            done();
        });
        describe("randomInt", () => {
            it("low<=result<=high", (done) => {
                const tests = 10000;
                const low = 100;
                const high = 500;
                for (let i = 0; i < tests; i++) {
                    const result = number.randomInt(low, high);
                    (0, chai_1.assert)(low <= result && result <= high);
                }
                done();
            });
            it("full range", (done) => {
                const tests = 10000;
                const low = 10;
                const high = 20;
                const range = high - low + 1;
                const results = [];
                for (let i = 0; i < tests; i++) {
                    const result = number.randomInt(low, high);
                    if (results.includes(result))
                        continue;
                    results.push(result);
                }
                (0, chai_1.expect)(results.length).is.equal(range);
                done();
            });
            it("reliable distribution", (done) => {
                const tests = 100000;
                const low = 1;
                const high = 5;
                const range = high - low + 1;
                const results = new Array(range);
                const expectedDistribution = tests / range;
                for (let i = 0; i < tests; i++) {
                    const result = number.randomInt(low, high);
                    if (results[result - low])
                        results[result - low]++;
                    else
                        results[result - low] = 1;
                }
                for (let i = low; i <= high; i++)
                    (0, chai_1.expect)(results[i - low]).is.within(expectedDistribution * 0.95, expectedDistribution * 1.05);
                done();
            });
        });
        it("roll", (done) => {
            const tests = 10000;
            for (let i = 0; i < tests; i++)
                (0, chai_1.expect)(number.roll(2, 100)).is.within(2, 200);
            for (let i = 0; i < tests; i++)
                (0, chai_1.expect)(number.roll(2, 100, 5)).is.within(7, 205);
            for (let i = 0; i < tests; i++)
                (0, chai_1.expect)(number.roll(2, 100, -5)).is.within(-3, 195);
            done();
        });
        it("actualRoll", (done) => {
            const die = 2;
            const sides = 6;
            const tests = 10000;
            for (let i = 0; i < tests; i++) {
                const results = number.actualRoll(die, sides);
                for (const result of results)
                    (0, chai_1.expect)(result).is.within(1, sides);
                (0, chai_1.expect)(results.reduce((sum, a) => (sum += a), 0)).is.within(die, die + die * sides);
            }
            done();
        });
    });
});
