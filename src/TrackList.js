import React, { Component } from 'react'
import './App/css'

class TrackList extends Component {

	render() {
        const listTracks = this.props.trackData.map((item, index) =>
        	<li key={index}>
        	<h2>{dog.name}: A cute {dog.age}-year-old {dog.breed}</h2>
        	<button value={index} onClick={this.handleDelete}>remove dog</button>
        	<input type="button" value="Update" onClick={this.props.updateDog.bind(null, index, dog)} />
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