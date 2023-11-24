import { Slider } from '@mui/material';
import React from 'react';

type ProgressSlideBarProps = {
  progress: number;
  onDesktop: boolean;
};

const ProgressSlideBar = ({ progress, onDesktop }: ProgressSlideBarProps) => {
  return (
    <Slider
      // disabled
      value={progress}
      sx={{
        height: onDesktop ? '20px' : '8px',
        borderRadius: onDesktop ? '20px' : '8px',

        '& .MuiSlider-track': {
          borderRadius: onDesktop ? '20px' : '8px',
          height: onDesktop ? '20px' : '8px',
          backgroundColor: '#464646',
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
