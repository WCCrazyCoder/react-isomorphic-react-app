var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var config = null;
try {
	config = JSON.parse(babelrc);
} catch(error) {
	console.error(' ====>  Error: error parsing you .babelrc');
	console.error(error);
}
require('babel-register')(config);
