import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ProgressBarProps = {
  progress: number;
};

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
    </Box>
  );
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default ProgressBar;
