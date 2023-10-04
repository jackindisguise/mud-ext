import * as string from "./string.mjs";
import { expect } from "chai";
describe("string.ts", () => {
    describe("padders", () => {
        it("pad", (done) => {
            expect(string.pad("test", 10, string.PAD_SIDE.LEFT)).is.equal("      test");
            expect(string.pad("test", 10, string.PAD_SIDE.LEFT, "-")).is.equal("------test");
            expect(string.pad("50", 10, string.PAD_SIDE.LEFT, "0")).is.equal("0000000050");
            expect(string.pad("test", 10, string.PAD_SIDE.RIGHT)).is.equal("test      ");
            expect(string.pad("test", 10, string.PAD_SIDE.RIGHT, "<>{}")).is.equal("test<>{}<>");
            expect(string.pad("test", 10, string.PAD_SIDE.RIGHT, "-")).is.equal("test------");
            expect(string.pad("50.", 10, string.PAD_SIDE.RIGHT, "0")).is.equal("50.0000000");
            expect(string.pad("test", 10, string.PAD_SIDE.CENTER)).is.equal("   test   ");
            expect(string.pad("test", 10, string.PAD_SIDE.CENTER, "<>")).is.equal("<><test><>");
            expect(string.pad("test", 80, string.PAD_SIDE.CENTER, "<->")).is.equal("<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-");
            expect(string.pad("test", 10, string.PAD_SIDE.CENTER, "-")).is.equal("---test---");
            expect(string.pad("test", 11, string.PAD_SIDE.CENTER, "-")).is.equal("---test----");
            done();
        });
        it("padLeft", (done) => {
            expect(string.padLeft("test", 10)).is.equal("      test");
            expect(string.padLeft("test", 10, "-")).is.equal("------test");
            expect(string.padLeft("50", 10, "0")).is.equal("0000000050");
            done();
        });
        it("padRight", (done) => {
            expect(string.padRight("test", 10)).is.equal("test      ");
            expect(string.padRight("test", 10, "<>{}")).is.equal("test<>{}<>");
            expect(string.padRight("test", 10, "-")).is.equal("test------");
            expect(string.padRight("50.", 10, "0")).is.equal("50.0000000");
            done();
        });
        it("padCenter", (done) => {
            expect(string.padCenter("test", 10)).is.equal("   test   ");
            expect(string.padCenter("test", 10, "<>")).is.equal("<><test><>");
            expect(string.padCenter("test", 80, "<->")).is.equal("<-><-><-><-><-><-><-><-><-><-><-><-><-test<-><-><-><-><-><-><-><-><-><-><-><-><-");
            expect(string.padCenter("test", 10, "-")).is.equal("---test---");
            expect(string.padCenter("test", 11, "-")).is.equal("---test----");
            done();
        });
    });
    describe("wrap", () => {
        it("ideal", (done) => {
            let lorem = [
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
            let blob = lorem.join(" ");
            let limited = string.wrap(blob, 80).join("-");
            let expected = [
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
            let lorem = ("a".repeat(80)) + ("b".repeat(80));
            let limited = string.wrap(lorem, 80).join("*");
            let expected = [
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-",
                "abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-",
                "bb"
            ].join("*");
            expect(limited).is.equal(expected);
            done();
        });
        it("short and long", (done) => {
            let lorem = "a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa aa aaaaaaaaa";
            let limited = string.wrap(lorem, 10).join("*");
            let expected = [
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
        it("right-aligned (default)", (done) => {
            let generated = string.box({
                style: Object.assign(Object.assign({}, string.BOX_STYLE.PLAIN), { hPadding: 2, top: { left: ">>", right: "<<" }, bottom: { left: ">>", right: "<<" }, left: ">>", right: "<<" }),
                title: "Box Title",
                input: ["This is a line.", "This is another line."],
                width: 30
            }).join("\n");
            let expected = [
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
            let rounded = Object.assign(Object.assign({}, string.BOX_STYLE.ROUNDED), { hAlign: string.PAD_SIDE.CENTER, titleHAlign: string.PAD_SIDE.CENTER, vPadding: 1 });
            // generate a rounded box
            let generated = string.box({
                style: rounded,
                title: "Box Title",
                input: ["This is a line.", "This is another line."],
                width: 30
            }).join("\n");
            // test against expected
            let expected = [
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
            let obox = Object.assign(Object.assign({}, string.BOX_STYLE.O), { hAlign: string.PAD_SIDE.LEFT, titleHAlign: string.PAD_SIDE.LEFT });
            // generate an O box
            let generated = string.box({
                style: obox,
                title: "Box Title",
                input: ["This is a line.", "This is another line."],
                width: 30
            }).join("\n");
            // test against expected
            let expected = [
                "OOOOOOOOOOOOOOO( Box Title )OO",
                "O            This is a line. O",
                "O      This is another line. O",
                "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
            ].join("\n");
            expect(generated).is.equal(expected);
            done();
        });
    });
});
