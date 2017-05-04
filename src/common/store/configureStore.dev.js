import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../redux/modules/reducers';

export default function configureStore(preloadedState={}) {
	let store;
	if (__CLIENT__ && __DEVTOOLS__) {
		store = createStore(
			reducers,
			preloadedState,
			compose(
				applyMiddleware(thunk)
			)
		);
	} else {
		store = createStore(
			reducers,
			preloadedState,
			compose(
				applyMiddleware(thunk)
			)
		);
	}

	if (module.hot) {
		// module.hot.accept('../../redux/modules/reducers', () => {
		// 	const nextRooterReducer = require('../../redux/modules/reducers');
		// 	store.replaceReducer(nextRooterReducer);
		// });
		module.hot.accept();
	}
	return store;
}
