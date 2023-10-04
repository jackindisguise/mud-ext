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
    exports.box = exports.wrap = exports.padCenter = exports.padRight = exports.padLeft = exports.pad = exports.BOX_STYLE = exports.PAD_SIDE = void 0;
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
    exports.BOX_STYLE = {
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
            vertical: "O",
        }
    };
    /**
     * Pad a string to the given size.
     * @param string The string to pad.
     * @param size The size the string should be.
     * @param side Which side to add padding to.
     * @param padder The string to use as a padder.
     * @returns {string} The padded string.
     */
    function pad(string, size, side, padder) {
        if (side === PAD_SIDE.LEFT)
            return padLeft(string, size, padder);
        if (side === PAD_SIDE.CENTER)
            return padCenter(string, size, padder);
        // defaults to padding the right side
        return padRight(string, size, padder);
    }
    exports.pad = pad;
    /**
     * Pad a string to the given size on the left.
     * @param string The string to pad.
     * @param size The size the string should be.
     * @param padder The string to use as a padder.
     * @returns {string} The padded string.
     */
    function padLeft(string, size, padder = " ") {
        let csize = string.length;
        let psize = size - csize;
        if (psize < 1)
            return string;
        let pad = padder.repeat(Math.ceil(psize / padder.length));
        if (pad.length > psize)
            pad = pad.slice(0, psize);
        return `${pad}${string}`;
    }
    exports.padLeft = padLeft;
    /**
     * Pad a string to the given size on the right.
     * @param string The string to pad.
     * @param size The size the string should be.
     * @param padder The string to use as a padder.
     * @returns {string} The padded string.
     */
    function padRight(string, size, padder = " ") {
        let csize = string.length;
        let psize = size - csize;
        if (psize < 1)
            return string;
        let pad = padder.repeat(Math.ceil(psize / padder.length));
        if (pad.length > psize)
            pad = pad.slice(0, psize);
        return `${string}${pad}`;
    }
    exports.padRight = padRight;
    /**
     * Pad a string to the given size on the left and right.
     * If the padding is ultimately uneven, the extra padding is added to the right side.
     * @param string The string to pad.
     * @param size The size the string should be.
     * @param padder The string to use as a padder.
     * @returns {string} The padded string.
     */
    function padCenter(string, size, padder = " ") {
        let ssize = string.length;
        let psize = size - ssize;
        if (psize < 1)
            return string;
        /*	let lsize = psize%2?Math.floor(psize/2):psize/2;
            let rsize = psize%2?Math.floor(psize/2)+1:psize/2;
            let lpad = padder.repeat(Math.ceil(lsize/padder.length));
            if(lpad.length>lsize) lpad = lpad.slice(0,lsize);
            let rpad = padder.repeat(Math.ceil(rsize/padder.length));
            if(rpad.length>rsize) rpad = rpad.slice(0,rsize);*/
        let tpad = padder.repeat(Math.ceil(size / padder.length));
        let lsize = psize % 2 ? Math.floor(psize / 2) : psize / 2;
        let rsize = psize % 2 ? Math.floor(psize / 2) + 1 : psize / 2;
        let lpad = tpad.slice(0, lsize);
        let rpad = tpad.slice(lsize + string.length, lsize + string.length + rsize);
        return `${lpad}${string}${rpad}`;
    }
    exports.padCenter = padCenter;
    /**
     * Wraps a string to a given size.
     * @param string The string to wrap.
     * @param size The maximum width of each line.
     * @returns {string[]} The lines of the wrapped string in an array.
     */
    function wrap(string, size) {
        let lines = [];
        let last = 0;
        let cursor = size;
        while (cursor < string.length) {
            let breakpoint = cursor; // assume current point is breakpoint
            let mid = (cursor + last) / 2; // search halfway between last point and current point for whitespace
            for (let i = cursor; i >= mid; i--) { // search for nearby whitespace
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
    exports.wrap = wrap;
    /**
     * Generates a contained box of text.
     * @param options The options for the box.
     * @returns {string[]} The lines of the box in an array.
     */
    function box(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
        let lines = [];
        // construct top of box
        let top;
        if (options.title) {
            top = options.title;
            if ((_a = options.style) === null || _a === void 0 ? void 0 : _a.titleBorder)
                top = `${options.style.titleBorder.left} ${top} ${options.style.titleBorder.right}`;
        }
        // generate top
        if (((_c = (_b = options.style) === null || _b === void 0 ? void 0 : _b.top) === null || _c === void 0 ? void 0 : _c.middle) || ((_d = options.style) === null || _d === void 0 ? void 0 : _d.horizontal)) {
            if (top && !((_e = options.style) === null || _e === void 0 ? void 0 : _e.titleBorder))
                top = ` ${top} `; // add padding between title and edge characters
            let tl, tr;
            const horizontal = ((_g = (_f = options.style) === null || _f === void 0 ? void 0 : _f.top) === null || _g === void 0 ? void 0 : _g.middle) || ((_h = options.style) === null || _h === void 0 ? void 0 : _h.horizontal) || ""; // "" should never happen but oh well
            const tlCorner = ((_k = (_j = options.style) === null || _j === void 0 ? void 0 : _j.top) === null || _k === void 0 ? void 0 : _k.left) || ((_m = (_l = options.style) === null || _l === void 0 ? void 0 : _l.top) === null || _m === void 0 ? void 0 : _m.corner) || ((_o = options.style) === null || _o === void 0 ? void 0 : _o.corner);
            if (tlCorner) {
                const tlPad = horizontal;
                tl = tlCorner + tlPad;
            }
            else
                tl = "";
            const trCorner = ((_q = (_p = options.style) === null || _p === void 0 ? void 0 : _p.top) === null || _q === void 0 ? void 0 : _q.right) || ((_s = (_r = options.style) === null || _r === void 0 ? void 0 : _r.top) === null || _s === void 0 ? void 0 : _s.corner) || ((_t = options.style) === null || _t === void 0 ? void 0 : _t.corner);
            if (trCorner) {
                const trPad = horizontal;
                tr = trPad + trCorner;
            }
            else
                tr = "";
            top = `${tl}${pad(top || "", options.width - tl.length - tr.length, ((_u = options.style) === null || _u === void 0 ? void 0 : _u.titleHAlign) || PAD_SIDE.RIGHT, ((_w = (_v = options.style) === null || _v === void 0 ? void 0 : _v.top) === null || _w === void 0 ? void 0 : _w.middle) || ((_x = options.style) === null || _x === void 0 ? void 0 : _x.horizontal))}${tr}`;
        }
        else if (top)
            top = pad(top, options.width, ((_y = options.style) === null || _y === void 0 ? void 0 : _y.titleHAlign) || PAD_SIDE.RIGHT);
        // add top if it's been generated
        if (top)
            lines.push(top);
        const addLine = (line) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            let formatted = line;
            if (((_a = options.style) === null || _a === void 0 ? void 0 : _a.vertical) || ((_b = options.style) === null || _b === void 0 ? void 0 : _b.left) || ((_c = options.style) === null || _c === void 0 ? void 0 : _c.right)) {
                const left = `${((_d = options.style) === null || _d === void 0 ? void 0 : _d.left) || ((_e = options.style) === null || _e === void 0 ? void 0 : _e.vertical) || ""}${" ".repeat(((_f = options.style) === null || _f === void 0 ? void 0 : _f.hPadding) || 1)}`;
                const right = `${" ".repeat(((_g = options.style) === null || _g === void 0 ? void 0 : _g.hPadding) || 1)}${((_h = options.style) === null || _h === void 0 ? void 0 : _h.right) || ((_j = options.style) === null || _j === void 0 ? void 0 : _j.vertical) || ""}`;
                formatted = `${left}${pad(formatted, options.width - left.length - right.length, ((_k = options.style) === null || _k === void 0 ? void 0 : _k.hAlign) || PAD_SIDE.RIGHT)}${right}`;
            }
            else {
                const left = `${" ".repeat(((_l = options.style) === null || _l === void 0 ? void 0 : _l.hPadding) || 1)}`;
                const right = left;
                formatted = `${left}${pad(formatted, options.width - left.length - right.length, ((_m = options.style) === null || _m === void 0 ? void 0 : _m.hAlign) || PAD_SIDE.RIGHT)}${right}`;
            }
            lines.push(formatted);
        };
        // construct content lines
        if ((_z = options.style) === null || _z === void 0 ? void 0 : _z.vPadding)
            for (let i = 0; i < options.style.vPadding; i++)
                addLine("");
        for (let line of options.input)
            addLine(line);
        if ((_0 = options.style) === null || _0 === void 0 ? void 0 : _0.vPadding)
            for (let i = 0; i < options.style.vPadding; i++)
                addLine("");
        // generate bottom
        if (((_2 = (_1 = options.style) === null || _1 === void 0 ? void 0 : _1.bottom) === null || _2 === void 0 ? void 0 : _2.middle) || ((_3 = options.style) === null || _3 === void 0 ? void 0 : _3.horizontal)) {
            let bl, br;
            const horizontal = ((_5 = (_4 = options.style) === null || _4 === void 0 ? void 0 : _4.bottom) === null || _5 === void 0 ? void 0 : _5.middle) || ((_6 = options.style) === null || _6 === void 0 ? void 0 : _6.horizontal) || ""; // "" should never happen but oh well
            const blCorner = ((_8 = (_7 = options.style) === null || _7 === void 0 ? void 0 : _7.bottom) === null || _8 === void 0 ? void 0 : _8.left) || ((_10 = (_9 = options.style) === null || _9 === void 0 ? void 0 : _9.bottom) === null || _10 === void 0 ? void 0 : _10.corner) || ((_11 = options.style) === null || _11 === void 0 ? void 0 : _11.corner);
            if (blCorner) {
                const blPad = horizontal;
                bl = blCorner + blPad;
            }
            else
                bl = "";
            const brCorner = ((_13 = (_12 = options.style) === null || _12 === void 0 ? void 0 : _12.bottom) === null || _13 === void 0 ? void 0 : _13.right) || ((_15 = (_14 = options.style) === null || _14 === void 0 ? void 0 : _14.bottom) === null || _15 === void 0 ? void 0 : _15.corner) || ((_16 = options.style) === null || _16 === void 0 ? void 0 : _16.corner);
            if (brCorner) {
                const brPad = horizontal;
                br = brPad + brCorner;
            }
            else
                br = "";
            const bottom = `${bl}${padLeft("", options.width - bl.length - br.length, horizontal)}${br}`;
            lines.push(bottom);
        }
        return lines;
    }
    exports.box = box;
});
