require('babel-polyfill');
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, Switch } from 'react-router-dom';
import { 
	App,
	Home,
	About 
} from './containers';

const CAbout = import('./containers/About/About')
	.then(module => module.default)
	.catch(err => console.log(err));

export default (store) => {
	return (
		<App>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={CAbout} />
			</Switch>
		</App>
	);
}
