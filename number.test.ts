import * as number from "./number.js";
import { equal, ok } from "assert/strict";
import { describe, it } from "node:test";

describe("number.ts", () => {
	it("lerp", () => {
		equal(number.lerp(0, 100, 0.5), 50);
		equal(number.lerp(-50, 50, 0.5), 0);
	});

	describe("randomInt", () => {
		it("low<=result<=high", () => {
			const tests = 10000;
			const low = 100;
			const high = 500;
			for (let i = 0; i < tests; i++) {
				const result = number.randomInt(low, high);
				ok(low <= result && result <= high);
			}
		});

		it("full range", () => {
			const tests = 10000;
			const low = 10;
			const high = 20;
			const range = high - low + 1;
			const results: number[] = [];
			for (let i = 0; i < tests; i++) {
				const result = number.randomInt(low, high);
				if (results.includes(result)) continue;
				results.push(result);
			}
			equal(results.length, range);
		});

		it("reliable distribution", () => {
			const tests = 100000;
			const low = 1;
			const high = 5;
			const range = high - low + 1;
			const results: number[] = new Array(range);
			const expectedDistribution = tests / range;
			for (let i = 0; i < tests; i++) {
				const result = number.randomInt(low, high);
				if (results[result - low]) results[result - low]++;
				else results[result - low] = 1;
			}
			for (let i = low; i <= high; i++)
				ok(
					results[i - low] >= expectedDistribution * 0.95 &&
						results[i - low] <= expectedDistribution * 1.05
				);
		});
	});

	it("roll", () => {
		const tests = 10000;
		for (let i = 0; i < tests; i++) {
			let x = number.roll(2, 100);
			ok(x >= 2 && x <= 200);
		}
		for (let i = 0; i < tests; i++) {
			let x = number.roll(2, 100, 5);
			ok(x >= 7 && x <= 205);
		}
		for (let i = 0; i < tests; i++) {
			let x = number.roll(2, 100, -5);
			ok(x >= -3 && x <= 195);
		}
	});

	it("actualRoll", () => {
		const die = 2;
		const sides = 6;
		const tests = 10000;
		for (let i = 0; i < tests; i++) {
			const results = number.actualRoll(die, sides);
			for (const result of results) ok(result >= 1 && result <= sides);
			let x = results.reduce((sum, a) => (sum += a), 0);
			ok(x >= die && x <= die + die * sides);
		}
	});
});
