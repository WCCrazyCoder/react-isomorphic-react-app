import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './common/store/configureStore';
import routes from './routes';

const preloadedState = window.__redux_data__;
const store = configureStore(preloadedState);

const component = (
	<Provider store={store} key="provider">
		<BrowserRouter>
			<div>
				{ routes(store) }
			</div>
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(component, document.getElementById('app'));
