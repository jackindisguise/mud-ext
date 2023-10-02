export function lerp(low:number, high:number, mod:number){
	return low+(high-low)*mod;
}

export function randomInt(low:number, high:number){
	return Math.floor(Math.random()*(high - low + 1)) + low;
}
