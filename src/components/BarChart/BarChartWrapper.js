import React, { Component } from 'react';
import Chart from './Chart';
import Progress from '../ProgressBar';

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

    const completed = +(100 / yearList.length).toFixed(2);

    this.state = {
      minYear,
      maxYear,
      yearList,
      currentYearDataSet,
      currentYear: minYear,
      isPlaying: false,
      completed,
    };
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

  calculateCurrentYearDataSet = currentYear => {
    return this.props.data.filter(i => i.year === currentYear);
  };

  calculateCompletedProgress = () => {
    const { minYear, completed, currentYear } = this.state;
    if (currentYear === minYear) {
      return completed;
    } else {
      return (currentYear - minYear + 1) * completed;
    }
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
        currentYearDataSet: this.calculateCurrentYearDataSet(
          this.setIncrementYear(currentYear),
        ),
      });
    }
  };

  // Decrement current year and calculate data-set for decremented year
  handleDecrementYear = () => {
    const { currentYear, minYear } = this.state;

    if (minYear < currentYear) {
      this.setState({
        currentYear: this.setDecrementYear(currentYear),
        currentYearDataSet: this.calculateCurrentYearDataSet(
          this.setDecrementYear(currentYear),
        ),
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
    const { minYear, yearList, currentYearDataSet, isPlaying } = this.state;

    if (currentYearDataSet.length) {
      return (
        <div>
          <Chart data={currentYearDataSet} />

          <Progress completed={this.calculateCompletedProgress()} />

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
