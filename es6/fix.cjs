const fs = require("fs");
console.log("converting ES6 exports to .mjs");
fs.readdir("build", (err, files) => {
	if (err) return;
	for (let file of files) {
		if (file.indexOf(".js") !== -1) {
			// .js > .mjs
			fs.readFile("build/" + file, "utf8", (err, data) => {
				if (err) return;
				let newPath = file.slice(0, file.lastIndexOf(".js")) + ".mjs";
				let fixed = data;
				for (let _file of files) {
					// find all our .js files
					if (_file.indexOf(".js") === -1) continue;
					// replace any potential references to the file with references to the new file
					let extensionless = _file.slice(0, _file.indexOf(".js"));
					fixed = fixed.replaceAll(
						`./${extensionless}`,
						`./${extensionless}.mjs`
					); // replace all includes with .mjs extension
				}
				fs.writeFile("build/" + newPath, fixed, (err) => {
					if (err) return;
					//console.log(`generated ${newPath} from ${file}`);
					fs.rm("build/" + file, (err) => {
						if (err) return;
						//console.log(`deleted ${file}`);
					});
				});
			});
		} else if (file.indexOf(".ts") !== -1) {
			// .ts > .mts
			fs.readFile("build/" + file, "utf8", (err, data) => {
				if (err) return;
				let newPath = file.slice(0, file.lastIndexOf(".ts")) + ".mts";
				let fixed = data;
				for (let _file of files) {
					// find all our .js files
					if (_file.indexOf(".js") === -1) continue;
					// replace any potential references to the file with references to the new file
					let extensionless = _file.slice(0, _file.indexOf(".js"));
					fixed = fixed.replaceAll(
						`./${extensionless}`,
						`./${extensionless}.mjs`
					); // replace all includes with .mjs extension
				}
				fs.writeFile("build/" + newPath, fixed, (err) => {
					if (err) return;
					//console.log(`generated ${newPath} from ${file}`);
					fs.rm("build/" + file, (err) => {
						if (err) return;
						//console.log(`deleted ${file}`);
					});
				});
			});
		}
	}
});
