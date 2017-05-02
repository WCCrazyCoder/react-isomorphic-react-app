import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, Switch } from 'react-router-dom';
import { 
	App,
	Home,
	About 
} from './containers';

export default (store) => {
	return (
		<App>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
			</Switch>
		</App>
	);
}
