# API
## padLeft(`string`: string, `size`: number, `padder`: string=`" "`): string
* Pads the left side of a string to the given size, using the `padder` string provided to pad it.

```javascript
import * as mudext from "mud-ext";
for(let i=1;i<129;i*=2){
	const ticker = mudext.padLeft(`${i}`, 5, "-");
	console.log(ticker);
}
```
```text
----1
----2
----4
----8
---16
---32
---64
--128
```

* All padder functions support arbitrary `padder` sizes.

```javascript
for(let i=1;i<129;i*=2){
	const ticker = mudext.padLeft(`${i}`, 5, ":.");
	console.log(ticker);
}
```
```
:.:.1
:.:.2
:.:.4
:.:.8
:.:16
:.:32
:.:64
:.128
```


## padRight(`string`: string, `size`: number, `padder`: string=`" "`): string
* Pads the right side of a string to the given size, using the `padder` string provided to pad it.

```javascript
let attributes = {Strength:30, Intelligence:50, Agility:120};
for(let att in attributes) console.log(`${mudext.padRight(att, 12)}: ${attributes[att]}`);
```
```
Strength    : 30
Intelligence: 50
Agility     : 120
```

## padCenter(`string`: string, `size`: number, `padder`: string=`" "`): string
* Pads the left and right side of a string to the given size, using the `padder` string provided to pad it.

Attempts to center the string, dumping the last extra character on the right side if the size is uneven.

```javascript
for(let i=4;i<=10;i++){
	let ticker = `>${mudext.padCenter("CAKE", i, "-")}<`;
	console.log(ticker);
}
```
```
>CAKE<
>CAKE-<
>-CAKE-<
>-CAKE--<
>--CAKE--<
>--CAKE---<
>---CAKE---<
```

## pad(`string`: string,`size`: number,`side`: PAD_SIDE,`padder`: string): string
* An alias for the other pad functions, using the `PAD_SIDE` values to determine which side to add padding on.
```javascript
console.log(`>${mudext.pad("CAKE", 10, mudext.PAD_SIDE.LEFT, "-")}<`);
console.log(`>${mudext.pad("CAKE", 10, mudext.PAD_SIDE.CENTER, "-")}<`);
console.log(`>${mudext.pad("CAKE", 10, mudext.PAD_SIDE.RIGHT, "-")}<`);
```
...
```
>------CAKE<
>---CAKE---<
>CAKE------<
```

## wrap(`string`: string, `size`: number): string[]
* Wraps a string to the given size, breaking each line out as separate entries in an array.

It is agnostic regarding what style of linefeed you'd like to use with it.
```javascript
// 30 characters wide:
//            123456789012345678901234567890
let string = "This is a relatively long string.";
let wrapped = mudext.wrap(string, 30);
console.log(wrapped.join("\n"));
```
```
This is a relatively long
string.
```
* The wrap algorithm will only break long words if they occupy at least 50% of the line starting from the middle of the of the next line.
```javascript
// 30 characters wide:
// character: 123456789012345678901234567890
//   section: 111111111111111222222222222222
let string = "aa aa aa aa aa supercalifragilistic";
let wrapped = mudext.wrap(string, 30);
console.log(wrapped.join("\n"));
````
Because the long word `supercalifragilistic` takes up the entirety of the 2nd section of the line, the word is kept in place, but broken, with the remaining characters shoved into the next line.
```
aa aa aa aa aa supercalifragi-
listic
````
By moving the long word over just 1 character, adding whitespace to the beginning of the 2nd section, we no longer break the word and just move it to the next line.
```javascript
// 30 characters wide:
// character: 123456789012345678901234567890
//   section: 111111111111111222222222222222
let string = "aa aa aa aa aaa supercalifragilistic";
```
```
aa aa aa aa aaa
supercalifragilistic
````

## box(`options`: `BoxOptions`): string[]
* Constructs a text box using the options provided.
```javascript
const customBoxStyle = {
	horizontal: "=",
	vertical: "|",
	titleBorder: {
		left: ">",
		right: "<"
	},
	top: {
		corner: "."
	},
	bottom: {
		corner: "'"
	},
	hAlign: mudext.PAD_SIDE.CENTER,
	titleHAlign: mudext.PAD_SIDE.CENTER
}

const box = mudext.box({
	style: customBoxStyle,
	width: 40,
	title: "This is the title.",
	input: [
		"This is the first line, bro!",
		"This is the second line!"
	]
});

console.log(box.join("\n"));
```
```text
.========> This is the title. <========.
|     This is the first line, bro!     |
|       This is the second line!       |
'======================================'
```

## `BoxOptions`
### `input`: string[]
* A list of strings that will appear as separate lines in the box.
### `width`: number
* The width of the box.
### `title?`: string
* The title of the box.
### `style?`: `BoxStyle`
* A `BoxStyle` object.

## `BoxStyle`
### `horizontal`: string
* The character/s used for horizontal lines on the box.
### `vertical?`: string
* The character/s used for vertical lines on the box.
### `corner?`: string
* The character/s used for corners on the box.
### `titleBorder?`: `BoxStyleTitleBorder`
* Describes what character/s border the title and the box itself.
### `top?`: `BoxStyleVerticalEdge`
* Describes what the top vertical edge of the box should look like.
### `bottom?`: `BoxStyleVerticalEdge`
* Describes what the bottom vertical edge of the box should look like.

## `BoxStyleTitleBorder`
### `left?`: string
* The left border between the title and the top edge.
### `right?`: string
* The right border between the title and the top edge.

## `BoxStyleVerticalEdge`
### `left?`: string
* The left corner of the vertical edge.
### `right?`: string
* The right corner of the vertical edge.
### `corner?`: string
* The default corner (left and right) of the vertical edge.