import React, { Component } from 'react'
import './App.css';

class Login extends Component {
	state = {
		authenticated: false
	}

	render() {
		return(
			<div>
			<a href="https://audio-vision.herokuapp.com/auth/spotify">Login with Spotify</a>
			</div>
		)
	}
}

export default Login