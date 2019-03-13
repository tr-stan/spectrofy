import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Home from './Home'

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
                </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
