import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <div>
      <Typography variant='h4' mb={'30px'}>
        당신의 유형은 OOO입니다.
      </Typography>
      <Typography variant='h4' mb={'30px'}>
        OOO유형에게 다음 장소를 추천합니다!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <DefaultButton name='철학이 있는 곳' />
        <DefaultButton name='가성비가 좋은 곳' />
      </Box>
    </div>
  );
};

export default page;
