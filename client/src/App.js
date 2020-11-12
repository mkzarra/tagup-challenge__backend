import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/pages/Header/Header';
import asyncComponent from './components/hoc/asyncComponent';
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
				console.log(user);
				this.setState({ currentUser: user.googleId });
			}).catch(error => error)
	}

	adoptDogHandler = (event) => {
		console.log(event.target.id)
		event.preventDefault()
		fetch('/api/dogs/' + event.target.id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			user: this.state.currentUser,
			params: event.target.id
		}).then(res => {
			console.log(res);
		});
	}

	render() {
		const appHeader = this.state.currentUser && <Header currentUser={this.state.currentUser} />
		return (
			<div className="row" style={{ width: "95%" }}>
				{appHeader}
				<Route exact path="/dogs" render={() => <DogList currentUser={this.state.currentUser} adoptDogHandler={this.adoptDogHandler} />} />
    	</div>
		);
	}
}

export default App;
