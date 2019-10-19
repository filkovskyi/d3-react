import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
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
    setInterval(() => {
      if (this.state.currentYear <= this.state.maxYear) {
        this.setState({
          currentYear: this.state.currentYear + 1,
          currentData: this.props.data.filter(
            i => i.year === this.state.currentYear,
          ),
        });
      }
    }, 2000);
  }

  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        padding: theme.spacing(3, 2),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }));

    if (this.state.currentData.length) {
      return (
        <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <Paper className={useStyles.root}>
              <Typography
                component="div"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ededed',
                  height: '100vh',
                }}
              >
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="h6" className={useStyles.title}>
                      Filkovskyi Sergey
                      <br />
                      REACT+D3 Hawaiian Pig Visualization
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Typography
                  component="div"
                  style={{
                    margin: '2em auto',
                  }}
                >
                  <Chart data={this.state.currentData} />
                </Typography>
                <Typography
                  component="div"
                  style={{
                    margin: '0 auto',
                  }}
                >
                  <Button
                    onClick={this.startTimeTravel}
                    variant="contained"
                    color="primary"
                  >
                    Play
                  </Button>
                </Typography>
              </Typography>
            </Paper>
          </Container>
        </React.Fragment>
      );
    }
    return null;
  }
}

export default BarChartWrapper;
