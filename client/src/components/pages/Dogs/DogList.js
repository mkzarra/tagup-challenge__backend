import React, { Component } from 'react';

import Dog from './Dog';
import DogEdit from './DogEdit';
import classes from './DogList.module.css';

class DogList extends Component {
	state = {
		dogList: []
	}

	componentDidMount() {
		fetch('/dogs')
			.then(res => res.json())
			.then(resJson => {
				console.log(resJson);
			});
	}

	render() {
		return (
			<div>
				
			</div>
		)
	}
}

export default DogList;