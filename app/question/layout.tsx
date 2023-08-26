'use client';

import NextButton from '@/components/common/NextButton';
import PrevButton from '@/components/common/PrevButton';
import { Box } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

const QuestionLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const params = pathname.slice(-1);

  console.log(params);

  const handleNextPage = () => {
    router.push(`q${+params + 1}`);
  };

  const handlePrevPage = () => {
    router.back();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '100%' }}>
      {children}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          position: 'absolute',
        }}
      >
        <PrevButton onClick={handlePrevPage} />
        <NextButton onClick={handleNextPage} />
      </Box>
    </Box>
  );
};

export default QuestionLayout;
