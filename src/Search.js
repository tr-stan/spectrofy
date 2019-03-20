import React, { Component } from 'react'
import './App.css';
import TrackList from './TrackList'

class Search extends Component {
	state = {
		track: '',
		complete: false,
	}

	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.getTrackData(this.state.track)
		this.setState({
			complete: false
		})
	}

	render() {
		return(
			<div>
				<p>Spectrofy visualizes track data from Spotify's Web API via its audio analysis object.</p>
				<p>Search for a song to see it visualized.</p>
				<p className="note">(for the time being you will have to reload the page to search for a new song)</p>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Track Name" name="track" value={this.state.value} onChange={this.handleChange}/>
					<button type="submit">Submit</button>
				</form>
				<TrackList trackData={this.props.trackData} complete={this.state.complete} />
			</div>
		)
	}
}

export default Search