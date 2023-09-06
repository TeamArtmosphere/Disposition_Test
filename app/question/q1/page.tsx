'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { answerData } from '@/recoil/atom';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import ProgressBar from '@/components/Material/ProgressBar';

const Page = () => {
  const [answer, setAnswer] = useRecoilState(answerData);

  const onClickStoreAnswer = (e: any) => {
    if (e.currentTarget.name === '남자') {
      setAnswer({ ...answer, gender: 1 });
    } else {
      setAnswer({ ...answer, gender: 2 });
    }
  };

  console.log(answer);

  const progress = 10;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <Typography variant='h4' mb={'30px'}>
        성별을 골라주세요
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', width: '100%' }}>
        <DefaultButton name='남자' size='md' onClick={onClickStoreAnswer} />
        <DefaultButton name='여자' size='md' onClick={onClickStoreAnswer} />
      </Box>
      <ProgressBar progress={progress} />
    </Box>
  );
};

export default Page;
