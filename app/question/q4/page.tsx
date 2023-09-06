import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '../../../public/imgs/logo.png';
import ProgressBar from '@/components/Material/ProgressBar';

const Page = () => {
  const progress = 40;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <Typography variant='h4' mb={'30px'}>
        선호하는 장소의 유형을 선택해 주세요
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '20px',
          }}
        >
          <Image src={logo} alt='S유형 이미지' width={70} />
          <DefaultButton name='S' />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '20px',
          }}
        >
          <Image src={logo} alt='P유형 이미지' width={70} />
          <DefaultButton name='P' />
        </Box>
      </Box>
      <ProgressBar progress={progress} />
    </Box>
  );
};

export default Page;
