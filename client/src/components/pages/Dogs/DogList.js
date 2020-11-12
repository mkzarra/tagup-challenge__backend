import React, { Component } from 'react';

import Dog from './Dog';
import DogEdit from './DogEdit';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './DogList.module.css';

class DogList extends Component {
	state = {
		dogList: []
	}

	componentDidMount() {
		fetch('/api/dogs', {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(resData => {
				this.setState({ dogList: [...resData.dogs]})
			});
		
	}

	render() {
		const { dogList } = this.state;
		
		let dogCards = <Spinner />
		if (dogList.length) {
			dogCards = dogList.map(dog => {
				<Dog
					key={dog._id}
					photoSrc={dog.photoSrc}
					breed={dog.breed}
					name={dog.name}
					age={dog.age}
					weight={dog.weight}
					fixed={dog.fixed}
					gender={dog.gender}
					hairType={dog.hairType}
					catFriendly={dog.catFriendly}
					dogFriendly={dog.dogFriendly}
					kidFriendly={dog.kidFriendly}
					leashTrained={dog.leashTrained}
					houseTrained={dog.houseTrained}
					birthday={dog.birthday}
					vaccines={dog.vaccines}
				/>
			});
		}

		return (
			<div>
				{dogCards}
			</div>
		);
	}
}

export default DogList;