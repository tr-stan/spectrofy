import React, { Component } from 'react'
import './App.css';
import TrackList from './TrackList'

class Search extends Component {
	state = {
		track: ''
	}

	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log("WOOOOOOOOOHOOOOOOOOO\n", this.state.track)
		this.props.getTrackAnalysis(this.state.track)
	}

	render() {
		console.log("IF THERE IS TRACK DATA ON THE TRACKLIST IT IS:", this.props.trackData)
		return(
			<div>
				<p>Search a song to see its visualization</p>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Track Name" name="track" value={this.state.value} onChange={this.handleChange}/>
					<button type="submit">Sumbit</button>
				</form>
				<TrackList trackData={this.props.trackData} />
			</div>
		)
	}
}

export default Search