import { EventEmitter } from "events";

export class Timer extends EventEmitter {
	protected startTimestamp?: number;

	// second stuff
	protected millisecondsPerSecond = 1000;

	// minute stuff
	private secondsPerMinute = 60;
	get millisecondsPerMinute() {
		return this.millisecondsPerSecond * this.secondsPerMinute;
	}

	// hour stuff
	private minutesPerHour = 60;
	get millisecondsPerHour() {
		return this.millisecondsPerMinute * this.minutesPerHour;
	}

	// day stuff
	private hoursPerDay = 24;
	get millisecondsPerDay() {
		return this.millisecondsPerHour * this.hoursPerDay;
	}

	// interval stuff
	private intervals: number[] = [];

	/**
	 * Starts emitting time events.
	 */
	start(timestamp?: number) {
		if (timestamp) this.startTimestamp = timestamp;
		else this.startTimestamp = Date.now();
	}

	trigger(
		callback: (delay: number) => void,
		interval: number,
		absolute?: boolean
	): number {
		const intervalSetter = absolute ? setAbsoluteInterval : setRelativeInterval;
		const intervalID = intervalSetter(callback, interval);
		this.intervals.push(intervalID);
		return intervalID;
	}

	/**
	 * Stop emitting time events.
	 */
	stop(): number {
		if (!this.startTimestamp) throw new Error("Timer not started.");
		clearCustomInterval(...this.intervals);
		return Date.now() - this.startTimestamp;
	}

	getTimeSinceStart() {
		if (!this.startTimestamp) throw new Error("Timer not started.");
		return Date.now() - this.startTimestamp;
	}
}

export class CustomTimer extends Timer {
	constructor(millisecondsPerSecond: number) {
		super();
		this.millisecondsPerSecond = millisecondsPerSecond;
	}
}