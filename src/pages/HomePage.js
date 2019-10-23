import React, { Component } from 'react';
import queryString from 'query-string';
import BarChartWrapper from '../components/BarChart';

class HomePage extends Component {
  constructor(props) {
    super(props);

    const { paused, year } = queryString.parse(this.props.location.search);

    this.state = {
      isFetching: false,
      data: [],
      paused: paused,
      year: year,
    };
  }

  // Fetching data
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
      return (
        <BarChartWrapper
          year={this.state.year}
          paused={this.state.paused}
          data={this.state.data}
        />
      );
    }
    return <p>Please wait</p>;
  }
}

export default HomePage;
