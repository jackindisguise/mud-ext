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
export declare const TERM_SIZER: Sizer;
/** Describes how to size strings with HTML elements colors. */
export declare const HTML_SIZER: Sizer;
/** A default sizer that respects no unrendered characters. */
export declare const DEFAULT_SIZER: Sizer;
/**
 * A function that takes a string and produces a string.
 */
export type StringTransformer = (str: string) => string;
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
/**
 * Options for pad shortcut function.
 */
export interface PadWithSideOptions extends PadOptions {
    /** The side to add padding. */
    side: PAD_SIDE;
}
/**
 * Pad a string to the given size.
 * @param options {PadWithSideOptions} The padding options.
 * @returns {string} The padded string.
 */
export declare function pad(options: PadWithSideOptions): string;
/**
 * Pad a string to the given size.
 * @param string The string to pad.
 * @param width The desired width of the string.
 * @param padder The string to use as a padder.
 * @param sizer A custom function for determining the size of the provided string.
 * @param color A custom function for adding unrenderedcolor codes to the padding.
 */
export declare function pad(string: string, width: number, side: PAD_SIDE, padder?: string, sizer?: Sizer, color?: StringTransformer): any;
/**
 * Pad a string to the given size on the left.
 * @param options The padding options.
 * @returns The padded string.
 */
export declare function padLeft(options: PadOptions): string;
/**
 * Pad a string to the given width on the left.
 * @param string The string to pad.
 * @param width The target width of the padded string.
 * @param padder The padder to pad the string with.
 * @param sizer Handler for unrendered characters.
 * @returns The padded string.
 */
export declare function padLeft(string: string, width: number, padder?: string, sizer?: Sizer): string;
/**
 * Pad a string to the given size on the right.
 * @param options The padding options.
 * @returns The padded string.
 */
export declare function padRight(options: PadOptions): string;
/**
 * Pad a string to the given width on the right.
 * @param string The string to pad.
 * @param width The target width of the padded string.
 * @param padder The padder to pad the string with.
 * @param sizer Handler for unrendered characters.
 * @returns The padded string.
 */
export declare function padRight(string: string, width: number, padder?: string, sizer?: Sizer): string;
/**
/**
 * Pad a string to the given size on the left and right.
 * @param options The padding options.
 * @returns The padded string.
 */
export declare function padCenter(options: PadOptions): string;
/**
 * Pad a string to the given width on the right.
 * @param string The string to pad.
 * @param width The target width of the padded string.
 * @param padder The padder to pad the string with.
 * @param sizer Handler for unrendered characters.
 * @returns The padded string.
 */
export declare function padCenter(string: string, width: number, padder?: string, sizer?: Sizer, color?: StringTransformer): string;
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
 * @param string The string to be wrapped.
 * @param width The desired width of each line.
 * @param sizer Sizer for respecting unrendered characters.
 */
export declare function wrap(string: string, width: number, sizer?: Sizer): string[];
/**
 * Wraps a string to a given size.
 * @param options {WrapOptions} The options for this wrap.
 * @returns {string[]} The lines of the wrapped string in an array.
 */
export declare function wrap(options: WrapOptions): string[];
/**
 * Describes the details of the box.
 */
export interface BoxOptions {
    input: string[];
    width: number;
    title?: string;
    style?: BoxStyle;
    sizer?: Sizer;
    color?: StringTransformer;
}
/**
 * Generates a contained box of text.
 * @param options The options for the box.
 * @returns {string[]} The lines of the box in an array.
 */
export declare function box(options: BoxOptions): string[];
/**
 * Generates a contained box of text.
 * @param input An array of lines of text.
 * @param width The external width of the box.
 * @param title The title of the box.
 * @param style The box style.
 * @param sizer A sizer for handling unrendered characters in the input.
 * @param color A colorizer for the borders of the box.
 */
export declare function box(input: string[], width: number, title?: string, style?: BoxStyle, sizer?: Sizer, color?: StringTransformer): string[];
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
export {};
