import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/pages/Header/Header';
import asyncComponent from './components/hoc/asyncComponent';

const asyncDogList = asyncComponent(() => import('./components/pages/Dogs/DogList'));

class App extends Component {
	state = {
		currentUser: null
	}

	componentDidMount() {
		fetch('/api/current_user')
			.then(res => res.json())
			.then(resData => resData._doc)
			.then(user => {
				this.setState({ currentUser: user.googleId });
			}).catch(error => error)
	}

  render() {
		return (
			<div className="row" stye={{ width: "95%" }}>
			<Header currentUser={this.state.currentUser} />
				<Route exact path="/dogs" component={asyncDogList} />
    	</div>
		);
	}
}

export default App;
