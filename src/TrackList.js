import React, { Component } from 'react'
import './App.css'
import Analysis from "./Analysis"

class TrackList extends Component {
	state = {
		analysis: [],
        id: '',
        track: ''
	}
	getAudioAnalysis = async (index, id, track) => {
		try {
			const analysis = await fetch(`https://audio-vision.herokuapp.com/analyze/${this.props.accessToken}`, {
				method: 'POST',
				body: JSON.stringify({ id: id }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
			})
			if (analysis.status !== 401) {
                // console.log("AUDIO ANALYSIS DATAAAAAAAAAAA\n", analysis)
                const analysisJson = await analysis.json()
                this.setState({
                	analysis: analysisJson,
                    id: id,
                    track: track
                })
                this.props.analyzed()
                console.log("TRACK HAS BEEN ANALYZED\n")
                return analysisJson
            } else {
            	console.log("TRACK ANALYSIS ERROR")
                this.setState({
                    analysis : null
                })
            }
		} catch (error) {
            console.log(error.name, 'error in getAudioAnalysis catch block')
            return error
        }
	}

	render() {
        const listTracks = this.props.trackData.map((item, index) => {
        	return(
        	<li key={index}>
        	<button onClick={this.getAudioAnalysis.bind(null, index, item.id, item.track)}>{item.track} ----- by {item.artist.name}</button>
        	</li>
        )})
        return (
        	(!!this.props.complete) ? <Analysis analysis={this.state.analysis} track={this.state.track}/> :  <ul>{listTracks}</ul>
            )

    }
}

export default TrackList