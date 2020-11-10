import React from 'react';

import classes from './Dog.module.css';

export default function Dog(props) {
	return (
		<div className={classes.Dog} style={{ backgroundImage: "url(" + props.photoSrc + ")" }}>
			{props.children}
		</div>
	);
}