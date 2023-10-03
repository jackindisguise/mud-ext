import * as number from "./number";
import {expect, assert} from "chai";

describe("number.ts", ()=>{
	describe("lerp", ()=>{
		it("predictable", (done)=>{
			expect(number.lerp(0,100,0.5)).is.equal(50);
			expect(number.lerp(-50,50,0.5)).is.equal(0);
			done();
		});
	});

	describe("randomInt", ()=>{
		it("low<=result<=high", (done)=>{
			let tests = 1000;
			let low = 100;
			let high = 500;
			for(let i=0;i<tests;i++){
				const result = number.randomInt(low, high);
				assert(low<=result&&result<=high);
			}
			done();
		});

		it("full range", (done)=>{
			let tests = 10000;
			let low = 10;
			let high = 20;
			let range = high-low+1;
			let results: number[] = [];
			for(let i=0;i<tests;i++){
				const result = number.randomInt(low, high);
				if(results.includes(result)) continue;
				results.push(result);
			}
			expect(results.length).is.equal(range);
			done();
		});

		it("reliable distribution", (done)=>{
			let tests = 100000;
			let low = 1;
			let high = 5;
			let range = high-low+1;
			let results: number[] = new Array(range);
			let expectedDistribution = tests/range;
			for(let i=0;i<tests;i++){
				const result = number.randomInt(low, high);
				if(results[result-low]) results[result-low]++;
				else results[result-low]=1;
			}
			for(let i=low;i<=high;i++) expect(results[i-low]).is.within(expectedDistribution*0.95,expectedDistribution*1.05);
			done();
		});
	});

	describe("roll", ()=>{
		it("predictable", (done)=>{
			let tests = 10000;
			for(let i=0;i<tests;i++) expect(number.roll(2,100)).is.within(2,200);
			for(let i=0;i<tests;i++) expect(number.roll(2,100,5)).is.within(7,205);
			for(let i=0;i<tests;i++) expect(number.roll(2,100,-5)).is.within(-3,195);
			done();
		});
	});

	describe("actualRoll", ()=>{
		it("predictable", (done)=>{
			let die = 2;
			let sides = 6;
			let tests = 10000;
			for(let i=0;i<tests;i++) {
				let results = number.actualRoll(die, sides);
				for(let result of results) expect(result).is.within(1,sides);
				expect(results.reduce((sum, a)=>sum+=a, 0)).is.within(die, die+(die*sides));
			}
			done();
		});
	});
});