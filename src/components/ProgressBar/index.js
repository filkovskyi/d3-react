import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressBar = completed => {
  return <LinearProgress variant="determinate" value={completed.completed} />;
};

ProgressBar.propTypes = {
  value: PropTypes.number,
};

export default ProgressBar;
