'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';
import spinner from '@/public/imgs/icon_loading.png';
import Image from 'next/image';

type LoadingProps = {
  text?: string;
};

const LoadingSpinner = ({ text }: LoadingProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          width: { mobile: '80px', laptop: '120px' },
          height: { mobile: '80px', laptop: '120px' },
          mb: { mobile: '36px', laptop: '52px' },
          position: 'relative',
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
          animation: 'spin 1s linear infinite',
        }}
      >
        <Image src={spinner} alt='로딩 스피너' fill style={{ objectFit: 'cover' }} />
      </Box>
      {text && <Typography variant='h2'>{text}</Typography>}
    </Box>
  );
};

export default LoadingSpinner;
