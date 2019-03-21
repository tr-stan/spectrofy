import React, { Component } from 'react'
import './App.css';
import Search from './Search'

class Profile extends Component {
    state = {
        trackData: []
    }

    getTrackData = async (track) => {
        try {
            const trackData = await fetch('https://audio-vision.herokuapp.com/search', {
                method: 'POST',
                body: JSON.stringify({ track: track }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (trackData.status !== 401) {
                const trackDataJson = await trackData.json()
                this.setState({
                	trackData: trackDataJson
                })
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
				<Search getTrackData={this.getTrackData} trackData={this.state.trackData}/>
				<p id="logged">Logged in as {this.props.userInfo.display_name}</p>
			</div>
        )
    }
}

export default Profile