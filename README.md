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

# Usage
## `strings`
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
There is also an alias that I added for legacy reasons.
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
let stupidPadder2 = stupidPadder.repeat(2); // 28 characters long
console.assert(stupidPadder2  === "[]{}()<>(){}[][]{}()<>(){}[]"); // the base padder string that gets generated

let strA = "CAKE";
let stupidPaddingA = string.padCenter(strA, 28, stupidPadder);
console.assert(stupidPaddingA === "[]{}()<>(){}CAKE{}()<>(){}[]"); // the string gets injected into the middle of the base padder string

let strB = "BIG BOIS";
let stupidPaddingB = string.padCenter(strB, 28, stupidPadder);
console.assert(stupidPaddingB === "[]{}()<>()BIG BOIS()<>(){}[]"); // the inner string expands while the padder string retains its pattern
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
```javascript
```