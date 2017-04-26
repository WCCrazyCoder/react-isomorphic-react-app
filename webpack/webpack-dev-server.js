var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

const PORT = (+process.env.PORT) || 3000;
const webpackConfig = require('./webpack.dev.config');
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
	inline: true,
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true
	}
});
server.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`=====>  🌍  Webpack development server listening on port ${ PORT }`);
	}
});
