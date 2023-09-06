'use client';

import ProgressBar from '@/components/Material/ProgressBar';
import DefaultButton from '@/components/common/DefaultButton';
import { answerData } from '@/recoil/atom';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';

const Page = () => {
  const [answer, setAnswer] = useRecoilState(answerData);

  const onClickStoreAnswer = (e: any) => {
    setAnswer({ ...answer, age: e.currentTarget.name });
  };

  console.log(answer);

  const progress = 20;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <Typography variant='h4' mb={'30px'}>
        연령대를 선택해주세요
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', width: '100%' }}>
        <DefaultButton name='10대' onClick={onClickStoreAnswer} />
        <DefaultButton name='20대' onClick={onClickStoreAnswer} />
        <DefaultButton name='30대' onClick={onClickStoreAnswer} />
        <DefaultButton name='40대' onClick={onClickStoreAnswer} />
        <DefaultButton name='50대+' onClick={onClickStoreAnswer} />
      </Box>
      <ProgressBar progress={progress} />
    </Box>
  );
};

export default Page;
