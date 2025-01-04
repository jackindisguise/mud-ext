export declare class Calendar {
    months: Month[];
    days: Day[];
    constructor(months: Month[], days: Day[]);
    private _secondsPerYear?;
    getSecondsPerYear(): number;
    getYear(timestamp: number): number;
    getMonthOfYear(timestamp: number): number | undefined;
    getDayOfYear(timestamp: number): number;
    getDayOfMonth(timestamp: number): number | undefined;
    getHourOfDay(timestamp: number): number;
    getMinute(timestamp: number): number;
    getSecond(timestamp: number): number;
}
export declare class Month {
    name: string;
    days: number;
    constructor(name: string, days: number);
}
export declare class Day {
    name: string;
    weekend: boolean;
    constructor(name: string, weekend: boolean);
}
export declare const Gregorian: Calendar;
