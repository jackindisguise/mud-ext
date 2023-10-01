import * as mudext from "./build/index.js";
// 30 characters wide:
//   section: 111111111111111222222222222222
// character: 123456789012345678901234567890
let string = "aa aa aa aa aaa supercalifragilistic";
let wrapped = mudext.wrap(string, 30);
console.log(wrapped.join("\n"));