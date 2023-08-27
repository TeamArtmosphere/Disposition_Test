import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <div>
      <Typography variant='h4' mb={'30px'}>
        거주 지역을 선택해주세요
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <DefaultButton name='수색/증산' />
        <DefaultButton name='신사/역촌' />
        <DefaultButton name='응암' />
        <DefaultButton name='그 외 은평구' />
        <DefaultButton name='타지역' />
      </Box>
    </div>
  );
};

export default page;
