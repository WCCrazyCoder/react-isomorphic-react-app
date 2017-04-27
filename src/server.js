var Express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var compression = require('compression');

var PORT = (+process.env.PORT) || 3000;

var app = new Express();
app.use(compression());
app.use(favicon(path.resolve(__dirname, '../assets/favicon.ico')))
app.use((req, res, next) => {
	if (__DEVELOPMENT__) {
		webpackIsomorphicTools.refresh();
	}
	next();
});

app.all('*', (req, res) => {
	res.send('Hello World');
	res.end();
})

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(` =====>  🌍  development server listening on port ${ PORT }`);
	}
});
