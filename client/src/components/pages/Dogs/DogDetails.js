import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';

import classes from './DogDetails.module.css';

export default class DogDetails extends Component {
	state = {
		error: null,
		loading: true,
		dogDetails: null,
		expandVaxList: false
	}

	componentDidMount() {
		console.log(this.props)
		fetch('/api' + this.props.match.url, {
			headers: {
				'Content-Type': 'application/json'
			},
			user: this.props.location.state.currentUser,
			params: this.props.match.params.dogId
		}).then(res => res.json())
			.then(resData => {
				return resData.dog;
			}).then(dogDetails => {
				this.setState({ dogDetails, loading: false });
				console.log(this.state.dogDetails)
			}).catch(error => {
			this.setState({ error, loading: false });
		});
	}

	toggleVaxClassList = (vaxClassList) => {
		vaxClassList.push(classes.ActiveVaccines)
		this.setState((prevState) => {
			return {
				...prevState,
				expandVaxList: !prevState.expandVaxList
			}
		});
	}

	render() {
		const { dogDetails, error, loading, expandVaxList } = this.state;
		let profile = <Spinner />;

		const householdCompatibility = [];
		
		if (!loading && error) profile = error;
		if (!loading && !error) {
			const potentialHousemates = {
			"dog": dogDetails.dogFriendly,
			"cat": dogDetails.catFriendly,
			"kid": dogDetails.kidFriendly
			}

			for (const pal in potentialHousemates) {
				if (potentialHousemates[pal]) householdCompatibility.push(<p key={pal}>{pal} friendly</p>);
			}

			const vaxClasses = [classes.Vaccines];

			const isLeashTrained = dogDetails.leashTrained ? <p>Enjoys on-leash walks</p> : <p>Needs a patient handler willing to work on leash manners</p>;
			const isHouseTrained = dogDetails.houseTrained ? <p>house trained</p> : <p>Chance of glee pees and oops poops</p>;
			const vaccination = dogDetails.vaccines ? dogDetails.vaccines.map(vac => <p key={vac}>{vac}</p>) : null;
			
			profile = (
				<div className={classes.DogProfile}>
						<div className={classes.ImageContainer}>
							<img src={dogDetails.photoSrc} className={classes.Image} alt={dogDetails.name + " is a " + dogDetails.age + " year old " + dogDetails.gender + ", " + this.props.breed + "."}/>
							<h1 className="right">{dogDetails.name}</h1>
						</div>
					<div className={classes.Wrapper}>
						<div className={vaxClasses.join(' ')} onClick={() => this.toggleVaxClassList(vaxClasses)}>
							<h6>Vaccines</h6>
							{vaccination}
						</div>
						<div className={[classes.DetailsContainer, 'right'].join(' ')}>
							<h5>{dogDetails.breed}</h5>
							<p>{dogDetails.gender}</p>
							<p>{dogDetails.weight} lbs</p>
							{householdCompatibility}
							{isLeashTrained}
							{isHouseTrained}
						</div>
					</div>
				</div>
			);
		}
		return (
			<div>
				{profile}
			</div>
		);
	}
}