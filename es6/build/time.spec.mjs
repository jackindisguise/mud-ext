import { CustomTimer } from "./time.mjs";
import { expect } from "chai";
let c;
describe("time.ts", () => {
    it("1000ms per second", (done) => {
        const secondOffset = 500;
        let accumulated = 0;
        let seconds = 0;
        c = new CustomTimer(secondOffset);
        c.start();
        c.trigger((delay) => c.emit("second", delay), secondOffset);
        c.on("second", (delay) => {
            accumulated += delay;
            seconds++;
            if (seconds === 10) {
                expect(accumulated / seconds).is.greaterThanOrEqual(secondOffset * 0.85);
                done();
            }
        });
    }).timeout(500 * 10 * 2);
    it("100ms per second", (done) => {
        const secondOffset = 100;
        let accumulated = 0;
        let seconds = 0;
        c = new CustomTimer(secondOffset);
        c.start();
        c.trigger((delay) => c.emit("second", delay), secondOffset);
        c.on("second", (delay) => {
            accumulated += delay;
            seconds++;
            if (seconds === 10) {
                expect(accumulated / seconds).is.greaterThanOrEqual(secondOffset * 0.75);
                done();
            }
        });
    }).timeout(100 * 10 * 2);
    it("10ms per second", (done) => {
        const secondOffset = 50;
        let accumulated = 0;
        let seconds = 0;
        c = new CustomTimer(secondOffset);
        c.start();
        c.trigger((delay) => c.emit("second", delay), secondOffset);
        c.on("second", (delay) => {
            accumulated += delay;
            seconds++;
            if (seconds === 10) {
                expect(accumulated / seconds).is.greaterThanOrEqual(secondOffset * 0.5);
                done();
            }
        });
    }).timeout(50 * 10 * 2);
    afterEach(() => {
        if (!c)
            return;
        c.stop();
    });
});
