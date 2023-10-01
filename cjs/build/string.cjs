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
    function pad(string, size, side, padder) {
        if (side === PAD_SIDE.LEFT)
            return padLeft(string, size, padder);
        if (side === PAD_SIDE.CENTER)
            return padCenter(string, size, padder);
        // defaults to padding the right side
        return padRight(string, size, padder);
    }
    exports.pad = pad;
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
    function padCenter(string, size, padder = " ") {
        let ssize = string.length;
        let psize = size - ssize;
        if (psize < 1)
            return string;
        let lsize = psize % 2 ? Math.floor(psize / 2) : psize / 2;
        let rsize = psize % 2 ? Math.floor(psize / 2) + 1 : psize / 2;
        let lpad = padder.repeat(Math.ceil(lsize / padder.length));
        if (lpad.length > lsize)
            lpad = lpad.slice(0, lsize);
        let rpad = padder.repeat(Math.ceil(rsize / padder.length));
        if (rpad.length > rsize)
            rpad = rpad.slice(0, rsize);
        return `${lpad}${string}${rpad}`;
    }
    exports.padCenter = padCenter;
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
    function box(options) {
        var _a, _b, _c, _d, _e, _f, _g;
        let lines = [];
        // construct top of box
        let top;
        if (options.title) {
            top = ` ${options.title} `;
            if ((_a = options.style) === null || _a === void 0 ? void 0 : _a.titleBorder)
                top = `${options.style.titleBorder.left}${top}${options.style.titleBorder.right}`;
        }
        else
            top = ""; // initialize to empty string
        if ((_b = options.style) === null || _b === void 0 ? void 0 : _b.horizontal) {
            if ((_c = options.style) === null || _c === void 0 ? void 0 : _c.top) {
                const tl = (options.style.top.right || options.style.top.corner || options.style.corner || options.style.horizontal) + options.style.horizontal;
                const tr = options.style.horizontal + (options.style.top.right || options.style.top.corner || options.style.corner || options.style.horizontal);
                top = `${tl}${pad(top, options.width - tl.length - tr.length, options.style.titleHAlign || PAD_SIDE.RIGHT, options.style.horizontal)}${tr}`;
            }
            else if (options.style.corner) {
                const tl = options.style.corner + options.style.horizontal;
                const tr = options.style.horizontal + options.style.corner;
                top = `${tl}${pad(top, options.width - tl.length - tr.length, options.style.titleHAlign || PAD_SIDE.RIGHT, options.style.horizontal)}${tr}`;
            }
            else
                top = `${options.style.horizontal.repeat(2)}${pad(top, options.width - (options.style.horizontal.length * 4), options.style.titleHAlign || PAD_SIDE.RIGHT, options.style.horizontal)}${options.style.horizontal.repeat(2)}`;
        }
        else
            top = pad(top, options.width, ((_d = options.style) === null || _d === void 0 ? void 0 : _d.titleHAlign) || PAD_SIDE.RIGHT);
        lines.push(top);
        // construct content lines
        for (let line of options.input) {
            let formatted = line;
            if ((_e = options.style) === null || _e === void 0 ? void 0 : _e.vertical) {
                const left = `${options.style.vertical} `;
                const right = ` ${options.style.vertical}`;
                formatted = `${left}${pad(formatted, options.width - left.length - right.length, options.style.hAlign || PAD_SIDE.RIGHT)}${right}`;
            }
            else
                formatted = pad(formatted, options.width, ((_f = options.style) === null || _f === void 0 ? void 0 : _f.hAlign) || PAD_SIDE.RIGHT);
            lines.push(formatted);
        }
        // construct bottom of box
        if ((_g = options.style) === null || _g === void 0 ? void 0 : _g.horizontal) {
            let bottom;
            if (options.style.bottom) {
                const bl = options.style.bottom.left || options.style.bottom.corner || options.style.corner || options.style.horizontal;
                const br = options.style.bottom.right || options.style.bottom.corner || options.style.corner || options.style.horizontal;
                bottom = `${bl}${padRight("", options.width - bl.length - br.length, options.style.horizontal)}${br}`;
            }
            else if (options.style.corner) {
                const bl = options.style.corner;
                const br = options.style.corner;
                bottom = `${bl}${padRight("", options.width - bl.length - br.length, options.style.horizontal)}${br}`;
            }
            else
                bottom = padRight("", options.width, options.style.horizontal);
            lines.push(bottom);
        }
        return lines;
    }
    exports.box = box;
});