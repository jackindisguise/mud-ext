import { EventEmitter } from "events";
import { setAbsoluteInterval, setRelativeInterval, clearCustomInterval } from "accurate-intervals";
export class Timer extends EventEmitter {
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
        const intervalSetter = absolute ? setAbsoluteInterval : setRelativeInterval;
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
        clearCustomInterval(...this.intervals);
        return Date.now() - this.startTimestamp;
    }
    getTimeSinceStart() {
        if (!this.startTimestamp)
            throw new Error("Timer not started.");
        return Date.now() - this.startTimestamp;
    }
}
export class CustomTimer extends Timer {
    constructor(millisecondsPerSecond) {
        super();
        this.millisecondsPerSecond = millisecondsPerSecond;
    }
}
