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

	adoptDogHandler = (event) => {
		event.preventDefault();
		fetch('/api/dogs/' + event.target.id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			user: this.props.currentUser,
			params: event.target.id
		}).then(res => {
			console.log(res)
			// this.setState({ dogList })
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
						adoptDog={(event) => this.adoptDogHandler(event)}
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