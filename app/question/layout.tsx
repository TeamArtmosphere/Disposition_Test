'use client';

import NextButton from '@/components/common/NextButton';
import PrevButton from '@/components/common/PrevButton';
import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FlexBoxCol } from '../page';

const QuestionLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const params = pathname.slice(-1);

  console.log(params);

  const handleNextPage = () => {
    router.push(`q${+params + 1}`);
    if (+params + 1 === 10) {
      router.push('/result');
    }
  };

  const handlePrevPage = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {children}
      <Box
        sx={{
          display: 'flex',
          width: '390px',
          position: 'absolute',
          bottom: -16,
          //   left: '50%',
          //   transform: 'translate(-50%, -50%)',
        }}
      >
        <Box
          sx={{ display: 'flex', width: '50%', border: '1px solid #ccc', justifyContent: 'center' }}
        >
          <PrevButton onClick={handlePrevPage} />
        </Box>
        <Box
          sx={{ display: 'flex', width: '50%', border: '1px solid #ccc', justifyContent: 'center' }}
        >
          <NextButton onClick={handleNextPage} />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionLayout;
