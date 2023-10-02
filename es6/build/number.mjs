export function lerp(low, high, mod) {
    return low + (high - low) * mod;
}
export function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}
