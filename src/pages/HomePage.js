import React, { Component } from 'react';
import queryString from 'query-string';
import BarChartWrapper from '../components/BarChart';
import Copyright from './Copyright';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Fade from '@material-ui/core/Fade';

import CircularProgress from '@material-ui/core/CircularProgress';

import './style.css';

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
        <React.Fragment>
          <CssBaseline />
          <main>
            <div className={'heroContent'}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Hawaiian Pig Visualization
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  The chart should have these features:
                </Typography>
                <ul>
                  <li>
                    Animation that steps through the data, displaying each year
                    for 2 seconds before proceeding to the next year.
                  </li>
                  <li>
                    A progress bar that shows the currently displayed year's
                    relationship to the other years in the dataset.
                  </li>
                  <li>
                    A play/pause button which enables and disables the
                    animation, pausing on whichever year is currently being
                    shown
                  </li>
                  <li>
                    Year and play/paused state are persisted as query parameters
                    in the URL. For example,{' '}
                    <code>http://localhost:3000/?paused=true&year=2002</code>{' '}
                    should load the page with the animation already paused and
                    the year set to 2002
                  </li>
                  <li>
                    <pre>Extra point:</pre> add all available years to make mo
                    comfortable ensure each year pig's population
                  </li>
                </ul>
              </Container>
            </div>
            <Container className={'cardGrid'} maxWidth="md">
              <Grid container>
                <BarChartWrapper
                  year={this.state.year}
                  paused={this.state.paused}
                  data={this.state.data}
                />
              </Grid>
            </Container>
          </main>
          <footer className={'footer'}>
            <Copyright />
          </footer>
        </React.Fragment>
      );
    }
    return <p>Please wait</p>;
  }
}

export default HomePage;
