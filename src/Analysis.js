import React, { Component } from 'react'
import './App.css'

class Analysis extends Component {

	render() {
		return(
			<button>Visualize {this.props.match.params.trackName}</button>
		)
	}
}

export default Analysis