export enum PAD_SIDE {
	/** Pads to the left. */
	LEFT = 1,

	/** Pads to the right. */
	RIGHT = 2,

	/** Pads to the left and right. */
	CENTER = 3
}

/**
 * Describes the borders of box titles.
 */
export interface BoxStyleTitleBorder{
	left?: string;
	right?: string;
}

/**
 * Describes the elements of horizontal edges of boxes.
 */
export interface BoxStyleHorizontalEdge{
	left?: string;
	right?: string;
	middle?: string;
	corner?: string;
}

/**
 * Describes all of the elements of boxes.
 */
export interface BoxStyle{
	horizontal?: string;
	vertical?: string;
	left?: string;
	right?: string;
	hPadding?: number;
	vPadding?: number;
	corner?: string;
	titleBorder?: BoxStyleTitleBorder;
	top?: BoxStyleHorizontalEdge;
	bottom?: BoxStyleHorizontalEdge;
	hAlign?: PAD_SIDE;
	titleHAlign?: PAD_SIDE;
}

/**
 * Some generic boxes I invented due to my ingenuity.
 */
export const BOX_STYLE: {[key: string]: BoxStyle} = {
	PLAIN: {
		horizontal: "-",
		vertical: "|",
		corner: "+"
	},
	ROUNDED: {
		horizontal: "-",
		vertical: "|",
		top:{
			corner: "."
		},
		bottom:{
			corner: "'"
		}
	},
	O: {
		titleBorder: {
			left: "(",
			right: ")"
		},
		horizontal: "O",
		vertical: "O",
	}
}

/**
 * Pad a string to the given size.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param side Which side to add padding to.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export function pad(string:string, size:number, side?:PAD_SIDE, padder?:string): string{
	if(side===PAD_SIDE.LEFT) return padLeft(string, size, padder);
	if(side===PAD_SIDE.CENTER) return padCenter(string, size, padder);
	// defaults to padding the right side
	return padRight(string, size, padder);
}

/**
 * Pad a string to the given size on the left.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export function padLeft(string:string, size:number, padder=" "): string{
	let csize = string.length;
	let psize = size-csize;
	if(psize<1) return string;
	let pad = padder.repeat(Math.ceil(psize/padder.length));
	if(pad.length>psize) pad = pad.slice(0,psize);
	return `${pad}${string}`;
}

/**
 * Pad a string to the given size on the right.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export function padRight(string:string, size:number, padder=" "): string{
	let csize = string.length;
	let psize = size-csize;
	if(psize<1) return string;
	let pad = padder.repeat(Math.ceil(psize/padder.length));
	if(pad.length>psize) pad = pad.slice(0,psize);
	return `${string}${pad}`;
}

/**
 * Pad a string to the given size on the left and right.
 * If the padding is ultimately uneven, the extra padding is added to the right side.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export function padCenter(string:string, size:number, padder=" "): string{
	let ssize = string.length;
	let psize = size-ssize;
	if(psize<1) return string;
/*	let lsize = psize%2?Math.floor(psize/2):psize/2;
	let rsize = psize%2?Math.floor(psize/2)+1:psize/2;
	let lpad = padder.repeat(Math.ceil(lsize/padder.length));
	if(lpad.length>lsize) lpad = lpad.slice(0,lsize);
	let rpad = padder.repeat(Math.ceil(rsize/padder.length));
	if(rpad.length>rsize) rpad = rpad.slice(0,rsize);*/
	let tpad = padder.repeat(Math.ceil(size/padder.length));
	let lsize = psize%2?Math.floor(psize/2):psize/2;
	let rsize = psize%2?Math.floor(psize/2)+1:psize/2;
	let lpad = tpad.slice(0,lsize);
	let rpad = tpad.slice(lsize+string.length, lsize+string.length+rsize);
	return `${lpad}${string}${rpad}`;
}

/**
 * Wraps a string to a given size.
 * @param string The string to wrap.
 * @param size The maximum width of each line.
 * @returns {string[]} The lines of the wrapped string in an array.
 */
