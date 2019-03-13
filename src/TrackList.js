import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

class TrackList extends Component {
	state = {
		analysis: []
	}
	handleSumbit = (event) => {

	}
	render() {
		console.log(this.props.trackData)
        const listTracks = this.props.trackData.map((item, index) =>
        	<li key={index}>
        	<button onSubmit={this.handleSumbit}><Link to={`/analysis/${item.track}/${item.id}`}>{item.track} ----- by {item.artist.name}</Link></button>
        	</li>
        )
        return (
        	<ul>
			{listTracks}
			</ul>
        )

    }
}

export default TrackList