'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../../../public/imgs/logo.png';
import ProgressBar from '@/components/Material/ProgressBar';
import { getQuestion } from '@/api/axios-api';

const Page = () => {
  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>({});

  useEffect(() => {
    getQuestion(1)
      .then(data => {
        console.log(data);
        setQuestionData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const progress = 40;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      <Typography variant='h4' mb={'30px'}>
        {questionData?.question_title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {questionData.selections.map((question: any, idx: number) => {
          return (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: '20px',
              }}
            >
              <DefaultButton title={question.selection_title} size='md' />
            </Box>
          );
        })}
      </Box>
      <ProgressBar progress={progress} />
    </Box>
  );
};

export default Page;
