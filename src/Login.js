import React, { Component } from 'react'
import './App.css';

class Login extends Component {
	state = {
		authenticated: false
	}

	render() {
		return(
			<div>
			<a href="http://localhost:8888/auth/spotify">Login with Spotify</a>
			</div>
		)
	}
}

export default Login