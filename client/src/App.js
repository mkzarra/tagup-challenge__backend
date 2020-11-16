import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/pages/Header/Header';
// import asyncComponent from './components/hoc/asyncComponent';
import DogList from './components/pages/Dogs/DogList';
import DogDetails from './components/pages/Dogs/DogDetails';
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
			<div className="row">
				<Header currentUser={this.state.currentUser} />
				<Route exact path="/dogs" render={() => <DogList currentUser={this.state.currentUser} />} />
				<Route exact path="/dogs/:dogId" component={DogDetails} />
    	</div>
		);
	}
}

export default App;
