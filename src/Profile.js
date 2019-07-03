import React, { Component } from 'react'
import './App.css';
import Search from './Search'

class Profile extends Component {
    state = {
        trackData: []
    }

    getTrackData = async (track) => {
        let fetchURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8888' : 'https://spectrofy.netlify.com'
        try {
            const trackData = await fetch(`${fetchURL}/search/${this.props.accessToken}`, {
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
                <Search getTrackData={this.getTrackData} trackData={this.state.trackData} accessToken={this.props.accessToken}/>
                <p>Each bubble in a track's visualization represents a 0.2 - 1 second-long segment of the track provided by Spotify's 'track audio analysis' API endpoint.</p>
                <p>Each bubble's diameter/size is determined by the maximum loudness of that specific segment.</p>
                <p>Each bubble's color is determined by it's pitch data. I converted the pitch data for the segment into an RGBA value, with the opacity determined by the data confidence for that specific segment of data.</p>
                <p>Lastly, I really wanted to incorporate the timbre data and some randomness into the visualization. So, I took a random data point from each segment's array of timbre data and used it to determine the bubble's starting location and velocity.</p>     
                <p id="logged">Logged in as {this.props.userInfo.display_name}</p>
            </div>
        )
    }
}

export default Profile