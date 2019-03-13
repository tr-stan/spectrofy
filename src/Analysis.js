import React, { Component } from 'react'
import './App.css'

class Analysis extends Component {

	render() {
		return(
			<div>
			<h2>Visualization for {this.props.match.params.trackName}</h2>
			<canvas></canvas>
			</div>
		)
	}
}

export default Analysis