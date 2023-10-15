var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./string.cjs", "chai", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const string = __importStar(require("./string.cjs"));
    const chai_1 = require("chai");
    const chalk_1 = __importDefault(require("chalk"));
    describe("string.ts", () => {
        describe("padders", () => {
            it("pad", (done) => {
                (0, chai_1.expect)(string.pad({ string: "test", width: 10 }, string.PAD_SIDE.LEFT)).is.equal("      test");
                (0, chai_1.expect)(string.pad({ string: "test", width: 10, padder: "-" }, string.PAD_SIDE.LEFT)).is.equal("------test");
                (0, chai_1.expect)(string.pad({ string: "50", width: 10, padder: "0" }, string.PAD_SIDE.LEFT)).is.equal("0000000050");
                (0, chai_1.expect)(string.pad({ string: "test", width: 10 }, string.PAD_SIDE.RIGHT)).is.equal("test      ");
                (0, chai_1.expect)(string.pad({ string: "test", width: 10, padder: "<>{}" }, string.PAD_SIDE.RIGHT)).is.equal("test<>{}<>");
                (0, chai_1.expect)(string.pad({ string: "test", width: 10, padder: "-" }, string.PAD_SIDE.RIGHT)).is.equal("test------");
                (0, chai_1.expect)(string.pad({ string: "50.", width: 10, padder: "0" }, string.PAD_SIDE.RIGHT)).is.equal("50.0000000");
                (0, chai_1.expect)(string.pad({ string: "test", width: 10 }, string.PAD_SIDE.CENTER)).is.equal("   test   ");
                (0, chai_1.expect)(string.pad({ string: "test", width: 10, padder: "<>" }, string.PAD_SIDE.CENTER)).is.equal("<><test><>");
                (0, chai_1.expect)(string.pad({ string: "test", width: 80, padder: "<->" }, string.PAD_SIDE.CENTER)).is.equal("<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-");
                (0, chai_1.expect)(string.pad({ string: "test", width: 10, padder: "-" }, string.PAD_SIDE.CENTER)).is.equal("---test---");
                (0, chai_1.expect)(string.pad({ string: "test", width: 11, padder: "-" }, string.PAD_SIDE.CENTER)).is.equal("---test----");
                done();
            });
            it("padLeft", (done) => {
                (0, chai_1.expect)(string.padLeft({ string: "test", width: 10 })).is.equal("      test");
                (0, chai_1.expect)(string.padLeft({ string: "test", width: 10, padder: "-" })).is.equal("------test");
                (0, chai_1.expect)(string.padLeft({ string: "50", width: 10, padder: "0" })).is.equal("0000000050");
                done();
            });
            it("padRight", (done) => {
                (0, chai_1.expect)(string.padRight({ string: "test", width: 10 })).is.equal("test      ");
                (0, chai_1.expect)(string.padRight({ string: "test", width: 10, padder: "<>{}" })).is.equal("test<>{}<>");
                (0, chai_1.expect)(string.padRight({ string: "test", width: 10, padder: "-" })).is.equal("test------");
                (0, chai_1.expect)(string.padRight({ string: "50.", width: 10, padder: "0" })).is.equal("50.0000000");
                done();
            });
            it("padCenter", (done) => {
                (0, chai_1.expect)(string.padCenter({ string: "test", width: 10 })).is.equal("   test   ");
                (0, chai_1.expect)(string.padCenter({ string: "test", width: 10, padder: "<>" })).is.equal("<><test><>");
                (0, chai_1.expect)(string.padCenter({ string: "test", width: 80, padder: "<->" })).is.equal("<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-");
                (0, chai_1.expect)(string.padCenter({ string: "test", width: 10, padder: "-" })).is.equal("---test---");
                (0, chai_1.expect)(string.padCenter({ string: "test", width: 11, padder: "-" })).is.equal("---test----");
                done();
            });
        });
        describe("wrap", () => {
            it("color", (done) => {
                const lorem = [
                    "This is a test. This is a test. This is a test.",
                    `This is a ${chalk_1.default.magenta("test")}. This is a ${chalk_1.default.yellow("test")}. This is a ${chalk_1.default.cyan("test")}.`
                ];
                const expected = [
                    "This is a test.",
                    "This is a test.",
                    "This is a test.",
                    `This is a ${chalk_1.default.magenta("test")}.`,
                    `This is a ${chalk_1.default.yellow("test")}.`,
                    `This is a ${chalk_1.default.cyan("test")}.`
                ].join("\n");
                const wrapped = string
                    .wrap(lorem.join(" "), 15, string.TERM_SIZER)
                    .join("\n");
                (0, chai_1.expect)(wrapped).is.equal(expected);
                done();
            });
            it("ideal", (done) => {
                const lorem = [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Vestibulum mollis tortor a risus varius, sed euismod lectus ultricies.",
                    "Nam sodales gravida lectus a pretium.",
                    "Integer eget risus vitae purus viverra aliquam.",
                    "Ut vehicula felis et facilisis blandit.",
                    "Vestibulum elementum at enim in viverra.",
                    "Donec tincidunt vel magna non pharetra.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Vestibulum dolor magna, iaculis in velit eu, fermentum tincidunt metus."
                ];
                const blob = lorem.join(" ");
                const limited = string.wrap(blob, 80).join("-");
                const expected = [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis",
                    "tortor a risus varius, sed euismod lectus ultricies. Nam sodales gravida lectus",
                    "a pretium. Integer eget risus vitae purus viverra aliquam. Ut vehicula felis et",
                    "facilisis blandit. Vestibulum elementum at enim in viverra. Donec tincidunt vel",
                    "magna non pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Vestibulum dolor magna, iaculis in velit eu, fermentum tincidunt metus."
                ].join("-");
                (0, chai_1.expect)(limited).is.equal(expected);
                done();
            });
            it("long", (done) => {
                const lorem = "a".repeat(80) + "b".repeat(80);
                const limited = string.wrap(lorem, 80).join("*");
                const expected = [
                    //12345678901234567890123456789012345678901234567890123456789012345678901234567890
                    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-",
                    "abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-",
                    "bb"
                ].join("*");
                (0, chai_1.expect)(limited).is.equal(expected);
                done();
            });
            it("short and long", (done) => {
                const lorem = "a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa aa aaaaaaaaa";
                const limited = string.wrap(lorem, 10).join("*");
                const expected = [
                    "a aa aaa",
                    "aaaa aaaaa",
                    "aaaaaa",
                    "aaaaaaa",
                    "aaaaaaaa",
                    "aaaaaaaaa",
                    "aaaaaaaaaa",
                    "aa aaaaaa-",
                    "aaa"
                ].join("*");
                (0, chai_1.expect)(limited).is.equal(expected);
                done();
            });
        });
        describe("box", () => {
            it("color", (done) => {
                const style = Object.assign(Object.assign({}, string.BOX_STYLES.PLAIN), { titleBorder: { left: "<", right: ">" }, hAlign: string.PAD_SIDE.CENTER });
                const box = string.box({
                    input: ["This is a test.", `This is a ${chalk_1.default.red("test")}.`],
                    style: style,
                    title: `Go to ${chalk_1.default.yellow.bold("HELL")}`,
                    width: 30,
                    sizer: string.TERM_SIZER,
                    color: chalk_1.default.yellow
                });
                const expected = [
                    "\x1B[33m+\x1B[39m\x1B[33m-\x1B[39m\x1B[33m<\x1B[39m Go to \x1B[33m\x1B[1mHELL\x1B[22m\x1B[39m \x1B[33m>\x1B[39m\x1B[33m-------------\x1B[39m\x1B[33m+\x1B[39m",
                    "\x1B[33m|\x1B[39m      This is a test.       \x1B[33m|\x1B[39m",
                    "\x1B[33m|\x1B[39m      This is a \x1B[31mtest\x1B[39m.       \x1B[33m|\x1B[39m",
                    "\x1B[33m+----------------------------+\x1B[39m"
                ];
                (0, chai_1.expect)(box.join("")).is.equal(expected.join(""));
                done();
            });
            it("weird", (done) => {
                const style = {
                    hPadding: 2,
                    vPadding: 1,
                    hAlign: string.PAD_SIDE.LEFT,
                    titleHAlign: string.PAD_SIDE.LEFT,
                    top: { middle: "v " },
                    bottom: { middle: "^ " },
                    left: ">",
                    right: "<"
                };
                const generated = string
                    .box({
                    style: style,
                    width: 25,
                    input: [
                        "This is line 1.",
                        "This is line 2.",
                        "This is line 3.",
                        "Go to hell."
                    ]
                })
                    .join("\n");
                const expected = [
                    "v v v v v v v v v v v v v",
                    ">                       <",
                    ">      This is line 1.  <",
                    ">      This is line 2.  <",
                    ">      This is line 3.  <",
                    ">          Go to hell.  <",
                    ">                       <",
                    "^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^"
                ].join("\n");
                (0, chai_1.expect)(generated).is.equal(expected);
                done();
            });
            it("right-aligned (default)", (done) => {
                const generated = string
                    .box({
                    style: Object.assign(Object.assign({}, string.BOX_STYLES.PLAIN), { hPadding: 2, top: { left: ">>", right: "<<" }, bottom: { left: ">>", right: "<<" }, left: ">>", right: "<<" }),
                    title: "Box Title",
                    input: ["This is a line.", "This is another line."],
                    width: 30
                })
                    .join("\n");
                const expected = [
                    ">>- Box Title --------------<<",
                    ">>  This is a line.         <<",
                    ">>  This is another line.   <<",
                    ">>--------------------------<<"
                ].join("\n");
                (0, chai_1.expect)(generated).is.equal(expected);
                done();
            });
            it("center-aligned", (done) => {
                // copy rounded box style
                const rounded = Object.assign(Object.assign({}, string.BOX_STYLES.ROUNDED), { hAlign: string.PAD_SIDE.CENTER, titleHAlign: string.PAD_SIDE.CENTER, vPadding: 1 });
                // generate a rounded box
                const generated = string
                    .box({
                    style: rounded,
                    title: "Box Title",
                    input: ["This is a line.", "This is another line."],
                    width: 30
                })
                    .join("\n");
                // test against expected
                const expected = [
                    ".-------- Box Title ---------.",
                    "|                            |",
                    "|      This is a line.       |",
                    "|   This is another line.    |",
                    "|                            |",
                    "'----------------------------'"
                ].join("\n");
                (0, chai_1.expect)(generated).is.equal(expected);
                done();
            });
            it("left-aligned", (done) => {
                // copy O box style
                const obox = Object.assign(Object.assign({}, string.BOX_STYLES.O), { top: { corner: "o" }, hAlign: string.PAD_SIDE.LEFT, titleHAlign: string.PAD_SIDE.LEFT });
                // generate an O box
                const generated = string
                    .box({
                    style: obox,
                    title: "Box Title",
                    input: ["This is a line.", "This is another line."],
                    width: 30
                })
                    .join("\n");
                // test against expected
                const expected = [
                    "oOOOOOOOOOOOOOO( Box Title )Oo",
                    "O            This is a line. O",
                    "O      This is another line. O",
                    "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
                ].join("\n");
                (0, chai_1.expect)(generated).is.equal(expected);
                done();
            });
            it("blank boxes", (done) => {
                // blank-ass box
                const blank = {
                    hAlign: string.PAD_SIDE.CENTER,
                    titleHAlign: string.PAD_SIDE.CENTER,
                    corner: "+"
                };
                // generate a rounded box
                const generated = string
                    .box({
                    style: blank,
                    title: "Box Title",
                    input: ["This is a line.", "This is another line."],
                    width: 30
                })
                    .join("\n");
                // test against expected
                const expected = [
                    "+         Box Title          +",
                    "       This is a line.        ",
                    "    This is another line.     ",
                    "+                            +"
                ].join("\n");
                (0, chai_1.expect)(generated).is.equal(expected);
                done();
            });
        });
        describe("autocomplete", () => {
            it("it works", (done) => {
                (0, chai_1.expect)(string.autocomplete("", "partial")).is.true;
                (0, chai_1.expect)(string.autocomplete("p", "partial")).is.true;
                (0, chai_1.expect)(string.autocomplete("part", "partial")).is.true;
                (0, chai_1.expect)(string.autocomplete("partial", "part")).is.false;
                done();
            });
        });
        describe("matchKeywords", () => {
            it("it works", (done) => {
                (0, chai_1.expect)(string.matchKeywords("the", "the cake is a lie")).is.true;
                (0, chai_1.expect)(string.matchKeywords("cake", "the cake is a lie")).is.true;
                (0, chai_1.expect)(string.matchKeywords("the cake", "the cake is a lie")).is.true;
                (0, chai_1.expect)(string.matchKeywords("the pie", "the cake is a lie")).is.false;
                done();
            });
        });
    });
});
