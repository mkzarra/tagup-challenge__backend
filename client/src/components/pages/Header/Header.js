import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

export default class Header extends Component {
	renderContent() {
		let authLink = "/api/logout",
			linkText = "Logout";
		
		if (!this.props.currentUser) {
			authLink = "/auth/google";
			linkText = "Login With Google";
		}
		
		return [
			<li key="0">
				<Link to="/dogs">
					<strong>
						Dogs
          </strong>
				</Link>
			</li>,
			<li key="1">
				<a href={authLink}>
					{linkText}
				</a>
			</li>
		]; 
	}
	
	render() {
		return (
			<nav>
				<div className="nav-wrapper #49cece">
          <Link
            to="/"
            className={[classes.Dogtime, "left brand-logo"].join(" ")}
          >
            <p>Dogtime!</p>
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
			</nav>
		);
	}
}
