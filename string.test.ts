import * as string from "./string.js";
import { equal, ok } from "assert/strict";
import { describe, it } from "node:test";
import { deepEqual } from "assert";

// Generic color transformation functions for testing
const colors = {
	red: (str: string) => `\x1B[31m${str}\x1B[39m`,
	green: (str: string) => `\x1B[32m${str}\x1B[39m`,
	yellow: (str: string) => `\x1B[33m${str}\x1B[39m`,
	blue: (str: string) => `\x1B[34m${str}\x1B[39m`,
	magenta: (str: string) => `\x1B[35m${str}\x1B[39m`,
	cyan: (str: string) => `\x1B[36m${str}\x1B[39m`,
	bold: (str: string) => `\x1B[1m${str}\x1B[22m`
};

// Helper to combine styles (applies modifiers first, then color, like chalk.yellow.bold)
const combineStyles = (
	color: (s: string) => string,
	...modifiers: ((s: string) => string)[]
) => {
	return (str: string) => {
		let result = str;
		// Apply modifiers first (e.g., bold)
		for (const mod of modifiers) {
			result = mod(result);
		}
		// Then apply color (wraps the already-modified string)
		return color(result);
	};
};

describe("string.ts", () => {
	describe("padders", () => {
		it("pad", () => {
			equal(
				string.pad({ string: "test", width: 10, side: string.PAD_SIDE.LEFT }),
				"      test"
			);
			equal(string.pad("test", 10, string.PAD_SIDE.LEFT, "-"), "------test");
			equal(string.pad("50", 10, string.PAD_SIDE.LEFT, "0"), "0000000050");
			equal(
				string.pad({ string: "test", width: 10, side: string.PAD_SIDE.RIGHT }),
				"test      "
			);
			equal(
				string.pad({
					string: "test",
					width: 10,
					side: string.PAD_SIDE.RIGHT,
					padder: "<>{}"
				}),
				"test<>{}<>"
			);
			equal(
				string.pad({
					string: "test",
					width: 10,
					side: string.PAD_SIDE.RIGHT,
					padder: "-"
				}),
				"test------"
			);
			equal(
				string.pad({
					string: "50.",
					width: 10,
					side: string.PAD_SIDE.RIGHT,
					padder: "0"
				}),
				"50.0000000"
			);
			equal(
				string.pad({ string: "test", side: string.PAD_SIDE.CENTER, width: 10 }),
				"   test   "
			);
			equal(
				string.pad({
					string: "test",
					width: 10,
					side: string.PAD_SIDE.CENTER,
					padder: "<>"
				}),
				"<><test><>"
			);
			equal(
				string.pad({
					string: "test",
					width: 80,
					side: string.PAD_SIDE.CENTER,
					padder: "<->"
				}),
				"<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-"
			);
			equal(
				string.pad({
					string: "test",
					width: 10,
					side: string.PAD_SIDE.CENTER,
					padder: "-"
				}),
				"---test---"
			);
			equal(
				string.pad({
					string: "test",
					width: 11,
					side: string.PAD_SIDE.CENTER,
					padder: "-"
				}),
				"---test----"
			);
		});

		it("padLeft", () => {
			equal(string.padLeft({ string: "test", width: 10 }), "      test");
			equal(
				string.padLeft({ string: "test", width: 10, padder: "-" }),
				"------test"
			);
			equal(
				string.padLeft({ string: "50", width: 10, padder: "0" }),
				"0000000050"
			);
		});

		it("padRight", () => {
			equal(string.padRight({ string: "test", width: 10 }), "test      ");
			equal(
				string.padRight({ string: "test", width: 10, padder: "<>{}" }),
				"test<>{}<>"
			);
			equal(
				string.padRight({ string: "test", width: 10, padder: "-" }),
				"test------"
			);
			equal(
				string.padRight({ string: "50.", width: 10, padder: "0" }),
				"50.0000000"
			);
		});

		it("padCenter", () => {
			equal(string.padCenter({ string: "test", width: 10 }), "   test   ");
			equal(
				string.padCenter({ string: "test", width: 10, padder: "<>" }),
				"<><test><>"
			);
			equal(
				string.padCenter({ string: "test", width: 80, padder: "<->" }),
				"<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-"
			);
			equal(
				string.padCenter({ string: "test", width: 10, padder: "-" }),
				"---test---"
			);
			equal(
				string.padCenter({ string: "test", width: 11, padder: "-" }),
				"---test----"
			);
		});

		it("color", () => {
			const str = colors.red("this is a test");
			const padded = string.padCenter({
				string: str,
				width: 50,
				padder: "-",
				sizer: string.TERM_SIZER,
				color: colors.blue
			});
			const expected = `${colors.blue("------------------")}${str}${colors.blue(
				"------------------"
			)}`;
			equal(expected, padded);
		});
	});

	describe("wrap", () => {
		it("bug", () => {
			const line = string.padCenter(
				colors.green(" Centered "),
				76,
				"<*>",
				string.TERM_SIZER,
				colors.yellow
			);
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
O ${colors.yellow("<*><*><*><*><*><*><*><*><*><*><*>")}${colors.green(
				" Centered "
			)}${colors.yellow("*><*><*><*><*><*><*><*><*><*><*><")} O\n\
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`;

			equal(box, expected);
		});

		it("simple", () => {
			const lorem = "This is{----a test.";
			const expected = "This is{----a test.";
			const COLOR_SIZER = {
				open: "{",
				size: (str: string) => str.replace(/\{[A-Za-z]/g, "").length,
				unrenderedSequenceLength: (str: string, i: number) => {
					if (str[i] === "{") return 5;
					return 0;
				}
			};
			const wrapped = string.wrap(lorem, 14, COLOR_SIZER);
			equal(wrapped.join("?"), expected);
		});

		it("simple2", () => {
			const lorem = "This is{----a test.";
			const expected = "This is{----a test.";
			const COLOR_SIZER = {
				open: "{",
				size: (str: string) => str.replace(/\{[A-Za-z]/g, "").length,
				unrenderedSequenceLength: (str: string, i: number) => {
					if (str[i] === "{") return 5;
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
				`This is a ${colors.magenta("test")}. This is a ${colors.yellow(
					"test"
				)}. This is a ${colors.cyan("test")}.`
			];
			const expected = [
				"This is a test.",
				"This is a test.",
				"This is a test.",
				`This is a ${colors.magenta("test")}.`,
				`This is a ${colors.yellow("test")}.`,
				`This is a ${colors.cyan("test")}.`
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
			const lorem =
				"a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa aa aaaaaaaaa";
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

		it("respects linebreaks", () => {
			// Test with Unix linebreaks (\n)
			const unixText =
				"This is the first line.\nThis is the second line.\nThis is the third line.";
			const unixWrapped = string.wrap({ string: unixText, width: 50 });
			equal(unixWrapped.length, 3);
			equal(unixWrapped[0], "This is the first line.");
			equal(unixWrapped[1], "This is the second line.");
			equal(unixWrapped[2], "This is the third line.");

			// Test with Windows linebreaks (\r\n)
			const windowsText = "First line.\r\nSecond line.\r\nThird line.";
			const windowsWrapped = string.wrap({ string: windowsText, width: 50 });
			equal(windowsWrapped.length, 3);
			equal(windowsWrapped[0], "First line.");
			equal(windowsWrapped[1], "Second line.");
			equal(windowsWrapped[2], "Third line.");

			// Test with linebreaks that would normally be wrapped
			const longWithBreaks =
				"This is a very long line that would normally wrap.\nBut it has a linebreak.\nAnd another one here.";
			const longWrapped = string.wrap({ string: longWithBreaks, width: 20 });
			const expected = [
				"This is a very long",
				"line that would",
				"normally wrap.",
				"But it has a",
				"linebreak.",
				"And another one",
				"here."
			];
			deepEqual(longWrapped, expected);
		});

		it("prefix", () => {
			// Test basic prefix - first line has no prefix and uses full width, subsequent lines do
			const text = "This is a long line that will wrap into multiple lines.";
			const wrapped = string.wrap({ string: text, width: 20, prefix: "> " });
			equal(wrapped.length, 4);
			equal(wrapped[0], "This is a long line");
			equal(wrapped[1], "> that will wrap");
			equal(wrapped[2], "> into multiple");
			equal(wrapped[3], "> lines.");

			// Test prefix with single line (no prefix should be added)
			const singleLine = "Short line.";
			const singleWrapped = string.wrap({
				string: singleLine,
				width: 50,
				prefix: "> "
			});
			equal(singleWrapped.length, 1);
			equal(singleWrapped[0], "Short line.");

			// Test prefix with linebreaks
			const withBreaks = "First line.\nSecond line that wraps.\nThird line.";
			const breakWrapped = string.wrap({
				string: withBreaks,
				width: 20,
				prefix: "  "
			});
			equal(breakWrapped.length, 4);
			equal(breakWrapped[0], "First line.");
			equal(breakWrapped[1], "  Second line that");
			equal(breakWrapped[2], "  wraps.");
			equal(breakWrapped[3], "  Third line.");

			// Test prefix with indentation
			const indented = "This is a very long line that needs to be wrapped.";
			const indentedWrapped = string.wrap({
				string: indented,
				width: 30,
				prefix: "    "
			});
			equal(indentedWrapped.length, 2);
			equal(indentedWrapped[0], "This is a very long line that");
			equal(indentedWrapped[1], "    needs to be wrapped.");

			// Test prefix respects width calculation
			const widthTest = "A".repeat(50);
			const widthWrapped = string.wrap({
				string: widthTest,
				width: 20,
				prefix: "> "
			});
			// First line should use full width (20 chars, no prefix)
			equal(widthWrapped[0].length, 20);
			equal(widthWrapped[0].endsWith("-"), true); // Word break with hyphen
			// Subsequent lines should have prefix and be at most 20 chars total
			// (18 chars content + 2 chars prefix = 20 total)
			for (let i = 1; i < widthWrapped.length; i++) {
				equal(widthWrapped[i].startsWith("> "), true);
				ok(widthWrapped[i].length <= 20); // At most 20 chars (last line may be shorter)
			}

			// Test prefix signature with direct parameters
			const directPrefix = string.wrap(
				"This is a test that wraps.",
				15,
				undefined,
				"> "
			);
			equal(directPrefix.length, 2);
			equal(directPrefix[0], "This is a test");
			equal(directPrefix[1], "> that wraps.");

			// Test prefix signature with sizer
			const withSizer = string.wrap(
				"This is a test.",
				10,
				string.TERM_SIZER,
				"  "
			);
			equal(withSizer.length, 2);
			equal(withSizer[0], "This is a");
			equal(withSizer[1], "  test.");
		});
	});

	describe("box", () => {
		it("color", () => {
			const style: string.BoxStyle = {
				...string.BOX_STYLES.PLAIN,
				titleBorder: { left: "<", right: ">" },
				hAlign: string.PAD_SIDE.CENTER
			};

			const box = string.box({
				input: ["This is a test.", `This is a ${colors.red("test")}.`],
				style: style,
				title: `Go to ${combineStyles(colors.yellow, colors.bold)("HELL")}`,
				width: 30,
				sizer: string.TERM_SIZER,
				color: colors.yellow
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
			const style: string.BoxStyle = {
				...string.BOX_STYLES.PLAIN,
				titleBorder: { left: "<", right: ">" },
				hAlign: string.PAD_SIDE.CENTER
			};

			const box = string.box({
				input: [
					"This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test."
				],
				style: style,
				title: `Go to ${combineStyles(colors.yellow, colors.bold)("HELL")}`,
				width: 30,
				sizer: string.TERM_SIZER,
				color: colors.yellow
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
			const style: string.BoxStyle = {
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
					style: {
						...string.BOX_STYLES.PLAIN,
						hPadding: 2,
						top: { left: ">>", right: "<<" },
						bottom: { left: ">>", right: "<<" },
						left: ">>",
						right: "<<"
					},
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
			const rounded = {
				...string.BOX_STYLES.ROUNDED,
				hAlign: string.PAD_SIDE.CENTER,
				titleHAlign: string.PAD_SIDE.CENTER,
				vPadding: 1
			};

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
			const obox: string.BoxStyle = {
				...string.BOX_STYLES.O,
				top: { corner: "o" },
				hAlign: string.PAD_SIDE.LEFT,
				titleHAlign: string.PAD_SIDE.LEFT
			};

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
