import {padLeft} from "./es6/build/string.mjs";
import {Gregorian} from "./es6/build/calendar.mjs";
import {CustomTimer, Timer, setRelativeInterval, setAbsoluteInterval} from "./es6/build/time.mjs";
const millisecondsPerSecond = 100;
const t = new CustomTimer(millisecondsPerSecond);
setTimeout(()=>{
	t.start();
	setRelativeInterval((delay)=>{
		update(delay);
	}, millisecondsPerSecond*60);
}, 333);

let delaySum = 0;
let delays = 0;
function update(delay){
	delaySum += delay;
	delays++;
	const now = t.getTimeSinceStart();
	let second = Gregorian.getSecond(now/millisecondsPerSecond);
	let minute = Gregorian.getMinute(now/millisecondsPerSecond);
	let hour = Gregorian.getHourOfDay(now/millisecondsPerSecond);
	console.log(`${padLeft(""+hour, 2, "0")}:${padLeft(""+minute, 2, "0")}:${padLeft(""+second, 2, "0")}.${padLeft(""+(now%1000), 3, "0")} (${now}, avg ${delaySum/delays})`);
}