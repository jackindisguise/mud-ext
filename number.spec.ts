import * as number from "./number";
import {expect} from "chai";

describe("number.ts", ()=>{
	describe("randomInt", ()=>{
		it("full range", (done)=>{
			let tests = 1000000;
			let low = 0;
			let high = 9;
			let range = high-low+1;
			let results: number[] = new Array(range);
			let expectedDistribution = tests/range;
			for(let i=0;i<tests;i++){
				const result = number.randomInt(low, high);
				if(results[result]) results[result]++;
				else results[result]=1;
			}

			for(let i=low;i<=high;i++) expect(results[i]).is.within(expectedDistribution*0.95,expectedDistribution*1.05);
			done();
		});
	});
});