# About
This package provides functionality that I often end up rewriting when working on text-based games (MUDs in particular).

The major focus of a lot of these functions is to deal with manipulating strings for interacting with things, or manipulating strings for presentational purposes.

I would ideally like to create a module for handling command processing at some point.

# Compatibility
Supports both CJS and ES6 import style.
```javascript
// CommonJS-style
const {string, number, array} = require("mud-ext");

// ES6 module-style
import {string, number, array} from "mud-ext";
```

# Install
`npm i mud-ext`

# Features
## String functions
### Pad strings to a specific length.
```javascript
let opts = { string: "CAKE", width: 10, padder: "-" };
let pl = string.padLeft(opts);
let pc = string.padCenter(opts);
let pr = string.padRight(opts);
assert(pl === "------CAKE");
assert(pc === "---CAKE---");
assert(pr === "CAKE------");
```
There is also an alias for legacy reasons and occasionally convenience.
```javascript
let opts = { string: "CAKE", width: 10, padder: "-" };
let pl = string.pad({ ...opts, side: string.PAD_SIDE.LEFT });
let pc = string.pad({ ...opts, side: string.PAD_SIDE.CENTER });
let pr = string.pad({ ...opts, side: string.PAD_SIDE.RIGHT });
assert(pl === "------CAKE");
assert(pc === "---CAKE---");
assert(pr === "CAKE------");
```

### Arbitrary-length padder strings.
```javascript
let opts = { string: "CAKE", padder: "[]" };
let evenPadding = string.padCenter({ ...opts, width: 20 });
let oddPadding = string.padCenter({ ...opts, width: 14 });
assert(evenPadding === "[][][][]CAKE[][][][]");
assert(oddPadding === "[][][CAKE][][]");
```

### Centered string padders have a consistent pattern.
```javascript
let stupidPadder = "[]{}()<>(){}[]"; // 14 characters long
let opts = { width: 28, padder: stupidPadder };
let strA = "CAKE";
let strB = "BIG BOIS";
let stupidPadderx2 = stupidPadder.repeat(2); // 28 characters long
let stupidPaddingA = string.padCenter({ ...opts, string: strA });
let stupidPaddingB = string.padCenter({ ...opts, string: strB });
assert(stupidPadderx2 === "[]{}()<>(){}[][]{}()<>(){}[]"); // the base padder string that gets generated
assert(stupidPaddingA === "[]{}()<>(){}CAKE{}()<>(){}[]"); // CAKE gets injected into the middle of the base padder string
assert(stupidPaddingB === "[]{}()<>()BIG BOIS()<>(){}[]"); // pattern never changes
```

### Wordwrap on strings.
```javascript
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
assert(wrapped === expected);
```

### Generate boxes.
#### Simple boxes.
```javascript
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
assert(generated === expected);
```

#### Complex boxes.
```javascript
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
assert(generated === expected);
```

### Check for autocompletion.
```javascript
const partial = "sel";
const complete = "selling cake";
assert(string.autocomplete(partial, complete) === true);
```

### Check for keyword matches.
```javascript
const name = "the king of england loric";
assert(string.matchKeywords("loric", name) === true);
assert(string.matchKeywords("king loric", name) === true);
assert(string.matchKeywords("t k o e l", name) === true);
assert(string.matchKeywords("king john", name) === false);
```

## Number functions
### Linear interpolation.
Not super useful for MUDs in particular, but it is generally useful.
```javascript
const {number} = require("mud-ext");
const interpolated = number.lerp(0, 100, 0.5);
assert(interpolated === 50);
```
### Random integer generation.
Generates numbers within the given range inclusively.
```javascript
const int = number.randomInt(1, 100);
assert(1 <= int && int <= 100);
```

### Roll virtual die and return the sum.
```javascript
const result = number.roll(6,6);
console.assert(6 <= result && result <= 6*6);
```

### Roll vitual die and return the result of each roll.
```javascript
const results = number.actualRoll(6, 6);
results.forEach((a) => assert(1 <= a && a <= 6));
```

## Array functions
### Pick random elements.
```javascript
const {array} = require("mud-ext");
const options = ["You smell.", "Go to heck.", "Rawr XD."];
const result = array.pick(...options);
assert(options.includes(result)); // i don't really know how to demonstrate this any other way X|
```

### Replace elements in an array.
```javascript
let str = "This is serious gaming.";
let split = str.split(" ");
let replaced = array.replace(split, "serious", "major-league");
let joined = replaced.join(" ");
assert(joined === "This is major-league gaming.");
```