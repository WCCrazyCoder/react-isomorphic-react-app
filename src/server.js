var Express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var compression = require('compression');
var PORT = (+process.env.PORT) || 3000;

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import routes from './routes';
import configureStore from './common/store/configureStore';
import Html from './helpers/Html';

var app = new Express();
app.use(compression());
app.use(favicon(path.resolve(__dirname, '../assets/favicon.ico')))
app.use((req, res) => {
	if (__DEVELOPMENT__) {
		webpackIsomorphicTools.refresh();
	}

	const store = configureStore();
	const context = {};
	const component = (
		<Provider store={store} key="provider">
			<StaticRouter location={req.url} context={context}>
				<div>
					{ routes(store) }
				</div>
			</StaticRouter>
		</Provider>
	);
	const html = '<!doctype html>' + renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />);
	res.send(html);
});

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(` =====>  🌍  development server listening on port ${ PORT }`);
	}
});
