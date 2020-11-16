import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
				<NavLink to="/dogs" className={classes.Link} activeClassName={classes.ActiveLink}>
						Dogs
				</NavLink>
			</li>,
			<li key="1">
				<NavLink to={authLink} className={classes.Link} activeClassName={classes.ActiveLink}>
					{linkText}
				</NavLink>
			</li>
		]; 
	}
	
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
          <NavLink
            to="/"
            className={[classes.Dogtime, "left brand-logo"].join(" ")}
          >
            <p>Dogtime!</p>
          </NavLink>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
			</nav>
		);
	}
}
