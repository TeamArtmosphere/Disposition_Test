'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { answerData } from '@/recoil/atom';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';

const Page = () => {
  const [answer, setAnswer] = useRecoilState(answerData);

  const onClickStoreAnswer = (e: any) => {
    setAnswer({ ...answer, q1: e.currentTarget.name });
  };

  console.log(answer);

  return (
    <div>
      <Typography variant='h4' mb={'30px'}>
        성별을 골라주세요
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <DefaultButton name='남자' onClick={onClickStoreAnswer} />
        <DefaultButton name='여자' onClick={onClickStoreAnswer} />
      </Box>
    </div>
  );
};

export default Page;
