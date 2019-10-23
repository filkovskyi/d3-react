import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Chart from './Chart';

let yearInterval;

class BarChartWrapper extends Component {
  constructor(props) {
    super(props);

    const yearList = [...new Set(props.data.map(i => i.year))];

    const minYear = Math.min(...yearList);

    const maxYear = Math.max(...yearList);

    const currentYearDataSet = props.data.filter(i => i.year === minYear);

    this.state = {
      minYear,
      maxYear,
      yearList,
      currentYearDataSet,
      currentYear: minYear,
    };

    this.startTimeTravel = this.startTimeTravel.bind(this);
    this.stopTimeTravel = this.stopTimeTravel.bind(this);
    this.setIncrementYear = this.setIncrementYear.bind(this);
    this.setDecrementYear = this.setDecrementYear.bind(this);
    this.handleIncrementYear = this.handleIncrementYear.bind(this);
  }

  // utils and helpers
  setIncrementYear = currentYear => {
    return ++currentYear;
  };

  setDecrementYear = currentYear => {
    return --currentYear;
  };

  startTimeTravel = () =>
    (yearInterval = setInterval(() => {
      this.setYearDataSet();
    }, 2000));

  stopTimeTravel = () => clearTimeout(yearInterval);

  // Setting data-set for year list
  setYearDataSet() {
    const { currentYear, maxYear } = this.state;

    if (currentYear < maxYear) {
      this.setState({
        currentYear: this.setIncrementYear(currentYear),
        currentYearDataSet: this.props.data.filter(i => i.year === currentYear),
      });
    } else {
      this.stopTimeTravel();
    }
  }

  // Change data-set for specific year
  handleYearChange(date) {
    this.setState({
      currentYear: date,
      currentYearDataSet: this.props.data.filter(i => i.year === date),
    });
  }

  handleIncrementYear = () => {
    const { currentYear, maxYear } = this.state;
    this.setState({
      currentYear: this.setIncrementYear(currentYear),
      currentYearDataSet: this.props.data.filter(i => i.year === currentYear),
    });
  };

  handleDecrementYear = () => {
    const { currentYear, maxYear } = this.state;
    this.setState({
      currentYear: this.setDecrementYear(currentYear),
      currentYearDataSet: this.props.data.filter(i => i.year === currentYear),
    });
  };

  render() {
    const {
      minYear,
      maxYear,
      currentYear,
      yearList,
      currentYearDataSet,
    } = this.state;

    if (currentYearDataSet.length) {
      console.log(currentYear);
      return (
        <div>
          <Chart data={currentYearDataSet} />
          <Button
            onClick={this.handleDecrementYear}
            variant="contained"
            color="primary"
          >
            Prev
          </Button>
          <Button
            onClick={this.startTimeTravel}
            variant="contained"
            color="primary"
          >
            Play
          </Button>
          <Button
            onClick={this.stopTimeTravel}
            variant="contained"
            color="primary"
          >
            Pause
          </Button>
          <Button
            onClick={this.handleIncrementYear}
            variant="contained"
            color="primary"
          >
            Next
          </Button>
          <Button
            onClick={this.stopTimeTravel}
            variant="contained"
            color="primary"
            onClick={() => this.handleYearChange(minYear)}
          >
            Reset
          </Button>
          {yearList.map((item, i) => (
            <Button
              key={i}
              variant="contained"
              color="primary"
              onClick={() => this.handleYearChange(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      );
    }
    return null;
  }
}

export default BarChartWrapper;
