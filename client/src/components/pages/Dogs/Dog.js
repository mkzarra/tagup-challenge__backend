import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import classes from './Dog.module.css';
import { translateDate } from '../../../utility/date_formatter';

export default function Dog(props) {
	const yearsOld = props.age === 1 ? 'year old' : 'years old';
	return (
		<div className={classes.Dog}>
			<div className={classes.ImageContainer}>
				<img src={props.photoSrc} className={classes.Image} alt={props.name + " is a " + props.age + " year old " + props.gender + ", " + props.breed + "."}/>
			</div>
			<h3>{props.name}</h3>
			<h5>{props.breed}</h5>
			<p>{props.age} {yearsOld}</p>
			<p>{props.weight} lbs</p>
			<p>Cake Day <span className={classes.Date}>{translateDate(props.birthday)}</span></p>
			<div className={classes.ButtonContainer}>
				<Link to={{
					pathname: "/dogs/" + props._id,
					state: {
						currentUser: props.currentUser
					}
				}}>More Info</Link>
				<Button btnType='submit' _id={props._id} clicked={props.adoptDog}>Adopt!</Button>
			</div>
		</div>
	);
}