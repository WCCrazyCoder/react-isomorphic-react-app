var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var path = require('path');

const PORT = (+process.env.PORT + 1) || 3001;
const webpackConfig = require('./webpack.dev.config');
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
	// quiet: true,
	compress: true,
	inline: true,
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	headers: { 'Access-Control-Allow-Origin': '*' },
	stats: {
		colors: true
	}
});

server.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`=====>  🌍  Webpack-dev-server development server listening on port ${ PORT }`);
	}
});
