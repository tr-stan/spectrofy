import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import Analysis from './Analysis'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
                <nav className='nav'>
                  <Link to="/">Audio-Vision</Link>{" "}
                </nav>
                <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/analysis/:trackName/:trackId" component={Analysis} />
                </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
