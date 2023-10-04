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
export declare const BOX_STYLE: {
    [key: string]: BoxStyle;
};
/**
 * Pad a string to the given size.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param side Which side to add padding to.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export declare function pad(string: string, size: number, side?: PAD_SIDE, padder?: string): string;
/**
 * Pad a string to the given size on the left.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export declare function padLeft(string: string, size: number, padder?: string): string;
/**
 * Pad a string to the given size on the right.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export declare function padRight(string: string, size: number, padder?: string): string;
/**
 * Pad a string to the given size on the left and right.
 * If the padding is ultimately uneven, the extra padding is added to the right side.
 * @param string The string to pad.
 * @param size The size the string should be.
 * @param padder The string to use as a padder.
 * @returns {string} The padded string.
 */
export declare function padCenter(string: string, size: number, padder?: string): string;
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
}
/**
 * Generates a contained box of text.
 * @param options The options for the box.
 * @returns {string[]} The lines of the box in an array.
 */
export declare function box(options: BoxOptions): string[];
