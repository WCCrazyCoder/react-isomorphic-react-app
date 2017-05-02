import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../redux/modules/reducers';

export default function configureStore(preloadedState={}) {
	let store;
	store = createStore(
			reducers,
			preloadedState,
			compose(
				applyMiddleware(thunk)
			)
		);
	return store;
}
