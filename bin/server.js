require('../server.babel');

var path = require('path');
var rootDir = path.resolve(__dirname, '..');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__PRODUCTION__ = process.env.NODE_ENV === 'production';
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools')).server(rootDir, () => {
	require('../src/server.js');
});
