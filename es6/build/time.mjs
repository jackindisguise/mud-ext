import { EventEmitter } from "events";
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
/** Tracks activate intervals and updates timeout IDs so they can be cancelled. */
const intervals = {};
/** Tracks the next interval ID for this session. */
let nextIntervalID = 0;
/**
 * Sets an interval that fires at the given interval without respect to when it was fired.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export function setAbsoluteInterval(callback, interval) {
    const intervalID = nextIntervalID++;
    const __next = () => {
        const now = Date.now();
        const remainder = interval - (now % interval);
        intervals[intervalID] = setTimeout(() => {
            __next();
            callback(remainder);
        }, remainder);
    };
    __next();
    return intervalID;
}
/**
 * Sets an interval that fires at the given interval with respect to when it was fired.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export function setRelativeInterval(callback, interval) {
    const intervalID = nextIntervalID++;
    const startTime = Date.now();
    let cycle = 1; // number of cycles we've been through
    const __next = () => {
        const now = Date.now();
        const target = startTime + interval * cycle++; // calculate the target from the start point
        const remainder = target - now;
        intervals[intervalID] = setTimeout(() => {
            __next();
            callback(remainder);
        }, remainder);
    };
    __next();
    return intervalID;
}
/**
 * Clears accurate or relative intervals.
 * @param ...ids A set of accurate or relative intervals to cancel.
 */
export function clearCustomInterval(...ids) {
    for (const id of ids) {
        const timeoutID = intervals[id];
        if (timeoutID)
            clearTimeout(timeoutID);
    }
}
