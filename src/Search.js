import React, { Component } from 'react'
import './App.css';
import TrackList from './TrackList'

class Search extends Component {
	state = {
		track: '',
		complete: false
	}

	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({complete: false})
		this.props.getTrackData(this.state.track)
	}

	analyzed = () => {
		this.setState({complete: true})
	}

	render() {
		return(
			<div>
				<p>Spectrofy visualizes track data from Spotify's Web API via its <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/" target="_blank" rel="noopener noreferrer">track audio analysis</a> endpoint.</p>
				<p>Search for a song to see it visualized.</p>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Track Name" name="track" value={this.state.value} onChange={this.handleChange} autocomplete="off"/>
					<button type="submit">Submit</button>
				</form>
				<TrackList analyzed={this.analyzed} complete={this.state.complete} trackData={this.props.trackData} accessToken={this.props.accessToken}/>
			</div>
		)
	}
}

export default Search