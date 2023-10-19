const fs = require("fs");
const data = fs.readFileSync("README.md", "utf8");
//console.log([data]);
const rule = /(.*?)\r?\n```javascript\r?\n(.*?)\r?\n```/gms;
let result;
const output = [
	"// include the compiled javascript plz",
	'const {string, array, number} = require("./cjs/build/index.cjs");',
	'const {assert} = require("chai");',
	'describe("README.md", ()=>{'
];
const ignore = ["Supports both CJS and ES6 import style."];
while ((result = rule.exec(data))) {
	let preceeding = result[1];
	const plines = preceeding.split(/\r?\n/g);
	let title = plines.pop();
	// skip #s and spaces
	for (let i = 0; i < title.length; i++) {
		if (title[i] === "#") continue;
		else if (title[i] === " ") continue;
		if (i === 0) break;
		title = title.slice(i);
		break;
	}
	if (ignore.includes(title)) continue;
	const lines = result[2].split(/\r?\n/g);
	output.push(`
it("${title}", (done)=>{
${lines.join("\r\n")}
done();
});`);
}

output.push("});");

fs.writeFileSync("README.spec.cjs", output.join("\n"));
