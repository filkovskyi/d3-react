import React, { Component } from 'react';
import Chart from './Chart';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded';

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
      isPlaying: false,
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

  setPlayPause = () => {
    this.setState({
      ...this.state,
      isPlaying: !this.state.isPlaying,
    });
  };

  startTimeTravel = () => {
    yearInterval = setInterval(() => {
      this.setYearDataSet();
    }, 2000);

    this.setPlayPause();
  };

  stopTimeTravel = () => {
    clearTimeout(yearInterval);

    this.setPlayPause();
  };

  // Increment current year and calculate data-set for incremented year
  handleIncrementYear = () => {
    const { currentYear, maxYear } = this.state;

    if (currentYear < maxYear) {
      this.setState({
        currentYear: this.setIncrementYear(currentYear),
        currentYearDataSet: this.props.data.filter(i => i.year === currentYear),
      });
    }
  };

  // Decrement current year and calculate data-set for decremented year
  handleDecrementYear = () => {
    const { currentYear, minYear } = this.state;

    if (minYear < currentYear) {
      this.setState({
        currentYear: this.setDecrementYear(currentYear),
        currentYearDataSet: this.props.data.filter(i => i.year === currentYear),
      });
    }
  };

  // Setting data-set for year list when user click play button
  setYearDataSet() {
    const { currentYear, maxYear } = this.state;

    if (currentYear < maxYear) {
      this.handleIncrementYear();
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

  render() {
    const {
      minYear,
      currentYear,
      yearList,
      currentYearDataSet,
      isPlaying,
    } = this.state;

    if (currentYearDataSet.length) {
      console.log(currentYear);
      return (
        <div>
          <Chart data={currentYearDataSet} />

          <Grid item>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={this.handleDecrementYear}
                variant="outlined"
                color="primary"
                startIcon={<SkipPreviousRoundedIcon />}
              />
              {!isPlaying ? (
                <Button
                  onClick={this.startTimeTravel}
                  variant="outlined"
                  color="primary"
                  startIcon={<PlayArrowRoundedIcon />}
                />
              ) : (
                <Button
                  onClick={this.stopTimeTravel}
                  variant="outlined"
                  color="primary"
                  startIcon={<PauseCircleFilledRoundedIcon />}
                />
              )}

              <Button
                onClick={() => this.handleYearChange(minYear)}
                variant="outlined"
                color="primary"
                startIcon={<RotateLeftRoundedIcon />}
              />
              <Button
                onClick={this.handleIncrementYear}
                variant="outlined"
                color="primary"
                startIcon={<SkipNextRoundedIcon />}
              />
            </ButtonGroup>
          </Grid>

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
