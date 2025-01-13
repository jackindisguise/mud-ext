// include the compiled javascript plz
const {string, array, number} = require("./build/index.cjs");
const assert = require("assert/strict");
const {test, suite} = require("node:test");
suite("README.md", ()=>{

test("Pad strings to a specific length.", ()=>{
let opts = { string: "CAKE", width: 10, padder: "-" };
let pl = string.padLeft(opts);
let pc = string.padCenter(opts);
let pr = string.padRight(opts);
assert.equal(pl, "------CAKE");
assert.equal(pc, "---CAKE---");
assert.equal(pr, "CAKE------");
});

test("There is also an alias for legacy reasons and occasionally convenience.", ()=>{
let opts = { string: "CAKE", width: 10, padder: "-" };
let pl = string.pad({ ...opts, side: string.PAD_SIDE.LEFT });
let pc = string.pad({ ...opts, side: string.PAD_SIDE.CENTER });
let pr = string.pad({ ...opts, side: string.PAD_SIDE.RIGHT });
assert.equal(pl, "------CAKE");
assert.equal(pc, "---CAKE---");
assert.equal(pr, "CAKE------");
});

test("Arbitrary-length padder strings.", ()=>{
let opts = { string: "CAKE", padder: "[]" };
let evenPadding = string.padCenter({ ...opts, width: 20 });
let oddPadding = string.padCenter({ ...opts, width: 14 });
assert.equal(evenPadding, "[][][][]CAKE[][][][]");
assert.equal(oddPadding, "[][][CAKE][][]");
});

test("Centered string padders have a consistent pattern.", ()=>{
let stupidPadder = "[]{}()<>(){}[]"; // 14 characters long
let opts = { width: 28, padder: stupidPadder };
let strA = "CAKE";
let strB = "BIG BOIS";
let stupidPadderx2 = stupidPadder.repeat(2); // 28 characters long
let stupidPaddingA = string.padCenter({ ...opts, string: strA });
let stupidPaddingB = string.padCenter({ ...opts, string: strB });
assert.equal(stupidPadderx2, "[]{}()<>(){}[][]{}()<>(){}[]"); // the base padder string that gets generated
assert.equal(stupidPaddingA, "[]{}()<>(){}CAKE{}()<>(){}[]"); // CAKE gets injected into the middle of the base padder string
assert.equal(stupidPaddingB, "[]{}()<>()BIG BOIS()<>(){}[]"); // pattern never changes
});

test("Terminal-style color coding.", ()=>{
const chalk = require("chalk"); // version 4.x supports CJS require
let colored = chalk.red("This is red!"); // uses terminal color characters to make this string red
let padded = string.padCenter({string: colored, width:40, padder:"[]", sizer:string.TERM_SIZER}); // string.TERM_SIZER respects terminal color characters
let expected = `[][][][][][][]${chalk.red("This is red!")}[][][][][][][]`;
assert.equal(expected, padded);
});

test("HTML-style color coding.", ()=>{
let colored = "<font color='red'>This is red!</font>"; // uses HTML tags to add color to string
let padded = string.padCenter({string: colored, width:40, padder:"[]", sizer:string.HTML_SIZER}); // string.HTML_SIZER respects HTML tags
let expected = `[][][][][][][]<font color='red'>This is red!</font>[][][][][][][]`;
assert.equal(expected, padded);
});

test("Wordwrap on strings.", ()=>{
let bigString =
	"\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Vestibulum mollis tortor a risus varius, sed euismod lectus ultricies. \
Nam sodales gravida lectus a pretium. \
Integer eget risus vitae purus viverra aliquam. \
Ut vehicula felis et facilisis blandit. \
Vestibulum elementum at enim in viverra. \
Donec tincidunt vel magna non pharetra.";

// the expected, wrapped string
let expected =
	"\
Lorem ipsum dolor sit amet, consectetur adipiscing\n\
elit. Vestibulum mollis tortor a risus varius, sed\n\
euismod lectus ultricies. Nam sodales gravida\n\
lectus a pretium. Integer eget risus vitae purus\n\
viverra aliquam. Ut vehicula felis et facilisis\n\
blandit. Vestibulum elementum at enim in viverra.\n\
Donec tincidunt vel magna non pharetra.";

// wrap it up
let wrapped = string.wrap({ string: bigString, width: 50 }).join("\n");
assert.equal(wrapped, expected);
});

test("Simple boxes.", ()=>{
// simple style settings
const simpleStyle = {
	corner: "+",
	vertical: "|",
	horizontal: "-"
};

// generate it
const generated = string
	.box({
		style: simpleStyle,
		width: 30,
		input: ["This is a test.", "I hate these people."]
	})
	.join("\n");

// expected result
const expected =
	"\
+----------------------------+\n\
| This is a test.            |\n\
| I hate these people.       |\n\
+----------------------------+";

// check it
assert.equal(generated, expected);
});

test("Complex boxes.", ()=>{
// complex style settings
const complexStyle = {
	top: { left: "))", right: "((" },
	bottom: { left: "]]", right: "[[" },
	left: ">-",
	right: "-<",
	horizontal: "=",
	titleBorder: { left: "(", right: ")" }
};

// generate it
const generated = string
	.box({
		style: complexStyle,
		width: 30,
		title: "What up!",
		input: ["This is a test.", "I hate these people."]
	})
	.join("\n");

// expected result
const expected =
	"\
))=( What up! )=============((\n\
>- This is a test.          -<\n\
>- I hate these people.     -<\n\
]]==========================[[";

// check it
assert.equal(generated, expected);
});

test("Check for autocompletion.", ()=>{
const partial = "sel";
const complete = "selling cake";
assert.ok(string.autocomplete(partial, complete));
});

test("Check for keyword matches.", ()=>{
const name = "the king of england loric";
assert.ok(string.matchKeywords("loric", name));
assert.ok(string.matchKeywords("king loric", name));
assert.ok(string.matchKeywords("t k o e l", name));
assert.ok(!string.matchKeywords("king john", name));
});

test("Linear interpolation.", ()=>{
const {number} = require("mud-ext");
const interpolated = number.lerp(0, 100, 0.5);
assert.equal(interpolated, 50);
});

test("Random integer generation.", ()=>{
const int = number.randomInt(1, 100);
assert.ok(1 <= int && int <= 100);
});

test("Roll virtual die and return the sum.", ()=>{
const result = number.roll(6,6);
assert.ok(6 <= result && result <= 6*6);
});

test("Roll vitual die and return the result of each roll.", ()=>{
const results = number.actualRoll(6, 6);
results.forEach((a) => assert.ok(1 <= a && a <= 6));
});

test("Pick random elements.", ()=>{
const options = ["You smell.", "Go to heck.", "Rawr XD."];
const result = array.pick(...options);
assert.ok(options.includes(result)); // i don't really know how to demonstrate this any other way X|
});

test("Replace elements in an array.", ()=>{
let str = "This is serious gaming.";
let split = str.split(" "); // ["This", "is", "serious", "gaming."]
let replaced = array.replace(split, "serious", "major-league"); // ["This", "is", "major-league", "gaming."]
let joined = replaced.join(" ");
assert.equal(joined, "This is major-league gaming.");
});
});