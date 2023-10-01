export declare enum PAD_SIDE {
    /** Pads to the left. */
    LEFT = 1,
    /** Pads to the right. */
    RIGHT = 2,
    /** Pads to the left and right. */
    CENTER = 3
}
export interface BoxStyleTitleBorder {
    left?: string;
    right?: string;
}
export interface BoxStyleHorizontalEdge {
    left?: string;
    right?: string;
    corner?: string;
}
export interface BoxStyle {
    horizontal?: string;
    vertical?: string;
    corner?: string;
    titleBorder?: BoxStyleTitleBorder;
    top?: BoxStyleHorizontalEdge;
    bottom?: BoxStyleHorizontalEdge;
    hAlign?: PAD_SIDE;
    titleHAlign?: PAD_SIDE;
}
export declare const BOX_STYLE: {
    [key: string]: BoxStyle;
};
export declare function pad(string: string, size: number, side?: PAD_SIDE, padder?: string): string;
export declare function padLeft(string: string, size: number, padder?: string): string;
export declare function padRight(string: string, size: number, padder?: string): string;
export declare function padCenter(string: string, size: number, padder?: string): string;
export declare function wrap(string: string, size: number): string[];
export interface BoxOptions {
    input: string[];
    width: number;
    title?: string;
    style?: BoxStyle;
}
export declare function box(options: BoxOptions): string[];
