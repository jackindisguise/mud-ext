const fs = require("fs");
const directories = ["cjs/build", "es6/build"];
console.log("clearing build directories");
for(const dir of directories) {
	fs.stat(dir, (err, stats)=>{
		if(err) return;
		if(!stats.isDirectory()) return;
		fs.rm(dir, {recursive:true, force:true}, (err)=>{
			if(err) return;
			console.log(`deleted directory ${dir}`);
		});
	});
}