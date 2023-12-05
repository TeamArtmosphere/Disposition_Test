import { Slider } from '@mui/material';
import React from 'react';

type ProgressSlideBarProps = {
  progress: number;
};

const ProgressSlideBar = ({ progress }: ProgressSlideBarProps) => {
  return (
    <Slider
      // disabled
      value={progress}
      sx={{
        height: '8px',
        borderRadius: '8px',

        '& .MuiSlider-track': {
          borderRadius: '8px',
          height: '8px',
          backgroundColor: '#464646',
          border: 'none',
        },
        '& .MuiSlider-rail': {
          backgroundColor: '#C9CDD6',
        },
        '& .MuiSlider-thumb': {
          height: '0px',
          width: '0px',
          border: '8px solid currentColor',
          backgroundColor: '#fff',
          display: 'none',
        },
      }}
    />
  );
};

export default ProgressSlideBar;
