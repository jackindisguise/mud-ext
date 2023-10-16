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
	sizer?: Sizer;

	/** A custom function for adding color codes (or any non-rendered element) to the padding. */
	color?: (str: string) => string;
}

/** Describes methods of sizing strings with different types of unrendered data. */
export interface Sizer {
	/** The character used to indicate the beginning of unrendered data. */
	open?: string;

	/** The character used to indicate the end of unrendered data. */
	close?: string;

	/** A function that returns only the rendered size of the given string. */
	size: (str: string) => number;
}

/** Describes how to size strings with terminal colors. */
export const TERM_SIZER: Sizer = {
	open: "\u001b",
	close: "m",
	size: (str: string) => {
		const rule = /(\u001b.*?m)/g;
		const result = str.match(rule);
		if (!result) return str.length;
		return str.length - result.reduce((a, b) => a + b.length, 0);
	}
};

/** Describes how to size strings with HTML elements colors. */
export const HTML_SIZER: Sizer = {
	open: "<",
	close: ">",
	size: (str: string) => {
		const rule = /(<.*?>)/g;
		const result = str.match(rule);
		if (!result) return str.length;
		return str.length - result.reduce((a, b) => a + b.length, 0);
	}
};

/** A default sizer that respects no unrendered characters. */
export const DEFAULT_SIZER: Sizer = {
	size: (str: string) => str.length
};

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
	const sizer = options.sizer || DEFAULT_SIZER; // default to string length
	const csize = sizer.size(options.string);
	const psize = options.width - csize;
	if (psize < 1) return options.string;
	let pad = padder.repeat(Math.ceil(psize / sizer.size(padder)));
	if (sizer.size(pad) > psize) pad = pad.slice(0, psize);
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
	const sizer = options.sizer || DEFAULT_SIZER; // default to string length
	const csize = sizer.size(options.string);
	const psize = options.width - csize;
	if (psize < 1) return options.string;
	let pad = padder.repeat(Math.ceil(psize / sizer.size(padder)));
	if (sizer.size(pad) > psize) pad = pad.slice(0, psize);
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
	const sizer = options.sizer || DEFAULT_SIZER; // default to string length
	const csize = sizer.size(options.string);
	const psize = options.width - csize;
	if (psize < 1) return options.string;
	const tpad = padder.repeat(Math.ceil(options.width / sizer.size(padder)));
	const lsize = psize % 2 ? Math.floor(psize / 2) : psize / 2;
	const rsize = psize % 2 ? Math.floor(psize / 2) + 1 : psize / 2;
	let lpad = tpad.slice(0, lsize); // this is why you should avoid using colors in padders and stick to color option
	let rpad = tpad.slice(lsize + csize, lsize + csize + rsize);
	if (options.color) {
		lpad = options.color(lpad);
		rpad = options.color(lpad);
	}
	return `${lpad}${options.string}${rpad}`;
}

/** Options for wrapping a string. */
interface WrapOptions {
	/** The string to be wrapped. */
	string: string;

	/** The desired width of each line. */
	width: number;

	/** Describe how to respect unrendered characters. */
	sizer?: Sizer;
}

/**
 * Wraps a string to a given size.
 * @param options {WrapOptions} The options for this wrap.
 * @returns {string[]} The lines of the wrapped string in an array.
 */
export function wrap(options: WrapOptions): string[] {
	const sizer = options.sizer || DEFAULT_SIZER;
	const lines: string[] = [];
	let last = 0;
	let cursor = options.width;
	while (cursor < options.string.length) {
		// accomodate non-rendering elements by adding extra width to this line
		// (expand cursor)
		let unrendered = 0;
		if (sizer.open) {
			for (let i = last; i < cursor; i++) {
				if (options.string[i] === sizer.open) {
					do {
						cursor++;
						unrendered++;
					} while (options.string[i++] !== sizer.close);
				}
			}
		}

		// if the breakpoint character is not rendered, skip as many unrendered characters as we can
		if (sizer.open) {
			while (options.string[cursor] === sizer.open) {
				while (
					cursor < options.string.length &&
					options.string[cursor] !== sizer.close
				) {
					cursor++;
					unrendered++;
				}
			}
		}

		// calculate the breakpoint of the line
		let breakpoint = cursor;
		if (breakpoint >= options.string.length) break;

		const mid = (cursor + unrendered + last) / 2; // search halfway between last point and current point for whitespace
		for (let i = cursor; i >= mid; i--) {
			// search for nearby whitespace
			if ([" ", "\r", "\n", "\t"].includes(options.string[i])) {
				breakpoint = i;
				break;
			}
		}

		// if the breakpoint is whitespace, skip over it
		if ([" ", "\r", "\n", "\t"].includes(options.string[breakpoint])) {
			lines.push(options.string.slice(last, breakpoint));
			last = breakpoint + 1;

			// if it's not whitespace, add a hypen to break the string and start the next line at this point
		} else {
			lines.push(options.string.slice(last, breakpoint - 1) + "-");
			last = breakpoint - 1;
		}
		cursor = Math.min(last + options.width, options.string.length);
	}

	if (last < cursor) lines.push(options.string.slice(last));
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
	sizer?: Sizer;
	color?: (str: string) => string;
}

/**
 * Generates a contained box of text.
 * @param options The options for the box.
 * @returns {string[]} The lines of the box in an array.
 */
export function box(options: BoxOptions): string[] {
	const sizer = options.sizer || DEFAULT_SIZER; // default to string length
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
			const safeTitleWidth = sizer.size(formattedTitle);
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

	const addLine = (line: string) => {
		if (
			options.style?.vertical ||
			options.style?.left ||
			options.style?.right
		) {
			const leftVert = options.style?.left || options.style?.vertical || "";
			const leftHPadding = leftVert ? options.style?.hPadding || 1 : 0;
			const left = color(leftVert) + " ".repeat(leftHPadding);
			const rightVert = options.style?.right || options.style?.vertical || "";
			const rightHPadding = rightVert ? options.style?.hPadding || 1 : 0;
			const right = " ".repeat(rightHPadding) + color(rightVert);
			const wrapped: string[] = wrap({
				string: line,
				width: options.width - sizer.size(left) - sizer.size(right),
				sizer: sizer
			});
			for (const _line of wrapped)
				lines.push(
					`${left}${pad(
						{
							string: _line,
							width: options.width - sizer.size(left) - sizer.size(right),
							sizer: sizer
						},
						options.style?.hAlign || PAD_SIDE.RIGHT
					)}${right}`
				);
		} else {
			const left = " ".repeat(options.style?.hPadding || 0);
			const right = left;
			const wrapped: string[] = wrap({
				string: line,
				width: options.width - sizer.size(left) - sizer.size(right),
				sizer: sizer
			});
			for (const _line of wrapped)
				lines.push(
					`${left}${pad(
						{
							string: _line,
							width: options.width - left.length - right.length,
							sizer: sizer
						},
						options.style?.hAlign || PAD_SIDE.RIGHT
					)}${right}`
				);
		}
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
