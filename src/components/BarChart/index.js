import React, { Component } from 'react';
import Chart from './Chart';
import Progress from '../ProgressBar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded';
import './style.css';

let yearInterval;

class BarChartWrapper extends Component {
  constructor(props) {
    super(props);

    const yearList = [...new Set(props.data.map(i => i.year))];

    const minYear = Math.min(...yearList);

    const maxYear = Math.max(...yearList);

    const currentYearDataSet = props.data.filter(i => i.year === minYear);

    const completed = +(100 / yearList.length).toFixed(2);

    this.handleClick = this.handleClick.bind(this);

    // check for url query   f.e: /?paused=true&year=2002
    if (this.props.paused) {
      this.state = {
        minYear,
        maxYear,
        yearList,
        currentYearDataSet: props.data.filter(i => i.year === +this.props.year),
        currentYear: +this.props.year,
        isPlaying: !this.props.paused,
        completed,
      };
    } else {
      this.state = {
        minYear,
        maxYear,
        yearList,
        currentYearDataSet,
        currentYear: minYear,
        isPlaying: true,
        completed,
      };
    }
  }

  componentDidMount() {
    const { isPlaying } = this.state;

    if (isPlaying) {
      this.startTimeTravel();
    }
  }

  // utils and helpers
  setIncrementYear = currentYear => {
    return ++currentYear;
  };

  setDecrementYear = currentYear => {
    return --currentYear;
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

  handleClick = () => {
    const { isPlaying } = this.state;
    this.setState(state => ({
      isPlaying: !isPlaying,
    }));

    !isPlaying ? this.startTimeTravel() : this.stopTimeTravel();
  };

  startTimeTravel = () => {
    yearInterval = setInterval(() => {
      this.setYearDataSet();
    }, 2000);
  };

  stopTimeTravel = () => {
    clearTimeout(yearInterval);
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

          <div className="control-wrapper">
            <div className="control-item">
              <Progress completed={this.calculateCompletedProgress()} />
            </div>
            <div className="control-item">
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
                    onClick={this.handleClick}
                    variant="outlined"
                    color="primary"
                    startIcon={<PlayArrowRoundedIcon />}
                  />
                ) : (
                  <Button
                    onClick={this.handleClick}
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
            </div>
            {/*Extra point*/}
            <div className="control-item">
              <ButtonGroup color="primary" aria-label=" primary button group">
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
              </ButtonGroup>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default BarChartWrapper;
