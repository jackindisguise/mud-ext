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
export interface BoxStyleTitleBorder {
	left?: string;
	right?: string;
}

/**
 * Describes the elements of horizontal edges of boxes.
 */
export interface BoxStyleHorizontalEdge {
	left?: string;
	right?: string;
	middle?: string;
	corner?: string;
}

/**
 * Describes all of the elements of boxes.
 */
export interface BoxStyle {
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
export const BOX_STYLES: { [key: string]: BoxStyle } = {
	PLAIN: {
		horizontal: "-",
		vertical: "|",
		corner: "+"
	},
	ROUNDED: {
		horizontal: "-",
		vertical: "|",
		top: {
			corner: "."
		},
		bottom: {
			corner: "'"
		}
	},
	O: {
		titleBorder: {
			left: "(",
			right: ")"
		},
		horizontal: "O",
		vertical: "O"
	}
};

/**
 * Options for pad functions.
 */
export interface PadOptions {
	/** The string to pad. */
	string: string;

	/** The desired width of the string. */
	width: number;

	/** The string to use as a padder. */
	padder?: string;

	/** A custom function for determing the size of the provided string. */
	sizer?: (str: string) => number;

	/** A custom function for adding color codes (or any non-rendered element) to the padding. */
	color?: (str: string) => string;
}

/**
 * Removes terminal color codes from length.
 * @param str The string to check.
 * @returns {number} The length of the string minus terminal color escapes.
 */
export function termSizer(str: string): number {
	const rule = /(\u001b\[.*?m)/g;
	const result = str.match(rule);
	if (!result) return str.length;
	return str.length - result.reduce((a, b) => a + b.length, 0);
}

/**
 * Get the length of a string.
 * @param str The string to check.
 * @returns {number} The length of the string.
 */
export function defaultSizer(str): number {
	return str.length;
}

/**
 * Pad a string to the given size.
 * @param options {PadOptions} The padding options.
 * @param side {PAD_SIDE} The side to add padding to.
 * @returns {string} The padded string.
 */
export function pad(options: PadOptions, side?: PAD_SIDE): string {
	if (side === PAD_SIDE.LEFT) return padLeft(options);
	if (side === PAD_SIDE.CENTER) return padCenter(options);
	// defaults to padding the right side
	return padRight(options);
}

/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export function padLeft(options: PadOptions) {
	const padder = options.padder || " "; // default to space
	const sizer = options.sizer || defaultSizer; // default to string length
	const csize = sizer(options.string);
	const psize = options.width - csize;
	if (psize < 1) return options.string;
	let pad = padder.repeat(Math.ceil(psize / sizer(padder)));
	if (sizer(pad) > psize) pad = pad.slice(0, psize);
	if (options.color) pad = options.color(pad);
	return `${pad}${options.string}`;
}

/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export function padRight(options: PadOptions) {
	const padder = options.padder || " "; // default to space
	const sizer = options.sizer || defaultSizer; // default to string length
	const csize = sizer(options.string);
	const psize = options.width - csize;
	if (psize < 1) return options.string;
	let pad = padder.repeat(Math.ceil(psize / sizer(padder)));
	if (sizer(pad) > psize) pad = pad.slice(0, psize);
	if (options.color) pad = options.color(pad);
	return `${options.string}${pad}`;
}

/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export function padCenter(options: PadOptions) {
	const padder = options.padder || " "; // default to space
	const sizer = options.sizer || defaultSizer; // default to string length
	const csize = sizer(options.string);
	const psize = options.width - csize;
	if (psize < 1) return options.string;
	const tpad = padder.repeat(Math.ceil(options.width / sizer(padder)));
	const lsize = psize % 2 ? Math.floor(psize / 2) : psize / 2;
	const rsize = psize % 2 ? Math.floor(psize / 2) + 1 : psize / 2;
	let lpad = tpad.slice(0, lsize); // this is why you should avoid using colors in padders and stick to color option
	let rpad = tpad.slice(
		lsize + options.string.length,
		lsize + options.string.length + rsize
	);
	if (options.color) {
		lpad = options.color(lpad);
		rpad = options.color(lpad);
	}
	return `${lpad}${options.string}${rpad}`;
}

/**
 * Wraps a string to a given size.
 * @param string The string to wrap.
 * @param size The maximum width of each line.
 * @returns {string[]} The lines of the wrapped string in an array.
 */
export function wrap(string: string, size: number): string[] {
	const lines: string[] = [];
	let last = 0;
	let cursor = size;
	while (cursor < string.length) {
		let breakpoint = cursor; // assume current point is breakpoint
		const mid = (cursor + last) / 2; // search halfway between last point and current point for whitespace
		for (let i = cursor; i >= mid; i--) {
			// search for nearby whitespace
			if ([" ", "\r", "\n", "\t"].includes(string[i])) {
				breakpoint = i;
				break;
			}
		}

		// if the breakpoint is whitespace, skip over it
		if ([" ", "\r", "\n", "\t"].includes(string[breakpoint])) {
			//console.log(last, breakpoint, string.slice(last, breakpoint+1));
			lines.push(string.slice(last, breakpoint));
			last = breakpoint + 1;

			// if it's not whitespace, add a hypen to break the string and start the next line at this point
		} else {
			lines.push(string.slice(last, breakpoint - 1) + "-");
			last = breakpoint - 1;
		}
		cursor = last + size;
	}

	lines.push(string.slice(last));
	return lines;
}

/**
 * Describes the details of the box.
 */
export interface BoxOptions {
	input: string[];
	width: number;
	title?: string;
	style?: BoxStyle;
	sizer?: (str: string) => number;
	color?: (str: string) => string;
}

/**
 * Generates a contained box of text.
 * @param options The options for the box.
 * @returns {string[]} The lines of the box in an array.
 */
export function box(options: BoxOptions): string[] {
	const sizer = options.sizer || defaultSizer; // default to string length
	const color = options.color || ((str: string) => str);
	const lines: string[] = [];

	// consolidate top elements
	let topmiddle: string =
		options.style?.top?.middle || options.style?.horizontal || "";
	const topleft: string =
		options.style?.top?.left ||
		options.style?.top?.corner ||
		options.style?.corner ||
		"";
	const topright: string =
		options.style?.top?.right ||
		options.style?.top?.corner ||
		options.style?.corner ||
		"";

	// do we have top elements?
	if (topleft || topright || topmiddle) {
		if ((topleft || topright) && !topmiddle) topmiddle = " ";
		const ruleWidth = options.width - topleft.length - topright.length; // account for corners
		const rule = topmiddle.repeat(Math.ceil(ruleWidth / topmiddle.length)); // repeats the horizontal padder enough times to fit rule width
		const safeRule = rule.slice(0, ruleWidth); // only use what we need for the full size;

		// inject title into rule
		if (options.title) {
			// titles are offset from the edge character by 1 -- titles don't touch the edge by default
			// might make this an option later
			const offset = 1;
			let formattedTitle = options.title;

			// add padding to title -- might make this an option later
			if (options.style?.titleBorder) {
				const tLeftPadding = options.style.titleBorder?.left ? " " : "";
				const tRightPadding = options.style.titleBorder?.right ? " " : "";
				formattedTitle = `${color(
					options.style.titleBorder?.left || ""
				)}${tLeftPadding}${options.title}${tRightPadding}${color(
					options.style.titleBorder?.right || ""
				)}`;
			} else formattedTitle = ` ${options.title} `;

			// respect vertical alignment for titles
			//const titleWidth = formattedTitle.length;
			const safeTitleWidth = sizer(formattedTitle);
			let start = 0 + offset;
			if (options.style?.titleHAlign === PAD_SIDE.LEFT)
				start = ruleWidth - safeTitleWidth - offset;
			else if (options.style?.titleHAlign === PAD_SIDE.CENTER)
				start = Math.floor((ruleWidth - safeTitleWidth) / 2);
			const titled =
				color(safeRule.slice(0, start)) +
				formattedTitle +
				color(safeRule.slice(start + safeTitleWidth, ruleWidth));
			lines.push(`${color(topleft)}${titled}${color(topright)}`);

			// no title -- just a basic rule
		} else lines.push(`${color(topleft)}${safeRule}${color(topright)}`);

		// has a title but no box visual elements
	} else if (options.title) {
		lines.push(
			pad(
				{ string: options.title, width: options.width, sizer: sizer },
				options.style?.titleHAlign || PAD_SIDE.RIGHT
			)
		);
	}

	const addLine = (line) => {
		let formatted = line;
		if (
			options.style?.vertical ||
			options.style?.left ||
			options.style?.right
		) {
			const leftVert = options.style?.left || options.style?.vertical || "";
			const leftHPadding = leftVert ? options.style?.hPadding || 1 : 0;
			const left = leftVert + " ".repeat(leftHPadding);
			const rightVert = options.style?.right || options.style?.vertical || "";
			const rightHPadding = rightVert ? options.style?.hPadding || 1 : 0;
			const right = " ".repeat(rightHPadding) + rightVert;
			formatted = `${color(left)}${pad(
				{
					string: formatted,
					width: options.width - left.length - right.length,
					sizer: sizer
				},
				options.style?.hAlign || PAD_SIDE.RIGHT
			)}${color(right)}`;
		} else {
			const left = " ".repeat(options.style?.hPadding || 0);
			const right = left;
			formatted = `${color(left)}${pad(
				{
					string: formatted,
					width: options.width - left.length - right.length,
					sizer: sizer
				},
				options.style?.hAlign || PAD_SIDE.RIGHT
			)}${color(right)}`;
		}
		lines.push(formatted);
	};

	// construct content lines
	if (options.style?.vPadding)
		for (let i = 0; i < options.style.vPadding; i++) addLine("");
	for (const line of options.input) addLine(line);
	if (options.style?.vPadding)
		for (let i = 0; i < options.style.vPadding; i++) addLine("");

	// consolidate bottom elements
	let bottommiddle: string =
		options.style?.bottom?.middle || options.style?.horizontal || "";
	const bottomleft: string =
		options.style?.bottom?.left ||
		options.style?.bottom?.corner ||
		options.style?.corner ||
		"";
	const bottomright: string =
		options.style?.bottom?.right ||
		options.style?.bottom?.corner ||
		options.style?.corner ||
		"";

	// do we have any bottom elements?
	if (bottomleft || bottomright || bottommiddle) {
		if ((bottomleft || bottomright) && !bottommiddle) bottommiddle = " ";
		const ruleWidth = options.width - bottomleft.length - bottomright.length; // account for corners
		const rule = bottommiddle.repeat(
			Math.ceil(ruleWidth / bottommiddle.length)
		); // repeats the horizontal padder enough times to fit rule width
		const safeRule = rule.slice(0, ruleWidth); // only use what we need for the full size;
		lines.push(color(`${bottomleft}${safeRule}${bottomright}`));
	}

	return lines;
}

/**
 * Check if a partial string autocompletes to another string.
 * @param partial A short string.
 * @param target A longer string to compare against.
 * @returns {boolean} If the partial matches the target string, return true; otherwise return false.
 */
export function autocomplete(partial: string, target: string): boolean {
	if (partial.length > target.length) return false;
	if (partial.toLowerCase() !== target.toLowerCase().slice(0, partial.length))
		return false;
	return true;
}

/**
 * Match a set of words to another set of words.
 * @param needle A set of words.
 * @param haystack A set of words to compare against.
 * @returns {boolean} If all of the words in the needle words have a match in the haystack, return true; otherwise return false.
 */
export function matchKeywords(needle: string, haystack: string) {
	const needleSplit = needle.split(/\s+/g);
	const haystackSplit = haystack.split(/\s+/g);
	for (const _needle of needleSplit) {
		let consumed = false;
		for (const _haystack of haystackSplit) {
			if (autocomplete(_needle, _haystack)) {
				consumed = true;
				break;
			}
		}

		if (!consumed) return false;
	}

	return true;
}
