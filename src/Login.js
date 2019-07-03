import React, { Component } from 'react'
import './App.css';

class Login extends Component {
	state = {
		authenticated: false
	}

	render() {
		let redirectURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8888' : 'https://spectrofy.netlify.com'
		return(
			<div id="login">
			<a href={`${redirectURL}/auth/spotify`}>LOGIN WITH SPOTIFY</a>
			</div>
		)
	}
}

export default Login