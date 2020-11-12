import React from 'react';
import classes from './Button.module.css';

export default function Button(props) {
	return (
		<button id={props._id} type={props.btnType} className={classes.Button}>
			{props.children}
		</button>
	);
}
