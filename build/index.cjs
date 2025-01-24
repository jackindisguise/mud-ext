"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// build/index.js
var index_exports = {};
__export(index_exports, {
  array: () => array_exports,
  number: () => number_exports,
  string: () => string_exports
});
module.exports = __toCommonJS(index_exports);

// build/string.js
var string_exports = {};
__export(string_exports, {
  BOX_STYLES: () => BOX_STYLES,
  DEFAULT_SIZER: () => DEFAULT_SIZER,
  HTML_SIZER: () => HTML_SIZER,
  PAD_SIDE: () => PAD_SIDE,
  TERM_SIZER: () => TERM_SIZER,
  autocomplete: () => autocomplete,
  box: () => box,
  matchKeywords: () => matchKeywords,
  pad: () => pad,
  padCenter: () => padCenter,
  padLeft: () => padLeft,
  padRight: () => padRight,
  wrap: () => wrap
});
var PAD_SIDE;
(function(PAD_SIDE2) {
  PAD_SIDE2[PAD_SIDE2["LEFT"] = 1] = "LEFT";
  PAD_SIDE2[PAD_SIDE2["RIGHT"] = 2] = "RIGHT";
  PAD_SIDE2[PAD_SIDE2["CENTER"] = 3] = "CENTER";
})(PAD_SIDE || (PAD_SIDE = {}));
var BOX_STYLES = class {
};
BOX_STYLES.PLAIN = {
  horizontal: "-",
  vertical: "|",
  corner: "+"
};
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
BOX_STYLES.O = {
  titleBorder: {
    left: "(",
    right: ")"
  },
  horizontal: "O",
  vertical: "O"
};
var TERM_SIZER = {
  open: "\x1B",
  close: "m",
  size: (str) => {
    const rule = /(\u001b.*?m)/g;
    const result = str.match(rule);
    if (!result)
      return str.length;
    return str.length - result.reduce((a, b) => a + b.length, 0);
  }
};
var HTML_SIZER = {
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
var DEFAULT_SIZER = {
  size: (str) => str.length
};
function pad(options, width, side, padder, sizer, color) {
  if (typeof options === "string")
    return padWithOptions({
      string: options,
      width: width || 0,
      side: side || PAD_SIDE.RIGHT,
      padder: padder || " ",
      sizer: sizer || DEFAULT_SIZER,
      color: color || void 0
    });
  return padWithOptions(options);
}
function padWithOptions(options) {
  if (options.side === PAD_SIDE.LEFT)
    return padLeft(options);
  if (options.side === PAD_SIDE.CENTER)
    return padCenter(options);
  return padRight(options);
}
function padLeft(options, width, padder, sizer, color) {
  if (typeof options === "string")
    return padLeftWithOptions({
      string: options,
      width: width || 0,
      padder: padder || " ",
      sizer: sizer || DEFAULT_SIZER,
      color: color || void 0
    });
  return padLeftWithOptions(options);
}
function padLeftWithOptions(options) {
  const padder = options.padder || " ";
  const sizer = options.sizer || DEFAULT_SIZER;
  const csize = sizer.size(options.string);
  const psize = options.width - csize;
  if (psize < 1)
    return options.string;
  let pad2 = padder.repeat(Math.ceil(psize / sizer.size(padder)));
  if (sizer.size(pad2) > psize)
    pad2 = pad2.slice(0, psize);
  if (options.color)
    pad2 = options.color(pad2);
  return `${pad2}${options.string}`;
}
function padRight(options, width, padder, sizer, color) {
  if (typeof options === "string")
    return padRightWithOptions({
      string: options,
      width: width || 0,
      padder: padder || " ",
      sizer: sizer || DEFAULT_SIZER,
      color: color || void 0
    });
  return padRightWithOptions(options);
}
function padRightWithOptions(options) {
  const padder = options.padder || " ";
  const sizer = options.sizer || DEFAULT_SIZER;
  const csize = sizer.size(options.string);
  const psize = options.width - csize;
  if (psize < 1)
    return options.string;
  let pad2 = padder.repeat(Math.ceil(psize / sizer.size(padder)));
  if (sizer.size(pad2) > psize)
    pad2 = pad2.slice(0, psize);
  if (options.color)
    pad2 = options.color(pad2);
  return `${options.string}${pad2}`;
}
function padCenter(options, width, padder, sizer, color) {
  if (typeof options === "string")
    return padCenterWithOptions({
      string: options,
      width: width || 0,
      padder: padder || " ",
      sizer: sizer || DEFAULT_SIZER,
      color: color || void 0
    });
  return padCenterWithOptions(options);
}
function padCenterWithOptions(options) {
  const padder = options.padder || " ";
  const sizer = options.sizer || DEFAULT_SIZER;
  const csize = sizer.size(options.string);
  const psize = options.width - csize;
  if (psize < 1)
    return options.string;
  const tpad = padder.repeat(Math.ceil(options.width / padder.length));
  const lsize = psize % 2 ? Math.floor(psize / 2) : psize / 2;
  const rsize = psize % 2 ? Math.floor(psize / 2) + 1 : psize / 2;
  let lpad = tpad.slice(0, lsize);
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
      sizer: sizer || DEFAULT_SIZER
    });
  return wrapWithOptions(options);
}
function wrapWithOptions(options) {
  const sizer = options.sizer || DEFAULT_SIZER;
  const lines = [];
  let last = 0;
  let cursor = options.width;
  while (cursor < options.string.length) {
    let unrendered = 0;
    if (sizer.open) {
      for (let i = last; i <= cursor; i++) {
        if (options.string[i] === sizer.open) {
          while (true) {
            cursor++;
            unrendered++;
            if (options.string[i] === sizer.close)
              break;
            i++;
          }
        }
      }
    }
    let breakpoint = cursor;
    if (breakpoint >= options.string.length)
      break;
    const mid = (cursor + unrendered + last) / 2;
    for (let i = cursor; i >= mid; i--) {
      if ([" ", "\r", "\n", "	"].includes(options.string[i])) {
        breakpoint = i;
        break;
      }
    }
    if ([" ", "\r", "\n", "	"].includes(options.string[breakpoint])) {
      lines.push(options.string.slice(last, breakpoint));
      last = breakpoint + 1;
    } else {
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
      title: title || void 0,
      style: style || void 0,
      sizer: sizer || void 0,
      color: color || void 0
    });
  return boxWithOptions(options);
}
function boxWithOptions(options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
  const sizer = options.sizer || DEFAULT_SIZER;
  const color = options.color || ((str) => str);
  const lines = [];
  let topmiddle = ((_b = (_a = options.style) === null || _a === void 0 ? void 0 : _a.top) === null || _b === void 0 ? void 0 : _b.middle) || ((_c = options.style) === null || _c === void 0 ? void 0 : _c.horizontal) || "";
  const topleft = ((_e = (_d = options.style) === null || _d === void 0 ? void 0 : _d.top) === null || _e === void 0 ? void 0 : _e.left) || ((_g = (_f = options.style) === null || _f === void 0 ? void 0 : _f.top) === null || _g === void 0 ? void 0 : _g.corner) || ((_h = options.style) === null || _h === void 0 ? void 0 : _h.corner) || "";
  const topright = ((_k = (_j = options.style) === null || _j === void 0 ? void 0 : _j.top) === null || _k === void 0 ? void 0 : _k.right) || ((_m = (_l = options.style) === null || _l === void 0 ? void 0 : _l.top) === null || _m === void 0 ? void 0 : _m.corner) || ((_o = options.style) === null || _o === void 0 ? void 0 : _o.corner) || "";
  if (topleft || topright || topmiddle) {
    if ((topleft || topright) && !topmiddle)
      topmiddle = " ";
    const ruleWidth = options.width - topleft.length - topright.length;
    const rule = topmiddle.repeat(Math.ceil(ruleWidth / topmiddle.length));
    const safeRule = rule.slice(0, ruleWidth);
    if (options.title) {
      const offset = 1;
      let formattedTitle = options.title;
      if ((_p = options.style) === null || _p === void 0 ? void 0 : _p.titleBorder) {
        const tLeftPadding = ((_q = options.style.titleBorder) === null || _q === void 0 ? void 0 : _q.left) ? " " : "";
        const tRightPadding = ((_r = options.style.titleBorder) === null || _r === void 0 ? void 0 : _r.right) ? " " : "";
        formattedTitle = `${((_s = options.style.titleBorder) === null || _s === void 0 ? void 0 : _s.left) ? color((_t = options.style.titleBorder) === null || _t === void 0 ? void 0 : _t.left) : ""}${tLeftPadding}${options.title}${tRightPadding}${((_u = options.style.titleBorder) === null || _u === void 0 ? void 0 : _u.right) ? color((_v = options.style.titleBorder) === null || _v === void 0 ? void 0 : _v.right) : ""}`;
      } else
        formattedTitle = ` ${options.title} `;
      const safeTitleWidth = sizer.size(formattedTitle);
      let start = 0 + offset;
      if (((_w = options.style) === null || _w === void 0 ? void 0 : _w.titleHAlign) === PAD_SIDE.LEFT)
        start = ruleWidth - safeTitleWidth - offset;
      else if (((_x = options.style) === null || _x === void 0 ? void 0 : _x.titleHAlign) === PAD_SIDE.CENTER)
        start = Math.floor((ruleWidth - safeTitleWidth) / 2);
      const titled = (start > 0 ? color(safeRule.slice(0, start)) : "") + formattedTitle + (start + safeTitleWidth < ruleWidth ? color(safeRule.slice(start + safeTitleWidth, ruleWidth)) : "");
      lines.push(`${topleft ? color(topleft) : ""}${titled}${topright ? color(topright) : ""}`);
    } else
      lines.push(`${topleft ? color(topleft) : ""}${safeRule}${topright ? color(topright) : ""}`);
  } else if (options.title) {
    lines.push(pad({
      string: options.title,
      width: options.width,
      side: ((_y = options.style) === null || _y === void 0 ? void 0 : _y.titleHAlign) || PAD_SIDE.RIGHT,
      sizer
    }));
  }
  const addLine = (line) => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _j2, _k2, _l2, _m2;
    if (((_a2 = options.style) === null || _a2 === void 0 ? void 0 : _a2.vertical) || ((_b2 = options.style) === null || _b2 === void 0 ? void 0 : _b2.left) || ((_c2 = options.style) === null || _c2 === void 0 ? void 0 : _c2.right)) {
      const leftVert = ((_d2 = options.style) === null || _d2 === void 0 ? void 0 : _d2.left) || ((_e2 = options.style) === null || _e2 === void 0 ? void 0 : _e2.vertical) || "";
      const leftHPadding = leftVert ? ((_f2 = options.style) === null || _f2 === void 0 ? void 0 : _f2.hPadding) || 1 : 0;
      const left = color(leftVert) + " ".repeat(leftHPadding);
      const rightVert = ((_g2 = options.style) === null || _g2 === void 0 ? void 0 : _g2.right) || ((_h2 = options.style) === null || _h2 === void 0 ? void 0 : _h2.vertical) || "";
      const rightHPadding = rightVert ? ((_j2 = options.style) === null || _j2 === void 0 ? void 0 : _j2.hPadding) || 1 : 0;
      const right = " ".repeat(rightHPadding) + color(rightVert);
      const wrapped = wrap({
        string: line,
        width: options.width - sizer.size(left) - sizer.size(right),
        sizer
      });
      for (const _line of wrapped)
        lines.push(`${left}${pad({
          string: _line,
          width: options.width - sizer.size(left) - sizer.size(right),
          side: ((_k2 = options.style) === null || _k2 === void 0 ? void 0 : _k2.hAlign) || PAD_SIDE.RIGHT,
          sizer
        })}${right}`);
    } else {
      const left = " ".repeat(((_l2 = options.style) === null || _l2 === void 0 ? void 0 : _l2.hPadding) || 0);
      const right = left;
      const wrapped = wrap({
        string: line,
        width: options.width - sizer.size(left) - sizer.size(right),
        sizer
      });
      for (const _line of wrapped)
        lines.push(`${left}${pad({
          string: _line,
          width: options.width - left.length - right.length,
          side: ((_m2 = options.style) === null || _m2 === void 0 ? void 0 : _m2.hAlign) || PAD_SIDE.RIGHT,
          sizer
        })}${right}`);
    }
  };
  if ((_z = options.style) === null || _z === void 0 ? void 0 : _z.vPadding)
    for (let i = 0; i < options.style.vPadding; i++)
      addLine("");
  for (const line of options.input)
    addLine(line);
  if ((_0 = options.style) === null || _0 === void 0 ? void 0 : _0.vPadding)
    for (let i = 0; i < options.style.vPadding; i++)
      addLine("");
  let bottommiddle = ((_2 = (_1 = options.style) === null || _1 === void 0 ? void 0 : _1.bottom) === null || _2 === void 0 ? void 0 : _2.middle) || ((_3 = options.style) === null || _3 === void 0 ? void 0 : _3.horizontal) || "";
  const bottomleft = ((_5 = (_4 = options.style) === null || _4 === void 0 ? void 0 : _4.bottom) === null || _5 === void 0 ? void 0 : _5.left) || ((_7 = (_6 = options.style) === null || _6 === void 0 ? void 0 : _6.bottom) === null || _7 === void 0 ? void 0 : _7.corner) || ((_8 = options.style) === null || _8 === void 0 ? void 0 : _8.corner) || "";
  const bottomright = ((_10 = (_9 = options.style) === null || _9 === void 0 ? void 0 : _9.bottom) === null || _10 === void 0 ? void 0 : _10.right) || ((_12 = (_11 = options.style) === null || _11 === void 0 ? void 0 : _11.bottom) === null || _12 === void 0 ? void 0 : _12.corner) || ((_13 = options.style) === null || _13 === void 0 ? void 0 : _13.corner) || "";
  if (bottomleft || bottomright || bottommiddle) {
    if ((bottomleft || bottomright) && !bottommiddle)
      bottommiddle = " ";
    const ruleWidth = options.width - bottomleft.length - bottomright.length;
    const rule = bottommiddle.repeat(Math.ceil(ruleWidth / bottommiddle.length));
    const safeRule = rule.slice(0, ruleWidth);
    lines.push(color(`${bottomleft}${safeRule}${bottomright}`));
  }
  return lines;
}
function autocomplete(partial, target) {
  if (partial.length > target.length)
    return false;
  if (partial.toLowerCase() !== target.toLowerCase().slice(0, partial.length))
    return false;
  return true;
}
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

