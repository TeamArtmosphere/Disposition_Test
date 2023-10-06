'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { pablosCodeAtom } from '@/recoil/atom';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useRecoilValue } from 'recoil';

const Page = () => {
  const router = useRouter();
  const pablosCode = useRecoilValue(pablosCodeAtom);

  const handleClickToHome = () => {
    router.push('/');
  };

  console.log(pablosCode);

  return (
    <div>
      <Typography variant='h4' mb={'30px'}>
        당신의 유형은 {pablosCode}입니다.
      </Typography>
      <Typography variant='h4' mb={'30px'}>
        {pablosCode}유형에게 다음 장소를 추천합니다!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <DefaultButton title='홈으로 돌아가기' name='home' onClick={handleClickToHome} />
        <DefaultButton title='친구에게 공유하기' name='share' />
      </Box>
    </div>
  );
};

export default Page;
