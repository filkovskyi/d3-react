import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const LinearDeterminate = completed => {
  return <LinearProgress variant="determinate" value={completed.completed} />;
};

export default LinearDeterminate;
