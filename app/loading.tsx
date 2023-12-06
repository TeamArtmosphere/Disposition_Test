'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FlexContainer } from '@/style/style';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

const Loading = () => {
  const pathname = usePathname();

  return (
    <Box sx={FlexContainer}>
      <LoadingSpinner
        text={
          pathname === '/question'
            ? '질문을 불러오는 중입니다...'
            : pathname === '/result'
            ? `공간 취향을\n\n분석 중입니다...`
            : '로딩 중입니다...'
        }
      />
    </Box>
  );
};

export default Loading;
