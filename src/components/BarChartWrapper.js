import React, { Component } from 'react';
import BarChart from './BarChart';

class BarChartWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minYear: null,
      maxYear: null,
      currentYear: null,
      currentData: [],
    };

    this.setCurrentDataSet.bind(this);
  }

  // Set max and min and first counted year of dataset's years
  setCurrentDataSet() {
    const yearsArr = this.props.data.map(i => i.year);

    const currentYearDataSet = this.props.data.filter(
      i => i.year === Math.min(...yearsArr),
    );

    this.setState({
      ...this.state,
      minYear: Math.min(...yearsArr),
      maxYear: Math.max(...yearsArr),
      currentYear: Math.min(...yearsArr),
      currentData: currentYearDataSet,
    });
  }

  componentDidMount() {
    this.setCurrentDataSet();
  }

  render() {
    if (this.state.currentData.length) {
      return <BarChart data={this.state.currentData} />;
    }
    return null;
  }
}

export default BarChartWrapper;
