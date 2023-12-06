import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FlexContainer } from '@/style/style';
import { Box } from '@mui/material';
import React from 'react';

const LoadingGenuser = () => {
  return (
    <Box sx={FlexContainer}>
      <LoadingSpinner text='로딩 중입니다...' />
    </Box>
  );
};

export default LoadingGenuser;
