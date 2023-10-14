import { pick } from "./array";
import { expect } from "chai";

describe("array.ts", () => {
	it("pick", (done) => {
		const options: number[] = [1, 2, 3];
		const chosen: number = pick(...options);
		expect(chosen).is.within(1, 3);
		done();
	});
});
