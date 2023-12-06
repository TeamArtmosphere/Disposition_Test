import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FlexContainer } from '@/style/style';
import { Box } from '@mui/material';
import React from 'react';

const LoadingPablos = () => {
  return (
    <Box sx={FlexContainer}>
      <LoadingSpinner text={`공간 취향을\n\n분석 중입니다...`} />
    </Box>
  );
};

export default LoadingPablos;
