import React, { Component } from 'react'
import './App.css';
import Search from './Search'

class Profile extends Component {
    state = {
        trackData: []
    }

    getTrackAnalysis = async (track) => {
        try {
            const trackData = await fetch('http://localhost:8888/search', {
                method: 'POST',
                body: JSON.stringify({ track: track }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (trackData.status !== 401) {
                console.log("TRACK DATAAAAAAAAAAA\n", trackData)
                const trackDataJson = await trackData.json()
                this.setState({
                	trackData: trackDataJson
                })
                console.log("HEEEEEEEEEEEEEEYYYYYYY\n")
                return trackDataJson
            } else {
                this.setState({
                    trackData: null
                })
            }
        } catch (err) {
            console.log(err.name, 'error in getTrackData catch block')
            return err
        }
    }

    render() {
        return (
            <div>
				<p>Logged in as {this.props.userInfo.display_name}</p>
				<Search getTrackAnalysis={this.getTrackAnalysis} trackData={this.state.trackData}/>
			</div>
        )
    }
}

export default Profile