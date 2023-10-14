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
