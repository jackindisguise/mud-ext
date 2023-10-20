(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchKeywords = exports.autocomplete = exports.box = exports.wrap = exports.padCenter = exports.padRight = exports.padLeft = exports.pad = exports.DEFAULT_SIZER = exports.HTML_SIZER = exports.TERM_SIZER = exports.BOX_STYLES = exports.PAD_SIDE = void 0;
    var PAD_SIDE;
    (function (PAD_SIDE) {
        /** Pads to the left. */
        PAD_SIDE[PAD_SIDE["LEFT"] = 1] = "LEFT";
        /** Pads to the right. */
        PAD_SIDE[PAD_SIDE["RIGHT"] = 2] = "RIGHT";
        /** Pads to the left and right. */
        PAD_SIDE[PAD_SIDE["CENTER"] = 3] = "CENTER";
    })(PAD_SIDE || (exports.PAD_SIDE = PAD_SIDE = {}));
    /**
     * Some generic boxes I invented due to my ingenuity.
     */
    class BOX_STYLES {
    }
    exports.BOX_STYLES = BOX_STYLES;
    /** A plain box. */
    BOX_STYLES.PLAIN = {
        horizontal: "-",
        vertical: "|",
        corner: "+"
    };
    /** A rounded box. */
    BOX_STYLES.ROUNDED = {
        horizontal: "-",
        vertical: "|",
        top: {
            corner: "."
        },
        bottom: {
            corner: "'"
        }
    };
    /** A box made of Os */
    BOX_STYLES.O = {
        titleBorder: {
            left: "(",
            right: ")"
        },
        horizontal: "O",
        vertical: "O"
    };
    /** Describes how to size strings with terminal colors. */
    exports.TERM_SIZER = {
        open: "\u001b",
        close: "m",
        size: (str) => {
            const rule = /(\u001b.*?m)/g;
            const result = str.match(rule);
            if (!result)
                return str.length;
            return str.length - result.reduce((a, b) => a + b.length, 0);
        }
    };
    /** Describes how to size strings with HTML elements colors. */
    exports.HTML_SIZER = {
        open: "<",
        close: ">",
        size: (str) => {
            const rule = /(<.*?>)/g;
            const result = str.match(rule);
            if (!result)
                return str.length;
            return str.length - result.reduce((a, b) => a + b.length, 0);
        }
    };
    /** A default sizer that respects no unrendered characters. */
    exports.DEFAULT_SIZER = {
        size: (str) => str.length
    };
    function pad(options, width, side, padder, sizer, color) {
        if (typeof options === "string")
            return padWithOptions({
                string: options,
                width: width || 0,
                side: side || PAD_SIDE.RIGHT,
                padder: padder || " ",
                sizer: sizer || exports.DEFAULT_SIZER,
                color: color || undefined
            });
        return padWithOptions(options);
    }
    exports.pad = pad;
    /**
     * Handles pad calls uniformly with PadOptions as God intended.
     */
    function padWithOptions(options) {
        if (options.side === PAD_SIDE.LEFT)
            return padLeft(options);
        if (options.side === PAD_SIDE.CENTER)
            return padCenter(options);
        return padRight(options); // defaults to padding the right side
    }
    function padLeft(options, width, padder, sizer) {
        if (typeof options === "string")
            return padLeftWithOptions({
                string: options,
                width: width || 0,
                padder: padder || " ",
                sizer: sizer || exports.DEFAULT_SIZER
            });
        return padLeftWithOptions(options);
    }
    exports.padLeft = padLeft;
    function padLeftWithOptions(options) {
        const padder = options.padder || " "; // default to space
        const sizer = options.sizer || exports.DEFAULT_SIZER; // default to string length
        const csize = sizer.size(options.string);
        const psize = options.width - csize;
        if (psize < 1)
            return options.string;
        let pad = padder.repeat(Math.ceil(psize / sizer.size(padder)));
        if (sizer.size(pad) > psize)
            pad = pad.slice(0, psize);
        if (options.color)
            pad = options.color(pad);
        return `${pad}${options.string}`;
    }
    function padRight(options, width, padder, sizer) {
        if (typeof options === "string")
            return padRightWithOptions({
                string: options,
                width: width || 0,
                padder: padder || " ",
                sizer: sizer || exports.DEFAULT_SIZER
            });
        return padRightWithOptions(options);
    }
    exports.padRight = padRight;
    function padRightWithOptions(options) {
        const padder = options.padder || " "; // default to space
        const sizer = options.sizer || exports.DEFAULT_SIZER; // default to string length
        const csize = sizer.size(options.string);
        const psize = options.width - csize;
        if (psize < 1)
            return options.string;
        let pad = padder.repeat(Math.ceil(psize / sizer.size(padder)));
        if (sizer.size(pad) > psize)
            pad = pad.slice(0, psize);
        if (options.color)
            pad = options.color(pad);
        return `${options.string}${pad}`;
    }
    function padCenter(options, width, padder, sizer, color) {
        if (typeof options === "string")
            return padCenterWithOptions({
                string: options,
                width: width || 0,
                padder: padder || " ",
                sizer: sizer || exports.DEFAULT_SIZER,
                color: color || undefined
            });
        return padCenterWithOptions(options);
    }
    exports.padCenter = padCenter;
    function padCenterWithOptions(options) {
        const padder = options.padder || " "; // default to space
        const sizer = options.sizer || exports.DEFAULT_SIZER; // default to string length
        const csize = sizer.size(options.string);
        const psize = options.width - csize;
        if (psize < 1)
            return options.string;
        const tpad = padder.repeat(Math.ceil(options.width / sizer.size(padder)));
        const lsize = psize % 2 ? Math.floor(psize / 2) : psize / 2;
        const rsize = psize % 2 ? Math.floor(psize / 2) + 1 : psize / 2;
        let lpad = tpad.slice(0, lsize); // this is why you should avoid using colors in padders and stick to color option
        let rpad = tpad.slice(lsize + csize, lsize + csize + rsize);
        if (options.color) {
            lpad = lpad ? options.color(lpad) : "";
            rpad = rpad ? options.color(rpad) : "";
        }
        return `${lpad}${options.string}${rpad}`;
    }
    function wrap(options, width, sizer) {
        if (typeof options === "string")
            return wrapWithOptions({
                string: options,
                width: width || 0,
                sizer: sizer || exports.DEFAULT_SIZER
            });
        return wrapWithOptions(options);
    }
    exports.wrap = wrap;
    function wrapWithOptions(options) {
        const sizer = options.sizer || exports.DEFAULT_SIZER;
        const lines = [];
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
                    while (cursor < options.string.length &&
                        options.string[cursor] !== sizer.close) {
                        cursor++;
                        unrendered++;
                    }
                }
            }
            // calculate the breakpoint of the line
            let breakpoint = cursor;
            if (breakpoint >= options.string.length)
                break;
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
            }
            else {
                lines.push(options.string.slice(last, breakpoint - 1) + "-");
                last = breakpoint - 1;
            }
            cursor = Math.min(last + options.width, options.string.length);
        }
        if (last < cursor)
            lines.push(options.string.slice(last));
        return lines;
    }
    function box(options, width, title, style, sizer, color) {
        if (Array.isArray(options))
            return boxWithOptions({
                input: options,
                width: width || 0,
                title: title || undefined,
                style: style || undefined,
                sizer: sizer || undefined,
                color: color || undefined
            });
        return boxWithOptions(options);
    }
    exports.box = box;
    function boxWithOptions(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
        const sizer = options.sizer || exports.DEFAULT_SIZER; // default to string length
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
                    formattedTitle = `${((_s = options.style.titleBorder) === null || _s === void 0 ? void 0 : _s.left)
                        ? color((_t = options.style.titleBorder) === null || _t === void 0 ? void 0 : _t.left)
                        : ""}${tLeftPadding}${options.title}${tRightPadding}${((_u = options.style.titleBorder) === null || _u === void 0 ? void 0 : _u.right)
                        ? color((_v = options.style.titleBorder) === null || _v === void 0 ? void 0 : _v.right)
                        : ""}`;
                }
                else
                    formattedTitle = ` ${options.title} `;
                // respect vertical alignment for titles
                //const titleWidth = formattedTitle.length;
                const safeTitleWidth = sizer.size(formattedTitle);
                let start = 0 + offset;
                if (((_w = options.style) === null || _w === void 0 ? void 0 : _w.titleHAlign) === PAD_SIDE.LEFT)
                    start = ruleWidth - safeTitleWidth - offset;
                else if (((_x = options.style) === null || _x === void 0 ? void 0 : _x.titleHAlign) === PAD_SIDE.CENTER)
                    start = Math.floor((ruleWidth - safeTitleWidth) / 2);
                const titled = (start > 0 ? color(safeRule.slice(0, start)) : "") +
                    formattedTitle +
                    (start + safeTitleWidth < ruleWidth
                        ? color(safeRule.slice(start + safeTitleWidth, ruleWidth))
                        : "");
                lines.push(`${topleft ? color(topleft) : ""}${titled}${topright ? color(topright) : ""}`);
                // no title -- just a basic rule
            }
            else
                lines.push(`${topleft ? color(topleft) : ""}${safeRule}${topright ? color(topright) : ""}`);
            // has a title but no box visual elements
        }
        else if (options.title) {
            lines.push(pad({
                string: options.title,
                width: options.width,
                side: ((_y = options.style) === null || _y === void 0 ? void 0 : _y.titleHAlign) || PAD_SIDE.RIGHT,
                sizer: sizer
            }));
        }
        const addLine = (line) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            if (((_a = options.style) === null || _a === void 0 ? void 0 : _a.vertical) ||
                ((_b = options.style) === null || _b === void 0 ? void 0 : _b.left) ||
                ((_c = options.style) === null || _c === void 0 ? void 0 : _c.right)) {
                const leftVert = ((_d = options.style) === null || _d === void 0 ? void 0 : _d.left) || ((_e = options.style) === null || _e === void 0 ? void 0 : _e.vertical) || "";
                const leftHPadding = leftVert ? ((_f = options.style) === null || _f === void 0 ? void 0 : _f.hPadding) || 1 : 0;
                const left = color(leftVert) + " ".repeat(leftHPadding);
                const rightVert = ((_g = options.style) === null || _g === void 0 ? void 0 : _g.right) || ((_h = options.style) === null || _h === void 0 ? void 0 : _h.vertical) || "";
                const rightHPadding = rightVert ? ((_j = options.style) === null || _j === void 0 ? void 0 : _j.hPadding) || 1 : 0;
                const right = " ".repeat(rightHPadding) + color(rightVert);
                const wrapped = wrap({
                    string: line,
                    width: options.width - sizer.size(left) - sizer.size(right),
                    sizer: sizer
                });
                for (const _line of wrapped)
                    lines.push(`${left}${pad({
                        string: _line,
                        width: options.width - sizer.size(left) - sizer.size(right),
                        side: ((_k = options.style) === null || _k === void 0 ? void 0 : _k.hAlign) || PAD_SIDE.RIGHT,
                        sizer: sizer
                    })}${right}`);
            }
            else {
                const left = " ".repeat(((_l = options.style) === null || _l === void 0 ? void 0 : _l.hPadding) || 0);
                const right = left;
                const wrapped = wrap({
                    string: line,
                    width: options.width - sizer.size(left) - sizer.size(right),
                    sizer: sizer
                });
                for (const _line of wrapped)
                    lines.push(`${left}${pad({
                        string: _line,
                        width: options.width - left.length - right.length,
                        side: ((_m = options.style) === null || _m === void 0 ? void 0 : _m.hAlign) || PAD_SIDE.RIGHT,
                        sizer: sizer
                    })}${right}`);
            }
        };
        // construct content lines
        if ((_z = options.style) === null || _z === void 0 ? void 0 : _z.vPadding)
            for (let i = 0; i < options.style.vPadding; i++)
                addLine("");
        for (const line of options.input)
            addLine(line);
        if ((_0 = options.style) === null || _0 === void 0 ? void 0 : _0.vPadding)
            for (let i = 0; i < options.style.vPadding; i++)
                addLine("");
        // consolidate bottom elements
        let bottommiddle = ((_2 = (_1 = options.style) === null || _1 === void 0 ? void 0 : _1.bottom) === null || _2 === void 0 ? void 0 : _2.middle) || ((_3 = options.style) === null || _3 === void 0 ? void 0 : _3.horizontal) || "";
        const bottomleft = ((_5 = (_4 = options.style) === null || _4 === void 0 ? void 0 : _4.bottom) === null || _5 === void 0 ? void 0 : _5.left) ||
            ((_7 = (_6 = options.style) === null || _6 === void 0 ? void 0 : _6.bottom) === null || _7 === void 0 ? void 0 : _7.corner) ||
            ((_8 = options.style) === null || _8 === void 0 ? void 0 : _8.corner) ||
            "";
        const bottomright = ((_10 = (_9 = options.style) === null || _9 === void 0 ? void 0 : _9.bottom) === null || _10 === void 0 ? void 0 : _10.right) ||
            ((_12 = (_11 = options.style) === null || _11 === void 0 ? void 0 : _11.bottom) === null || _12 === void 0 ? void 0 : _12.corner) ||
            ((_13 = options.style) === null || _13 === void 0 ? void 0 : _13.corner) ||
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
    function autocomplete(partial, target) {
        if (partial.length > target.length)
            return false;
        if (partial.toLowerCase() !== target.toLowerCase().slice(0, partial.length))
            return false;
        return true;
    }
    exports.autocomplete = autocomplete;
    /**
     * Match a set of words to another set of words.
     * @param needle A set of words.
     * @param haystack A set of words to compare against.
     * @returns {boolean} If all of the words in the needle words have a match in the haystack, return true; otherwise return false.
     */
    function matchKeywords(needle, haystack) {
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
    exports.matchKeywords = matchKeywords;
});
