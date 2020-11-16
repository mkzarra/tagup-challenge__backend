import React, { Component, memo } from 'react';
import { Link } from 'react-router-dom';

import DogDetails from './DogDetails';
import Dog from './Dog';
// import DogEdit from './DogEdit';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './DogList.module.css';

class DogList extends Component {
	state = {
		loading: true,
		dogList: [],
		error: null
	}

	getDogsIndex = () => {
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

	componentDidMount() {
		this.getDogsIndex();
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
			console.log(res);
			this.getDogsIndex();
		}).catch(error => {
			this.setState({ error });
		});
	}
	
	render() {
		const { dogList, loading, error } = this.state;
		
		let dogCards = <Spinner />
		if (dogList.length && !loading && !error) {
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
						adoptDog={this.adoptDogHandler}
						currentUser={this.props.currentUser}
					/>
				);
			});
		}

		if (error) {
			dogCards = <pre>error</pre>
		}

		return (
			<div className={classes.DogList}>
				{dogCards}
			</div>
		);
	}
}

export default memo(DogList);