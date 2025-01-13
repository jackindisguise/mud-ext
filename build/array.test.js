import { pick, replace } from "./array.js";
import { equal, ok } from "assert/strict";
import { describe, it } from "node:test";
describe("array.ts", () => {
    it("pick", () => {
        const options = [1, 2, 3];
        const chosen = pick(...options);
        ok(chosen >= 1 && chosen <= 3);
    });
    it("replace", (done) => {
        const str = ["This", "is", "a", "test."];
        const replaced = replace(str, "test.", "stick-up.");
        equal(replaced.join(" "), "This is a stick-up.");
    });
});
