(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "events", "accurate-intervals"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomTimer = exports.Timer = void 0;
    const events_1 = require("events");
    const accurate_intervals_1 = require("accurate-intervals");
    class Timer extends events_1.EventEmitter {
        constructor() {
            super(...arguments);
            // second stuff
            this.millisecondsPerSecond = 1000;
            // minute stuff
            this.secondsPerMinute = 60;
            // hour stuff
            this.minutesPerHour = 60;
            // day stuff
            this.hoursPerDay = 24;
            // interval stuff
            this.intervals = [];
        }
        get millisecondsPerMinute() {
            return this.millisecondsPerSecond * this.secondsPerMinute;
        }
        get millisecondsPerHour() {
            return this.millisecondsPerMinute * this.minutesPerHour;
        }
        get millisecondsPerDay() {
            return this.millisecondsPerHour * this.hoursPerDay;
        }
        /**
         * Starts emitting time events.
         */
        start(timestamp) {
            if (timestamp)
                this.startTimestamp = timestamp;
            else
                this.startTimestamp = Date.now();
        }
        trigger(callback, interval, absolute) {
            const intervalSetter = absolute ? accurate_intervals_1.setAbsoluteInterval : accurate_intervals_1.setRelativeInterval;
            const intervalID = intervalSetter(callback, interval);
            this.intervals.push(intervalID);
            return intervalID;
        }
        /**
         * Stop emitting time events.
         */
        stop() {
            if (!this.startTimestamp)
                throw new Error("Timer not started.");
            (0, accurate_intervals_1.clearCustomInterval)(...this.intervals);
            return Date.now() - this.startTimestamp;
        }
        getTimeSinceStart() {
            if (!this.startTimestamp)
                throw new Error("Timer not started.");
            return Date.now() - this.startTimestamp;
        }
    }
    exports.Timer = Timer;
    class CustomTimer extends Timer {
        constructor(millisecondsPerSecond) {
            super();
            this.millisecondsPerSecond = millisecondsPerSecond;
        }
    }
    exports.CustomTimer = CustomTimer;
});
