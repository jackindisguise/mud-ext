const fs = require("fs");
fs.readdir("build", (err, files)=>{
	if(err) return;
	for(let file of files){
		if(file.indexOf(".js")===-1) continue;
		fs.readFile("build/"+file, "utf8", (err, data)=>{
			if(err) return;
			let newPath = file.slice(0,file.lastIndexOf(".js"))+".cjs";
			let fixed = data.replace(/\.\/string\.js/g, "./string.cjs");
			fs.writeFile("build/"+newPath, fixed, (err)=>{
				if(err) return;
				console.log(`generated ${newPath} from ${file}`);
				fs.rm("build/"+file, (err)=>{
					if(err) return;
					console.log(`deleted ${file}`);
				});
			});
		});
	}
});