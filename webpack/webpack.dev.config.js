var path = require('path');
var webpack = require('webpack');

const HOST = (process.env.HOST || 'localhost');
const PORT = (+process.env.PORT) || 3000;

module.exports = {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		bundle: [
			'../src/client.js',
			'webpack/hot/webpack-dev-server',
			`webpack-dev-server/client?http://${HOST}:${PORT}/`
		],
		vendor: [
			'react',
			'react-dom'
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
			minChunks: Infinity
		}),
		new webpack.DefinePlugin({

		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	}
}
