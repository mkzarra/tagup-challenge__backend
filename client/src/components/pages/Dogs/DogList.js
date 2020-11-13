import React, { Component } from 'react';

import Dog from './Dog';
import DogEdit from './DogEdit';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './DogList.module.css';

class DogList extends Component {
	state = {
		loading: true,
		dogList: [],
		error: null
	}

	componentDidMount() {
		console.log(this.props.adoptDogHandler);
		fetch('/api/dogs', {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(resData => {
				console.log(resData.dogs)
				this.setState({ dogList: [...resData.dogs], loading: false })
			})
			.catch(error => {
				this.setState({ loading: false, error });
			});
		
	}

	render() {
		const { dogList, loading } = this.state;
		
		let dogCards = <Spinner />
		if (dogList.length && !loading) {
			dogCards = dogList.map(dog => {
				return (
					<Dog
						key={dog._id}
						_id={dog._id}
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
						adoptDog={this.props.adoptDogHandler}
					/>
				);
			});
		}

		return (
			<div className={classes.DogList}>
				{dogCards}
			</div>
		);
	}
}

export default DogList;