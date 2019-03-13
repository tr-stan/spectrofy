import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

class TrackList extends Component {
	state = {
		analysis: []
	}
	getAudioAnalysis = async (index, id) => {
		try {
			const analysis = await fetch('http://localhost:8888/analyze', {
				method: 'POST',
				body: JSON.stringify({ id: id }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
			})
			if (analysis.status !== 401) {
                console.log("AUDIO ANALYSIS DATAAAAAAAAAAA\n", analysis)
                const analysisJson = await analysis.json()
                this.setState({
                	analysis: analysisJson
                })
                console.log("HEEEEEEEEEEEEEEYYYYYYY\n")
                return analysisJson
            } else {
                this.setState({
                    analysis: null
                })
            }
		} catch (error) {
            console.log(error.name, 'error in getAudioAnalysis catch block')
            return error
        }
	}
	render() {
		console.log(this.props.trackData)
        const listTracks = this.props.trackData.map((item, index) =>
        	<li key={index}>
        	<button onClick={this.getAudioAnalysis.bind(null, index, item.id)}><Link to={`/analysis/${item.track}/${item.id}`}>{item.track} ----- by {item.artist.name}</Link></button>
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