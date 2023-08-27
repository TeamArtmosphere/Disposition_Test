import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <div>
      <Typography variant='h4' mb={'30px'}>
        성별을 골라주세요
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <DefaultButton name='남자' />
        <DefaultButton name='여자' />
      </Box>
    </div>
  );
};

export default page;
