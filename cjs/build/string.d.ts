export declare enum PAD_SIDE {
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
export declare const BOX_STYLES: {
    [key: string]: BoxStyle;
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
export declare function termSizer(str: string): number;
/**
 * Get the length of a string.
 * @param str The string to check.
 * @returns {number} The length of the string.
 */
export declare function defaultSizer(str: any): number;
/**
 * Pad a string to the given size.
 * @param options {PadOptions} The padding options.
 * @param side {PAD_SIDE} The side to add padding to.
 * @returns {string} The padded string.
 */
export declare function pad(options: PadOptions, side?: PAD_SIDE): string;
/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export declare function padLeft(options: PadOptions): string;
/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export declare function padRight(options: PadOptions): string;
/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export declare function padCenter(options: PadOptions): string;
/**
 * Wraps a string to a given size.
 * @param string The string to wrap.
 * @param size The maximum width of each line.
 * @returns {string[]} The lines of the wrapped string in an array.
 */
export declare function wrap(string: string, size: number): string[];
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
export declare function box(options: BoxOptions): string[];
/**
 * Check if a partial string autocompletes to another string.
 * @param partial A short string.
 * @param target A longer string to compare against.
 * @returns {boolean} If the partial matches the target string, return true; otherwise return false.
 */
export declare function autocomplete(partial: string, target: string): boolean;
/**
 * Match a set of words to another set of words.
 * @param needle A set of words.
 * @param haystack A set of words to compare against.
 * @returns {boolean} If all of the words in the needle words have a match in the haystack, return true; otherwise return false.
 */
export declare function matchKeywords(needle: string, haystack: string): boolean;
