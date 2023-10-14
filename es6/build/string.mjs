export var PAD_SIDE;
(function (PAD_SIDE) {
    /** Pads to the left. */
    PAD_SIDE[PAD_SIDE["LEFT"] = 1] = "LEFT";
    /** Pads to the right. */
    PAD_SIDE[PAD_SIDE["RIGHT"] = 2] = "RIGHT";
    /** Pads to the left and right. */
    PAD_SIDE[PAD_SIDE["CENTER"] = 3] = "CENTER";
})(PAD_SIDE || (PAD_SIDE = {}));
/**
 * Some generic boxes I invented due to my ingenuity.
 */
export const BOX_STYLES = {
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
 * Removes terminal color codes from length.
 * @param str The string to check.
 * @returns {number} The length of the string minus terminal color escapes.
 */
export function termSizer(str) {
    const rule = /(\u001b\[.*?m)/g;
    const result = str.match(rule);
    if (!result)
        return str.length;
    return str.length - result.reduce((a, b) => a + b.length, 0);
}
/**
 * Get the length of a string.
 * @param str The string to check.
 * @returns {number} The length of the string.
 */
export function defaultSizer(str) {
    return str.length;
}
/**
 * Pad a string to the given size.
 * @param options {PadOptions} The padding options.
 * @param side {PAD_SIDE} The side to add padding to.
 * @returns {string} The padded string.
 */
export function pad(options, side) {
    if (side === PAD_SIDE.LEFT)
        return padLeft(options);
    if (side === PAD_SIDE.CENTER)
        return padCenter(options);
    // defaults to padding the right side
    return padRight(options);
}
/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export function padLeft(options) {
    const padder = options.padder || " "; // default to space
    const sizer = options.sizer || defaultSizer; // default to string length
    const csize = sizer(options.string);
    const psize = options.width - csize;
    if (psize < 1)
        return options.string;
    let pad = padder.repeat(Math.ceil(psize / sizer(padder)));
    if (sizer(pad) > psize)
        pad = pad.slice(0, psize);
    if (options.color)
        pad = options.color(pad);
    return `${pad}${options.string}`;
}
/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export function padRight(options) {
    const padder = options.padder || " "; // default to space
    const sizer = options.sizer || defaultSizer; // default to string length
    const csize = sizer(options.string);
    const psize = options.width - csize;
    if (psize < 1)
        return options.string;
    let pad = padder.repeat(Math.ceil(psize / sizer(padder)));
    if (sizer(pad) > psize)
        pad = pad.slice(0, psize);
    if (options.color)
        pad = options.color(pad);
    return `${options.string}${pad}`;
}
/**
 * Pad a string to the given size on the right.
 * @param options {PadOptions} The padding options.
 * @returns {string} The padded string.
 */
export function padCenter(options) {
    const padder = options.padder || " "; // default to space
    const sizer = options.sizer || defaultSizer; // default to string length
    const csize = sizer(options.string);
    const psize = options.width - csize;
    if (psize < 1)
        return options.string;
    const tpad = padder.repeat(Math.ceil(options.width / sizer(padder)));
    const lsize = psize % 2 ? Math.floor(psize / 2) : psize / 2;
    const rsize = psize % 2 ? Math.floor(psize / 2) + 1 : psize / 2;
    let lpad = tpad.slice(0, lsize); // this is why you should avoid using colors in padders and stick to color option
    let rpad = tpad.slice(lsize + options.string.length, lsize + options.string.length + rsize);
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
export function wrap(string, size) {
    const lines = [];
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
        }
        else {
            lines.push(string.slice(last, breakpoint - 1) + "-");
            last = breakpoint - 1;
        }
        cursor = last + size;
    }
    lines.push(string.slice(last));
    return lines;
}
/**
 * Generates a contained box of text.
 * @param options The options for the box.
 * @returns {string[]} The lines of the box in an array.
 */
export function box(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
    const sizer = options.sizer || defaultSizer; // default to string length
    const color = options.color || ((str) => str);
    const lines = [];
    // consolidate top elements
    let topmiddle = ((_b = (_a = options.style) === null || _a === void 0 ? void 0 : _a.top) === null || _b === void 0 ? void 0 : _b.middle) || ((_c = options.style) === null || _c === void 0 ? void 0 : _c.horizontal) || "";
    const topleft = ((_e = (_d = options.style) === null || _d === void 0 ? void 0 : _d.top) === null || _e === void 0 ? void 0 : _e.left) ||
        ((_g = (_f = options.style) === null || _f === void 0 ? void 0 : _f.top) === null || _g === void 0 ? void 0 : _g.corner) ||
        ((_h = options.style) === null || _h === void 0 ? void 0 : _h.corner) ||
        "";
    const topright = ((_k = (_j = options.style) === null || _j === void 0 ? void 0 : _j.top) === null || _k === void 0 ? void 0 : _k.right) ||
        ((_m = (_l = options.style) === null || _l === void 0 ? void 0 : _l.top) === null || _m === void 0 ? void 0 : _m.corner) ||
        ((_o = options.style) === null || _o === void 0 ? void 0 : _o.corner) ||
        "";
    // do we have top elements?
    if (topleft || topright || topmiddle) {
        if ((topleft || topright) && !topmiddle)
            topmiddle = " ";
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
            if ((_p = options.style) === null || _p === void 0 ? void 0 : _p.titleBorder) {
                const tLeftPadding = ((_q = options.style.titleBorder) === null || _q === void 0 ? void 0 : _q.left) ? " " : "";
                const tRightPadding = ((_r = options.style.titleBorder) === null || _r === void 0 ? void 0 : _r.right) ? " " : "";
                formattedTitle = `${color(((_s = options.style.titleBorder) === null || _s === void 0 ? void 0 : _s.left) || "")}${tLeftPadding}${options.title}${tRightPadding}${color(((_t = options.style.titleBorder) === null || _t === void 0 ? void 0 : _t.right) || "")}`;
            }
            else
                formattedTitle = ` ${options.title} `;
            // respect vertical alignment for titles
            //const titleWidth = formattedTitle.length;
            const safeTitleWidth = sizer(formattedTitle);
            let start = 0 + offset;
            if (((_u = options.style) === null || _u === void 0 ? void 0 : _u.titleHAlign) === PAD_SIDE.LEFT)
                start = ruleWidth - safeTitleWidth - offset;
            else if (((_v = options.style) === null || _v === void 0 ? void 0 : _v.titleHAlign) === PAD_SIDE.CENTER)
                start = Math.floor((ruleWidth - safeTitleWidth) / 2);
            const titled = color(safeRule.slice(0, start)) +
                formattedTitle +
                color(safeRule.slice(start + safeTitleWidth, ruleWidth));
            lines.push(`${color(topleft)}${titled}${color(topright)}`);
            // no title -- just a basic rule
        }
        else
            lines.push(`${color(topleft)}${safeRule}${color(topright)}`);
        // has a title but no box visual elements
    }
    else if (options.title) {
        lines.push(pad({ string: options.title, width: options.width, sizer: sizer }, ((_w = options.style) === null || _w === void 0 ? void 0 : _w.titleHAlign) || PAD_SIDE.RIGHT));
    }
    const addLine = (line) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let formatted = line;
        if (((_a = options.style) === null || _a === void 0 ? void 0 : _a.vertical) ||
            ((_b = options.style) === null || _b === void 0 ? void 0 : _b.left) ||
            ((_c = options.style) === null || _c === void 0 ? void 0 : _c.right)) {
            const leftVert = ((_d = options.style) === null || _d === void 0 ? void 0 : _d.left) || ((_e = options.style) === null || _e === void 0 ? void 0 : _e.vertical) || "";
            const leftHPadding = leftVert ? ((_f = options.style) === null || _f === void 0 ? void 0 : _f.hPadding) || 1 : 0;
            const left = leftVert + " ".repeat(leftHPadding);
            const rightVert = ((_g = options.style) === null || _g === void 0 ? void 0 : _g.right) || ((_h = options.style) === null || _h === void 0 ? void 0 : _h.vertical) || "";
            const rightHPadding = rightVert ? ((_j = options.style) === null || _j === void 0 ? void 0 : _j.hPadding) || 1 : 0;
            const right = " ".repeat(rightHPadding) + rightVert;
            formatted = `${color(left)}${pad({
                string: formatted,
                width: options.width - left.length - right.length,
                sizer: sizer
            }, ((_k = options.style) === null || _k === void 0 ? void 0 : _k.hAlign) || PAD_SIDE.RIGHT)}${color(right)}`;
        }
        else {
            const left = " ".repeat(((_l = options.style) === null || _l === void 0 ? void 0 : _l.hPadding) || 0);
            const right = left;
            formatted = `${color(left)}${pad({
                string: formatted,
                width: options.width - left.length - right.length,
                sizer: sizer
            }, ((_m = options.style) === null || _m === void 0 ? void 0 : _m.hAlign) || PAD_SIDE.RIGHT)}${color(right)}`;
        }
        lines.push(formatted);
    };
    // construct content lines
    if ((_x = options.style) === null || _x === void 0 ? void 0 : _x.vPadding)
        for (let i = 0; i < options.style.vPadding; i++)
            addLine("");
    for (const line of options.input)
        addLine(line);
    if ((_y = options.style) === null || _y === void 0 ? void 0 : _y.vPadding)
        for (let i = 0; i < options.style.vPadding; i++)
            addLine("");
    // consolidate bottom elements
    let bottommiddle = ((_0 = (_z = options.style) === null || _z === void 0 ? void 0 : _z.bottom) === null || _0 === void 0 ? void 0 : _0.middle) || ((_1 = options.style) === null || _1 === void 0 ? void 0 : _1.horizontal) || "";
    const bottomleft = ((_3 = (_2 = options.style) === null || _2 === void 0 ? void 0 : _2.bottom) === null || _3 === void 0 ? void 0 : _3.left) ||
        ((_5 = (_4 = options.style) === null || _4 === void 0 ? void 0 : _4.bottom) === null || _5 === void 0 ? void 0 : _5.corner) ||
        ((_6 = options.style) === null || _6 === void 0 ? void 0 : _6.corner) ||
        "";
    const bottomright = ((_8 = (_7 = options.style) === null || _7 === void 0 ? void 0 : _7.bottom) === null || _8 === void 0 ? void 0 : _8.right) ||
        ((_10 = (_9 = options.style) === null || _9 === void 0 ? void 0 : _9.bottom) === null || _10 === void 0 ? void 0 : _10.corner) ||
        ((_11 = options.style) === null || _11 === void 0 ? void 0 : _11.corner) ||
        "";
    // do we have any bottom elements?
    if (bottomleft || bottomright || bottommiddle) {
        if ((bottomleft || bottomright) && !bottommiddle)
            bottommiddle = " ";
        const ruleWidth = options.width - bottomleft.length - bottomright.length; // account for corners
        const rule = bottommiddle.repeat(Math.ceil(ruleWidth / bottommiddle.length)); // repeats the horizontal padder enough times to fit rule width
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
export function autocomplete(partial, target) {
    if (partial.length > target.length)
        return false;
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
export function matchKeywords(needle, haystack) {
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
        if (!consumed)
            return false;
    }
    return true;
}
