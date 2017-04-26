var path = require('path');
var webpack = require('webpack');

const HOST = (process.env.HOST || 'localhost');
const PORT = (+process.env.PORT) || 3000;

module.exports = {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: [
			'./src/client.js',
			'webpack/hot/only-dev-server',
			`webpack-dev-server/client?http://${HOST}:${PORT}`
		],
		react: [
			"react"
		],
		reactdom: [
			"react-dom/dist/react-dom.min"
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}, {
			test: /\.css|scss$/,
			exclude: /node_modules/,
			use: ['style-loader', 'css-loader']
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['react', 'reactdom', 'manifest'],
			filename: '[name].js',
			minChunks: 2
		}),
		
		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.DefinePlugin({

		// })
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	}
}
