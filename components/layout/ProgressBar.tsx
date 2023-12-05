import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type ProgressBarProps = {
  progress: number;
  questionNumber: number;
};

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
    </Box>
  );
};

const ProgressBar = ({ progress, questionNumber }: ProgressBarProps) => {
  return (
    <Box sx={{ height: { mobile: '32px', laptop: '48px' }, textAlign: 'right' }}>
      <Typography variant='body2' color={'grey.200'} sx={{ mb: '4px' }}>
        {questionNumber}/13
      </Typography>
      <LinearProgressWithLabel
        value={progress}
        sx={{
          display: 'flex',
          height: '8px',
          borderRadius: '8px',
          bgcolor: 'grey.50',
          '& .MuiLinearProgress-bar': {
            borderRadius: '8px',
            height: '8px',
            backgroundColor: '#464646',
            border: 'none',
          },
          '& .MuiLinearProgress-root': {
            backgroundColor: '#C9CDD6',
          },
        }}
      />
    </Box>
  );
};

export default ProgressBar;
