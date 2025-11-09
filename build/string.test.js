import * as string from "./string.js";
import { equal, ok } from "assert/strict";
import { describe, it } from "node:test";
import chalk from "chalk";
describe("string.ts", () => {
    describe("padders", () => {
        it("pad", () => {
            equal(string.pad({ string: "test", width: 10, side: string.PAD_SIDE.LEFT }), "      test");
            equal(string.pad("test", 10, string.PAD_SIDE.LEFT, "-"), "------test");
            equal(string.pad("50", 10, string.PAD_SIDE.LEFT, "0"), "0000000050");
            equal(string.pad({ string: "test", width: 10, side: string.PAD_SIDE.RIGHT }), "test      ");
            equal(string.pad({
                string: "test",
                width: 10,
                side: string.PAD_SIDE.RIGHT,
                padder: "<>{}"
            }), "test<>{}<>");
            equal(string.pad({
                string: "test",
                width: 10,
                side: string.PAD_SIDE.RIGHT,
                padder: "-"
            }), "test------");
            equal(string.pad({
                string: "50.",
                width: 10,
                side: string.PAD_SIDE.RIGHT,
                padder: "0"
            }), "50.0000000");
            equal(string.pad({ string: "test", side: string.PAD_SIDE.CENTER, width: 10 }), "   test   ");
            equal(string.pad({
                string: "test",
                width: 10,
                side: string.PAD_SIDE.CENTER,
                padder: "<>"
            }), "<><test><>");
            equal(string.pad({
                string: "test",
                width: 80,
                side: string.PAD_SIDE.CENTER,
                padder: "<->"
            }), "<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-");
            equal(string.pad({
                string: "test",
                width: 10,
                side: string.PAD_SIDE.CENTER,
                padder: "-"
            }), "---test---");
            equal(string.pad({
                string: "test",
                width: 11,
                side: string.PAD_SIDE.CENTER,
                padder: "-"
            }), "---test----");
        });
        it("padLeft", () => {
            equal(string.padLeft({ string: "test", width: 10 }), "      test");
            equal(string.padLeft({ string: "test", width: 10, padder: "-" }), "------test");
            equal(string.padLeft({ string: "50", width: 10, padder: "0" }), "0000000050");
        });
        it("padRight", () => {
            equal(string.padRight({ string: "test", width: 10 }), "test      ");
            equal(string.padRight({ string: "test", width: 10, padder: "<>{}" }), "test<>{}<>");
            equal(string.padRight({ string: "test", width: 10, padder: "-" }), "test------");
            equal(string.padRight({ string: "50.", width: 10, padder: "0" }), "50.0000000");
        });
        it("padCenter", () => {
            equal(string.padCenter({ string: "test", width: 10 }), "   test   ");
            equal(string.padCenter({ string: "test", width: 10, padder: "<>" }), "<><test><>");
            equal(string.padCenter({ string: "test", width: 80, padder: "<->" }), "<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-");
            equal(string.padCenter({ string: "test", width: 10, padder: "-" }), "---test---");
            equal(string.padCenter({ string: "test", width: 11, padder: "-" }), "---test----");
        });
        it("color", () => {
            const str = chalk.red("this is a test");
            const padded = string.padCenter({
                string: str,
                width: 50,
                padder: "-",
                sizer: string.TERM_SIZER,
                color: chalk.blue
            });
            const expected = `${chalk.blue("------------------")}${str}${chalk.blue("------------------")}`;
            equal(expected, padded);
        });
    });
    describe("wrap", () => {
        it("bug", () => {
            const line = string.padCenter(chalk.green(" Centered "), 76, "<*>", string.TERM_SIZER, chalk.yellow);
            const box = string
                .box({
                input: [line],
                width: 80,
                style: string.BOX_STYLES.O,
                sizer: string.TERM_SIZER
            })
                .join("\n");
            const expected = `\
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO\n\
O ${chalk.yellow("<*><*><*><*><*><*><*><*><*><*><*>")}${chalk.green(" Centered ")}${chalk.yellow("*><*><*><*><*><*><*><*><*><*><*><")} O\n\
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`;
            equal(box, expected);
        });
        it("simple", () => {
            const lorem = "This is{----a test.";
            const expected = "This is{----a test.";
            const COLOR_SIZER = {
                open: "{",
                size: (str) => str.replace(/\{[A-Za-z]/g, "").length,
                unrenderedSequenceLength: (str, i) => {
                    if (str[i] === "{")
                        return 5;
                    return 0;
                }
            };
            const wrapped = string.wrap(lorem, 14, COLOR_SIZER);
            console.log(wrapped);
            equal(wrapped.join("?"), expected);
        });
        it("color", () => {
            const lorem = [
                "This is a test. This is a test. This is a test.",
                `This is a ${chalk.magenta("test")}. This is a ${chalk.yellow("test")}. This is a ${chalk.cyan("test")}.`
            ];
            const expected = [
                "This is a test.",
                "This is a test.",
                "This is a test.",
                `This is a ${chalk.magenta("test")}.`,
                `This is a ${chalk.yellow("test")}.`,
                `This is a ${chalk.cyan("test")}.`
            ].join("\n");
            const wrapped = string
                .wrap({ string: lorem.join(" "), width: 15, sizer: string.TERM_SIZER })
                .join("\n");
            equal(wrapped, expected);
        });
        it("ideal", () => {
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
            const limited = string.wrap({ string: blob, width: 80 }).join("-");
            const expected = [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis",
                "tortor a risus varius, sed euismod lectus ultricies. Nam sodales gravida lectus",
                "a pretium. Integer eget risus vitae purus viverra aliquam. Ut vehicula felis et",
                "facilisis blandit. Vestibulum elementum at enim in viverra. Donec tincidunt vel",
                "magna non pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Vestibulum dolor magna, iaculis in velit eu, fermentum tincidunt metus."
            ].join("-");
            equal(limited, expected);
        });
        it("long", () => {
            const lorem = "a".repeat(80) + "b".repeat(80);
            const limited = string.wrap({ string: lorem, width: 80 }).join("*");
            const expected = [
                //12345678901234567890123456789012345678901234567890123456789012345678901234567890
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-",
                "abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-",
                "bb"
            ].join("*");
            equal(limited, expected);
        });
        it("short and long", () => {
            const lorem = "a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa aa aaaaaaaaa";
            const limited = string.wrap({ string: lorem, width: 10 }).join("*");
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
            equal(limited, expected);
        });
    });
    describe("box", () => {
        it("color", () => {
            const style = Object.assign(Object.assign({}, string.BOX_STYLES.PLAIN), { titleBorder: { left: "<", right: ">" }, hAlign: string.PAD_SIDE.CENTER });
            const box = string.box({
                input: ["This is a test.", `This is a ${chalk.red("test")}.`],
                style: style,
                title: `Go to ${chalk.yellow.bold("HELL")}`,
                width: 30,
                sizer: string.TERM_SIZER,
                color: chalk.yellow
            });
            const expected = [
                "\x1B[33m+\x1B[39m\x1B[33m-\x1B[39m\x1B[33m<\x1B[39m Go to \x1B[33m\x1B[1mHELL\x1B[22m\x1B[39m \x1B[33m>\x1B[39m\x1B[33m-------------\x1B[39m\x1B[33m+\x1B[39m",
                "\x1B[33m|\x1B[39m      This is a test.       \x1B[33m|\x1B[39m",
                "\x1B[33m|\x1B[39m      This is a \x1B[31mtest\x1B[39m.       \x1B[33m|\x1B[39m",
                "\x1B[33m+----------------------------+\x1B[39m"
            ];
            equal(box.join(""), expected.join(""));
        });
        it("color + multiline", () => {
            const style = Object.assign(Object.assign({}, string.BOX_STYLES.PLAIN), { titleBorder: { left: "<", right: ">" }, hAlign: string.PAD_SIDE.CENTER });
            const box = string.box({
                input: [
                    "This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test."
                ],
                style: style,
                title: `Go to ${chalk.yellow.bold("HELL")}`,
                width: 30,
                sizer: string.TERM_SIZER,
                color: chalk.yellow
            });
            const expected = [
                "\x1B[33m+\x1B[39m\x1B[33m-\x1B[39m\x1B[33m<\x1B[39m Go to \x1B[33m\x1B[1mHELL\x1B[22m\x1B[39m \x1B[33m>\x1B[39m\x1B[33m-------------\x1B[39m\x1B[33m+\x1B[39m",
                "\x1B[33m|\x1B[39m This is a test. This is a  \x1B[33m|\x1B[39m",
                "\x1B[33m|\x1B[39m test. This is a test. This \x1B[33m|\x1B[39m",
                "\x1B[33m|\x1B[39m is a test. This is a test. \x1B[33m|\x1B[39m",
                "\x1B[33m|\x1B[39m This is a test. This is a  \x1B[33m|\x1B[39m",
                "\x1B[33m|\x1B[39m           test.            \x1B[33m|\x1B[39m",
                "\x1B[33m+----------------------------+\x1B[39m"
            ];
            equal(box.join("\n"), expected.join("\n"));
        });
        it("weird", () => {
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
            equal(generated, expected);
        });
        it("right-aligned (default)", () => {
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
            equal(generated, expected);
        });
        it("center-aligned", () => {
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
            equal(generated, expected);
        });
        it("left-aligned", () => {
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
            equal(generated, expected);
        });
        it("blank boxes", () => {
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
            equal(generated, expected);
        });
    });
    it("autocomplete", () => {
        ok(string.autocomplete("", "partial"));
        ok(string.autocomplete("p", "partial"));
        ok(string.autocomplete("part", "partial"));
        ok(!string.autocomplete("partial", "part"));
    });
    it("matchKeywords", () => {
        ok(string.matchKeywords("the", "the cake is a lie"));
        ok(string.matchKeywords("cake", "the cake is a lie"));
        ok(string.matchKeywords("the cake", "the cake is a lie"));
        ok(!string.matchKeywords("the pie", "the cake is a lie"));
    });
});