// build/number.js
var number_exports = {};
__export(number_exports, {
  actualRoll: () => actualRoll,
  lerp: () => lerp,
  randomInt: () => randomInt,
  roll: () => roll
});
function lerp(low, high, mod) {
  return low + (high - low) * mod;
}
function randomInt(low, high) {
  return Math.floor(lerp(low, high + 1, Math.random()));
}
function roll(die, sides, mod) {
  if (mod)
    return randomInt(die, die * sides) + mod;
  return randomInt(die, die * sides);
}
function actualRoll(die, sides) {
  const results = [];
  for (let i = 0; i < die; i++)
    results.push(randomInt(1, sides));
  return results;
}

// build/array.js
var array_exports = {};
__export(array_exports, {
  pick: () => pick,
  replace: () => replace
});
function pick(...options) {
  if (Array.isArray(options[0]))
    options = options[0];
  return options[randomInt(0, options.length - 1)];
}
function replace(array, rule, replace2) {
  const replaced = [];
  array.forEach((value, index) => {
    if (value === rule)
      replaced[index] = replace2;
    else if (rule instanceof RegExp && typeof value === "string" && rule.exec(value))
      replaced[index] = replace2;
    else
      replaced[index] = value;
  });
  return replaced;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  array,
  number,
  string
});
