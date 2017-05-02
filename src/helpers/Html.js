import React from 'react';
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';

export default class Html extends React.Component {
	render() {
		const { assets, component, store } = this.props;
		const app = component ? renderToString(component) : ' ';
		return (
			<html>
				<head>
					<title>React Redux Demo</title>
				</head>
				<body>
					<div id="app" dangerouslySetInnerHTML={{ __html: app }} />
					<script dangerouslySetInnerHTML={{  __html: `window.__redux_data__=${serialize(store.getState())};` }} charSet="urt-8" />
					<script src="http://localhost:3001/dist/manifest.min.js" charSet="urt-8" />
					<script src="http://localhost:3001/dist/vendor.min.js" charSet="urt-8" />
					<script src="http://localhost:3001/dist/main.min.js" charSet="urt-8" />
				</body>
			</html>
		);
	}
}

Html.propTypes = {
	assets: PropTypes.object,
	component: PropTypes.node,
	store: PropTypes.object
}
