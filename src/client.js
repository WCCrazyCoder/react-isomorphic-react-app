require('./client.css');

// es6 work.
// import React from 'react/dist/react.min';
// import ReactDOM from 'react-dom/dist/react-dom.min';
import Message from './messages';
const message = () => `<h1>${Message.message}</h1>`;

const app = document.getElementById('app');
app.innerHTML = message();

// function HelloWorld(props) {
// 	return (
// 		<h1> 
// 			Hello World AS
// 		</h1>
// 	);
// }

// ReactDOM.render(<HelloWorld />, app);


if (module.hot) {
	module.hot.accept();
}
