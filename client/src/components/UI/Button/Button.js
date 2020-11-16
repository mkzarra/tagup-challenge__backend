import React from 'react';
import classes from './Button.module.css';

export default function Button(props) {
	return (
		<button id={props._id} name={props.name} type={props.btnType} className={classes.Button} onClick={(event) => props.clicked(event)}>
			{props.children}
		</button>
	);
}
