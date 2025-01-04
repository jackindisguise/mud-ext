import { pick, replace } from "./array.js";
import { expect } from "chai";
describe("array.ts", () => {
    it("pick", (done) => {
        const options = [1, 2, 3];
        const chosen = pick(...options);
        expect(chosen).is.within(1, 3);
        done();
    });
    it("replace", (done) => {
        const str = ["This", "is", "a", "test."];
        const replaced = replace(str, "test.", "stick-up.");
        expect(replaced.join(" ")).is.equal("This is a stick-up.");
        done();
    });
});
