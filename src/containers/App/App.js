import React from 'react';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello React sss</h1>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}
