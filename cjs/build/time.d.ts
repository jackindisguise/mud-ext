/// <reference types="node" />
import { EventEmitter } from "events";
export declare class Timer extends EventEmitter {
    protected startTimestamp?: number;
    protected millisecondsPerSecond: number;
    private secondsPerMinute;
    get millisecondsPerMinute(): number;
    private minutesPerHour;
    get millisecondsPerHour(): number;
    private hoursPerDay;
    get millisecondsPerDay(): number;
    private intervals;
    /**
     * Starts emitting time events.
     */
    start(timestamp?: number): void;
    trigger(callback: (delay: number) => void, interval: number, absolute?: boolean): number;
    /**
     * Stop emitting time events.
     */
    stop(): number;
    getTimeSinceStart(): number;
}
export declare class CustomTimer extends Timer {
    constructor(millisecondsPerSecond: number);
}
/**
 * Sets an interval that fires at the given interval without respect to when it was fired.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export declare function setAbsoluteInterval(callback: (delay: number) => void, interval: number): number;
/**
 * Sets an interval that fires at the given interval with respect to when it was fired.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns {number} An ID that tracks this interval.
 */
export declare function setRelativeInterval(callback: (delay: number) => void, interval: number): number;
/**
 * Clears accurate or relative intervals.
 * @param ...ids A set of accurate or relative intervals to cancel.
 */
export declare function clearCustomInterval(...ids: number[]): void;
