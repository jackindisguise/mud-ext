import * as string from "./string";
import { expect } from "chai";

describe("string.ts", () => {
	describe("padders", () => {
		it("pad", (done) => {
			expect(
				string.pad({ string: "test", width: 10 }, string.PAD_SIDE.LEFT)
			).is.equal("      test");
			expect(
				string.pad(
					{ string: "test", width: 10, padder: "-" },
					string.PAD_SIDE.LEFT
				)
			).is.equal("------test");
			expect(
				string.pad(
					{ string: "50", width: 10, padder: "0" },
					string.PAD_SIDE.LEFT
				)
			).is.equal("0000000050");
			expect(
				string.pad({ string: "test", width: 10 }, string.PAD_SIDE.RIGHT)
			).is.equal("test      ");
			expect(
				string.pad(
					{ string: "test", width: 10, padder: "<>{}" },
					string.PAD_SIDE.RIGHT
				)
			).is.equal("test<>{}<>");
			expect(
				string.pad(
					{ string: "test", width: 10, padder: "-" },
					string.PAD_SIDE.RIGHT
				)
			).is.equal("test------");
			expect(
				string.pad(
					{ string: "50.", width: 10, padder: "0" },
					string.PAD_SIDE.RIGHT
				)
			).is.equal("50.0000000");
			expect(
				string.pad({ string: "test", width: 10 }, string.PAD_SIDE.CENTER)
			).is.equal("   test   ");
			expect(
				string.pad(
					{ string: "test", width: 10, padder: "<>" },
					string.PAD_SIDE.CENTER
				)
			).is.equal("<><test><>");
			expect(
				string.pad(
					{ string: "test", width: 80, padder: "<->" },
					string.PAD_SIDE.CENTER
				)
			).is.equal(
				"<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-"
			);
			expect(
				string.pad(
					{ string: "test", width: 10, padder: "-" },
					string.PAD_SIDE.CENTER
				)
			).is.equal("---test---");
			expect(
				string.pad(
					{ string: "test", width: 11, padder: "-" },
					string.PAD_SIDE.CENTER
				)
			).is.equal("---test----");
			done();
		});

		it("padLeft", (done) => {
			expect(string.padLeft({ string: "test", width: 10 })).is.equal(
				"      test"
			);
			expect(
				string.padLeft({ string: "test", width: 10, padder: "-" })
			).is.equal("------test");
			expect(string.padLeft({ string: "50", width: 10, padder: "0" })).is.equal(
				"0000000050"
			);
			done();
		});

		it("padRight", (done) => {
			expect(string.padRight({ string: "test", width: 10 })).is.equal(
				"test      "
			);
			expect(
				string.padRight({ string: "test", width: 10, padder: "<>{}" })
			).is.equal("test<>{}<>");
			expect(
				string.padRight({ string: "test", width: 10, padder: "-" })
			).is.equal("test------");
			expect(
				string.padRight({ string: "50.", width: 10, padder: "0" })
			).is.equal("50.0000000");
			done();
		});

		it("padCenter", (done) => {
			expect(string.padCenter({ string: "test", width: 10 })).is.equal(
				"   test   "
			);
			expect(
				string.padCenter({ string: "test", width: 10, padder: "<>" })
			).is.equal("<><test><>");
			expect(
				string.padCenter({ string: "test", width: 80, padder: "<->" })
			).is.equal(
				"<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-"
			);
			expect(
				string.padCenter({ string: "test", width: 10, padder: "-" })
			).is.equal("---test---");
			expect(
				string.padCenter({ string: "test", width: 11, padder: "-" })
			).is.equal("---test----");
			done();
		});
	});

	describe("wrap", () => {
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
			expect(limited).is.equal(expected);
			done();
		});

		it("long", (done) => {
			const lorem = "a".repeat(80) + "b".repeat(80);
			const limited = string.wrap(lorem, 80).join("*");
			const expected = [
				"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-",
				"abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-",
				"bb"
			].join("*");
			expect(limited).is.equal(expected);
			done();
		});

		it("short and long", (done) => {
			const lorem =
				"a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa aa aaaaaaaaa";
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
			expect(limited).is.equal(expected);
			done();
		});
	});

	describe("box", () => {
		it("weird", (done) => {
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

			expect(generated).is.equal(expected);
			done();
		});

		it("right-aligned (default)", (done) => {
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

			expect(generated).is.equal(expected);
			done();
		});

		it("center-aligned", (done) => {
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

			expect(generated).is.equal(expected);
			done();
		});

		it("left-aligned", (done) => {
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

			expect(generated).is.equal(expected);
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

			expect(generated).is.equal(expected);
			done();
		});
	});

	describe("autocomplete", () => {
		it("it works", (done) => {
			expect(string.autocomplete("", "partial")).is.true;
			expect(string.autocomplete("p", "partial")).is.true;
			expect(string.autocomplete("part", "partial")).is.true;
			expect(string.autocomplete("partial", "part")).is.false;
			done();
		});
	});

	describe("matchKeywords", () => {
		it("it works", (done) => {
			expect(string.matchKeywords("the", "the cake is a lie")).is.true;
			expect(string.matchKeywords("cake", "the cake is a lie")).is.true;
			expect(string.matchKeywords("the cake", "the cake is a lie")).is.true;
			expect(string.matchKeywords("the pie", "the cake is a lie")).is.false;
			done();
		});
	});
});
