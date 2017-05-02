const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools')).development(process.env.NODE_ENV === 'development');

const HOST = (process.env.HOST || 'localhost');
const PORT = (+process.env.PORT + 1) || 3001;

module.exports = {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: [
			'./src/client.js',
			'webpack/hot/only-dev-server',
			`webpack-dev-server/client?http://${HOST}:${PORT}/`
		],
		vendor: [
			"react",
			"react-dom"
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: `http://${HOST}:${PORT}/dist/`,
		chunkFilename: '[name].[chunkhash].min.js',
		filename: '[name].min.js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}, {
			test: /\.(css|scss)$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?importLoaders=2&modules=true&camelCase=true&sourceMap=true&localIdentName=[name]__[local]--[hash:base64:5]', 'sass-loader', 'postcss-loader']
			})
		}, {
			test: webpackIsomorphicToolsPlugin.regular_expression('images'),
			exclude: /node_modules/,
			use: ['file-loader', 'url-loader?limit=10240']
		}]
	},
	plugins: [
		webpackIsomorphicToolsPlugin,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
			filename: '[name].min.js',
			minChunks: Infinity
		}),
		new ExtractTextPlugin({
			filename: '[name].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				BABEL_ENV: JSON.stringify('development')
			},
			__CLIENT__: true,
			__SERVER__: false,
			__PRODUCTION__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: true
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	}
}
