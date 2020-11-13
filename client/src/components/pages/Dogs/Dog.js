import React from 'react';

import Button from '../../UI/Button/Button';
import { translateDate } from '../../../utility/date_formatter';
import classes from './Dog.module.css';

export default function Dog(props) {
	return (
		<div className={classes.Dog}>
			<img src={props.photoSrc} className={classes.Image} alt={props.name + " is a " + props.age + " year old " + props.gender + ", " + props.breed + "."}/>
			<h3>{props.name}</h3>
			<h5>{props.breed}</h5>
			<p>{props.age} years old</p>
			<p>{props.weight} lbs</p>
			<p>Cake Day <span className={classes.Date}>{translateDate(props.birthday)}</span></p>
			<Button btnType='submit' _id={props._id} clicked={(event) => props.adoptDog(event)}>Adopt!</Button>
		</div>
	);
}