import React, { Component } from 'react';
import BarChartWrapper from './components/BarChartWrapper';
import './App.css';

// Main component for rendering whole app and fetching data to pass as props to children components
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      data: [],
    };
  }

  //Make fetching data
  componentDidMount() {
    this.setState({ ...this.state, isFetching: true });
    fetch('../wild-pig-data.json')
      .then(response => response.json())
      .then(result => {
        this.setState({ data: result['PIG POPULATIONS'], isFetching: false });
      })
      .catch(e => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  }

  render() {
    if (this.state.data.length) {
      return <BarChartWrapper data={this.state.data} />;
    }
    return <p>Something goes wrong with data fetching</p>;
  }
}

export default App;
