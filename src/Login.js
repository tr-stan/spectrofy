import React, { Component } from 'react'
import './App.css';

class Login extends Component {
	state = {
		authenticated: false
	}

	render() {
		return(
			<div id="login">
			<a href="https://audio-vision.herokuapp.com/auth/spotify">LOGIN WITH SPOTIFY</a>
			</div>
		)
	}
}

export default Login