import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <div>
      <Typography variant='h4'>연령대를 선택해주세요</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <DefaultButton name='10대' />
        <DefaultButton name='20대' />
        <DefaultButton name='30대' />
        <DefaultButton name='40대' />
        <DefaultButton name='50대+' />
      </Box>
    </div>
  );
};

export default page;
