export declare class Calendar {
    months: Month[];
    days: Day[];
    constructor(months: Month[], days: Day[]);
    private _secondsPerYear;
    getSecondsPerYear(): number;
    getYear(timestamp: any): number;
    getMonthOfYear(timestamp: any): number;
    getDayOfYear(timestamp: any): number;
    getDayOfMonth(timestamp: any): number;
    getHourOfDay(timestamp: any): number;
    getMinute(timestamp: any): number;
    getSecond(timestamp: any): number;
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
