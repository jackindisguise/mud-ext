import { pick } from "./array.mjs";
import { expect } from "chai";
describe("array.ts", () => {
    it("pick", (done) => {
        const options = [1, 2, 3];
        const chosen = pick(...options);
        expect(chosen).is.within(1, 3);
        done();
    });
});
