import { pick, replace } from "./array.js";
import { equal, ok } from "assert/strict";
import { describe, it } from "node:test";

describe("array.ts", () => {
	it("pick", () => {
		const options: number[] = [1, 2, 3];
		const chosen: number = pick(...options);
		ok(chosen >= 1 && chosen <= 3);
	});

	it("replace", (done) => {
		const str: string[] = ["This", "is", "a", "test."];
		const replaced: string[] = replace(str, "test.", "stick-up.");
		equal(replaced.join(" "), "This is a stick-up.");
	});
});
