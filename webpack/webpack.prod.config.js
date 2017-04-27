var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HOST = (process.env.HOST || 'localhost');
const PORT = (+process.env.PORT) || 3000;

module.exports = {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: [
			'./src/client.js'
		],
		vendor: [
			"react",
			"react-dom"
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		chunkFilename: '[name].[chunkhash].min.js',
		filename: '[name].[hash].min.js'
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
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
			filename: '[name].[hash].min.js',
			minChunks: Infinity
		}),
		new ExtractTextPlugin({
			filename: '[name].[contenthash].css'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				BABEL_ENV: JSON.stringify('production')
			},
			__CLIENT__: true,
			__SERVER__: false,
			__PRODUCTION__: true,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	}
}
