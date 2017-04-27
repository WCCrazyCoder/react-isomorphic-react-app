require('./client.css');
const style = require('./test.scss');

// es6 work.
import React from 'react';
import ReactDOM from 'react-dom';
import Message from './messages';
const message = () => `<h1>${Message.message}</h1>`;

const app = document.getElementById('app');
// app.innerHTML = message();

function HelloWorld(props) {
	return (
		<h1 className={style.title}> 
			Hello World ASD
		</h1>
	);
}

ReactDOM.render(<HelloWorld />, app);


if (module.hot) {
	module.hot.accept();
}
