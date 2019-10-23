import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import './App.css';

// Main component for rendering whole app and fetching data to pass as props to children components
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/:paused?:year?" component={HomePage} />
      </Router>
    );
  }
}

export default App;
