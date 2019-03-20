import React, { Component } from 'react';
import './App.css';
import Profile from './Profile'
import Login from './Login'

class Home extends Component {
		state = {
		userInfo: []
	}

	getUserInfo = async () => {
		try {
            const userInfo = await fetch('http://localhost:8888/user')
            console.log(userInfo.status)
      		if (userInfo.status !== 401) {
            const userInfoJson = await userInfo.json()
            this.setState({ userInfo: userInfoJson })
            return userInfoJson
      		} else {
      			this.setState({
      				userInfo : null
      			})
      		} 
        } catch (err) {
            console.log(err.name, 'error in getUserInfo catch block')
            return err
        }
	}

	componentDidMount() {
        this.getUserInfo().then(data => console.log('UserInfo Data from API:', data))
    }

    render() {
        return (
            <div className="App">
            	<h1>spectrofy</h1>
            	{this.state.userInfo === null ? <Login userInfo={this.state.userInfo} /> : <Profile userInfo={this.state.userInfo} />}
        	</div>
        )
    }
}

export default Home
