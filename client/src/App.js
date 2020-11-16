import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/pages/Header/Header';
// import asyncComponent from './components/hoc/asyncComponent';
import DogList from './components/pages/Dogs/DogList';
// const asyncDogList = asyncComponent(() => import('./components/pages/Dogs/DogList'));

class App extends Component {
	state = {
		currentUser: null
	}

	componentDidMount() {
		fetch('/api/current_user')
			.then(res => res.json())
			.then(user => {
				this.setState({ currentUser: user.googleId });
			}).catch(error => error);
	}

	render() {
		return (
			<div className="row" style={{ width: "95%" }}>
				<Header currentUser={this.state.currentUser} />
				<Route exact path="/dogs" render={() => <DogList currentUser={this.state.currentUser} />} />
    	</div>
		);
	}
}

export default App;
