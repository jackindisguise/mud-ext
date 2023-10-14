(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gregorian = exports.Day = exports.Month = exports.Calendar = void 0;
    class Calendar {
        constructor(months, days) {
            this.months = months;
            this.days = days;
        }
        getSecondsPerYear() {
            if (this._secondsPerYear)
                return this._secondsPerYear;
            let time = 0;
            for (const month of this.months)
                time += month.days * (60 * 60 * 24);
            return (this._secondsPerYear = time);
        }
        getYear(timestamp) {
            return Math.floor(timestamp / this.getSecondsPerYear());
        }
        getMonthOfYear(timestamp) {
            let day = this.getDayOfYear(timestamp);
            for (let i = 0; i < this.months.length; i++) {
                const month = this.months[i];
                if (day < month.days)
                    return i;
                day -= month.days;
            }
        }
        getDayOfYear(timestamp) {
            const kotoshi = timestamp % this.getSecondsPerYear();
            const day = 60 * 60 * 24;
            return Math.floor(kotoshi / day);
        }
        getDayOfMonth(timestamp) {
            let day = this.getDayOfYear(timestamp);
            for (let i = 0; i < this.months.length; i++) {
                const month = this.months[i];
                if (day < month.days)
                    return day;
                day -= month.days;
            }
        }
        getHourOfDay(timestamp) {
            const thisDay = timestamp % (60 * 60 * 24);
            const hour = 60 * 60;
            return Math.floor(thisDay / hour);
        }
        getMinute(timestamp) {
            const thisHour = timestamp % (60 * 60);
            return Math.floor(thisHour / 60);
        }
        getSecond(timestamp) {
            return Math.floor(timestamp % 60);
        }
    }
    exports.Calendar = Calendar;
    class Month {
        constructor(name, days) {
            this.name = name;
            this.days = days;
        }
    }
    exports.Month = Month;
    class Day {
        constructor(name, weekend) {
            this.name = name;
            this.weekend = weekend;
        }
    }
    exports.Day = Day;
    const Monday = new Day("Monday", false);
    const Tuesday = new Day("Tuesday", false);
    const Wednesday = new Day("Wednesday", false);
    const Thursday = new Day("Thursday", false);
    const Friday = new Day("Friday", false);
    const Saturday = new Day("Saturday", true);
    const Sunday = new Day("Sunday", true);
    const January = new Month("January", 31);
    const February = new Month("February", 28);
    const March = new Month("March", 31);
    const April = new Month("April", 30);
    const May = new Month("May", 31);
    const June = new Month("June", 30);
    const July = new Month("July", 31);
    const August = new Month("August", 31);
    const September = new Month("September", 30);
    const October = new Month("October", 31);
    const November = new Month("November", 30);
    const December = new Month("December", 31);
    exports.Gregorian = new Calendar([
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    ], [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]);
});
