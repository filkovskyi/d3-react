import React, { Component } from 'react';
import Chart from './Chart';

class BarChartWrapper extends Component {
  constructor(props) {
    super(props);

    const yearsArr = props.data.map(i => i.year);

    const currentYearDataSet = props.data.filter(
      i => i.year === Math.min(...yearsArr),
    );

    this.state = {
      minYear: Math.min(...yearsArr),
      maxYear: Math.max(...yearsArr),
      currentYear: Math.min(...yearsArr),
      currentData: currentYearDataSet,
    };

    this.startTimeTravel = this.startTimeTravel.bind(this);
  }

  startTimeTravel() {
    this.setState({
      currentYear: this.state.currentYear + 1,
      currentData: this.props.data.filter(i => i.year === this.state.currentYear),
    });
  }

  render() {
    if (this.state.currentData.length) {
      return (
        <div>
          <button className="playBtn" onClick={this.startTimeTravel}>
            START
          </button>
          <Chart data={this.state.currentData} />
        </div>
      );
    }
    return null;
  }
}

export default BarChartWrapper;
