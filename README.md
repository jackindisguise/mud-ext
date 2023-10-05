# Compatability
Supports both CJS and ES6 import style.
```javascript
// CommonJS-style
const string = require("mud-ext").string;

// ES6 module-style
import {string} from "mud-ext";
```

# Install
`npm i mud-ext`

# Features
## String functions
### Pad strings to a specific length.
```javascript
import {string} from "mud-ext";
let str = "CAKE";
let pl = string.padLeft(str, 10, "-");
let pc = string.padCenter(str, 10, "-");
let pr = string.padRight(str, 10, "-");
console.assert(pl === "------CAKE");
console.assert(pc === "---CAKE---");
console.assert(pr === "CAKE------");
```
There is also an alias for legacy reasons and occasionally convenience.
```javascript
let str = "CAKE";
let pl = string.pad(str, 10, string.PAD_SIDE.LEFT, "-");
let pc = string.pad(str, 10, string.PAD_SIDE.CENTER, "-");
let pr = string.pad(str, 10, string.PAD_SIDE.RIGHT, "-");
console.assert(pl === "------CAKE");
console.assert(pc === "---CAKE---");
console.assert(pr === "CAKE------");
```

### Arbitrary-length padder strings.
```javascript
let str = "CAKE";
let padder = "[]";
let evenPadding = string.padCenter(str, 20, padder);
let oddPadding = string.padCenter(str, 14, padder);
console.assert(evenPadding === "[][][][]CAKE[][][][]")
console.assert(oddPadding  === "[][][CAKE][][]")
```

### Centered string padders have a consistent pattern.
```javascript
let stupidPadder = "[]{}()<>(){}[]"; // 14 characters long
let strA = "CAKE";
let strB = "BIG BOIS";
let stupidPadderx2 = stupidPadder.repeat(2); // 28 characters long
let stupidPaddingA = string.padCenter(strA, 28, stupidPadder);
let stupidPaddingB = string.padCenter(strB, 28, stupidPadder);
console.assert(stupidPadderx2 === "[]{}()<>(){}[][]{}()<>(){}[]"); // the base padder string that gets generated
console.assert(stupidPaddingA === "[]{}()<>(){}CAKE{}()<>(){}[]"); // CAKE gets injected into the middle of the base padder string
console.assert(stupidPaddingB === "[]{}()<>()BIG BOIS()<>(){}[]"); // pattern never changes
```

### Wordwrap on strings.
```javascript
// one very long line
let bigString = "\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Vestibulum mollis tortor a risus varius, sed euismod lectus ultricies. \
Nam sodales gravida lectus a pretium. \
Integer eget risus vitae purus viverra aliquam. \
Ut vehicula felis et facilisis blandit. \
Vestibulum elementum at enim in viverra. \
Donec tincidunt vel magna non pharetra."

// the expected, wrapped string
let expected = "\
Lorem ipsum dolor sit amet, consectetur adipiscing\n\
elit. Vestibulum mollis tortor a risus varius, sed\n\
euismod lectus ultricies. Nam sodales gravida\n\
lectus a pretium. Integer eget risus vitae purus\n\
viverra aliquam. Ut vehicula felis et facilisis\n\
blandit. Vestibulum elementum at enim in viverra.\n\
Donec tincidunt vel magna non pharetra."

// wrap it up
let wrapped = string.wrap(bigString, 50).join("\n");
console.assert(wrapped === expected);
```

### Generate boxes.
#### Simple boxes.
```javascript
// simple style settings
const simpleStyle = {
	corner:"+",
	vertical:"|",
	horizontal:"-"
};

// expected result
const expected = "\
+----------------------------+\n\
| This is a test.            |\n\
| I hate these people.       |\n\
+----------------------------+"

// generate it
const generated = string.box({
	style:simpleStyle,
	width:30,
	input:["This is a test.", "I hate these people."]
}).join("\n");

// check it
console.assert(generated === expected);
```

#### Complex boxes.
```javascript
// complex style settings
const complexStyle = {
	top:{left:"))", right:"(("},
	bottom:{left:"]]", right:"[["},
	left:">-",
	right:"-<",
	horizontal:"=",
	titleBorder:{left:"(", right:")"}
};

// expected result
const expected = "\
))=( What up! )=============((\n\
>- This is a test.          -<\n\
>- I hate these people.     -<\n\
]]==========================[[";

// generate it
const generated = string.box({
	style:complexStyle,
	width:30,
	title:"What up!",
	input:["This is a test.", "I hate these people."]
}).join("\n");

// check it
console.assert(generated === expected);
```

## Number functions
### Linear interpolation.
Not super useful for MUDs in particular, but it is generally useful.
```javascript
import {number} from "mud-ext";
const interpolated = number.lerp(0,100,0.5);
console.assert(interpolated === 50);
```
### Random integer generation.
Generates numbers within the given range inclusively.
```javascript
const int = number.randomInt(1,100);
console.assert(1 <= int && int <= 100);
```

### Roll virtual die and return the sum.
```javascript
const result = number.roll(6,6);
console.assert(6 <= result && result <= 6*6);
```

### Roll vitual die and return the result of each roll.
```javascript
const results = number.actualRoll(6,6);
results.forEach((a)=>console.assert(1 <= a && a <= 6));
```