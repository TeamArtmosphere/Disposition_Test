import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <div>
      <Typography variant='h4' mb={'30px'}>
        좋은 장소란?
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <DefaultButton name='철학이 있는 곳' />
        <DefaultButton name='가성비가 좋은 곳' />
      </Box>
    </div>
  );
};

export default page;