export function wrap(string:string, size:number): string[]{
	let lines:string[] = [];
	let last = 0;
	let cursor=size;
	while(cursor<string.length){
		let breakpoint = cursor; // assume current point is breakpoint
		let mid = (cursor+last)/2; // search halfway between last point and current point for whitespace
		for(let i=cursor;i>=mid;i--){ // search for nearby whitespace
			if([" ", "\r", "\n", "\t"].includes(string[i])){
				breakpoint = i;
				break;
			}
		}

		// if the breakpoint is whitespace, skip over it
		if([" ", "\r", "\n", "\t"].includes(string[breakpoint])){
			//console.log(last, breakpoint, string.slice(last, breakpoint+1));
			lines.push(string.slice(last, breakpoint));
			last=breakpoint+1;

		// if it's not whitespace, add a hypen to break the string and start the next line at this point
		} else {
			lines.push(string.slice(last, breakpoint-1)+"-");
			last=breakpoint-1;
		}
		cursor = last+size;
	}

	lines.push(string.slice(last));
	return lines;
}

/**
 * Describes the details of the box.
 */
export interface BoxOptions{
	input: string[];
	width: number;
	title?: string;
	style?: BoxStyle;
}

/**
 * Generates a contained box of text.
 * @param options The options for the box.
 * @returns {string[]} The lines of the box in an array.
 */
export function box(options:BoxOptions): string[]{
	let lines:string[] = [];

	// construct top of box
	let top;
	if(options.title) {
		top = options.title;
		if(options.style?.titleBorder) top = `${options.style.titleBorder.left} ${top} ${options.style.titleBorder.right}`;
	}

	// generate top
	if(options.style?.top?.middle||options.style?.horizontal) {
		if(top && !options.style?.titleBorder) top = ` ${top} `; // add padding between title and edge characters
		let tl, tr;
		const horizontal:string = options.style?.top?.middle || options.style?.horizontal || ""; // "" should never happen but oh well
		const tlCorner = options.style?.top?.left||options.style?.top?.corner||options.style?.corner;
		if(tlCorner){
			const tlPad = horizontal;
			tl = tlCorner+tlPad;
		} else tl = "";

		const trCorner = options.style?.top?.right||options.style?.top?.corner||options.style?.corner;
		if(trCorner){
			const trPad = horizontal;
			tr = trPad+trCorner;
		} else tr = "";
		top = `${tl}${pad(top||"", options.width-tl.length-tr.length, options.style?.titleHAlign||PAD_SIDE.RIGHT, options.style?.top?.middle||options.style?.horizontal)}${tr}`;
	} else if(top) top = pad(top, options.width, options.style?.titleHAlign||PAD_SIDE.RIGHT);

	// add top if it's been generated
	if(top) lines.push(top);

	const addLine = (line)=>{
		let formatted = line;
		if(options.style?.vertical || options.style?.left || options.style?.right) {
			const left = `${options.style?.left||options.style?.vertical||""}${" ".repeat(options.style?.hPadding||1)}`;
			const right = `${" ".repeat(options.style?.hPadding||1)}${options.style?.right||options.style?.vertical||""}`;
			formatted = `${left}${pad(formatted, options.width-left.length-right.length, options.style?.hAlign||PAD_SIDE.RIGHT)}${right}`;
		} else {
			const left = `${" ".repeat(options.style?.hPadding||1)}`;
			const right = left;
			formatted = `${left}${pad(formatted, options.width-left.length-right.length, options.style?.hAlign||PAD_SIDE.RIGHT)}${right}`;
		}
		lines.push(formatted);
	};

	// construct content lines
	if(options.style?.vPadding) for(let i=0;i<options.style.vPadding;i++) addLine("");
	for(let line of options.input) addLine(line);
	if(options.style?.vPadding) for(let i=0;i<options.style.vPadding;i++) addLine("");


	// generate bottom
	if(options.style?.bottom?.middle||options.style?.horizontal) {
		let bl, br;
		const horizontal:string = options.style?.bottom?.middle || options.style?.horizontal || ""; // "" should never happen but oh well
		const blCorner = options.style?.bottom?.left||options.style?.bottom?.corner||options.style?.corner;
		if(blCorner){
			const blPad = horizontal;
			bl = blCorner+blPad;
		} else bl = "";

		const brCorner = options.style?.bottom?.right||options.style?.bottom?.corner||options.style?.corner;
		if(brCorner){
			const brPad = horizontal;
			br = brPad+brCorner;
		} else br = "";
		const bottom = `${bl}${padLeft("", options.width-bl.length-br.length, horizontal)}${br}`;
		lines.push(bottom);
	}

	return lines;
}