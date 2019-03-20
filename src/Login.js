import React, { Component } from 'react'
import './App.css';

class Login extends Component {
	state = {
		authenticated: false
	}

	// handleSubmit = () => {
		
	// }

	render() {
		return(
			<div>
			<a href="http://localhost:8888/auth/spotify">Login with Spotify</a>
			<p className="note">(you may have to try twice)</p>
			</div>
		)
	}
}

export default Login