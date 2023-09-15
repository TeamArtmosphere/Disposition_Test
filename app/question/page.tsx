'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/material/ProgressBar';
import { getQuestion } from '@/api/axios-api';
import { ButtonBox } from '@/app/genuser/page';
import { FlexBoxCol, FlexContainerCol } from '@/app/page';

const Page = () => {
  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    getQuestion(questionNumber)
      .then(data => {
        console.log(data);
        setQuestionData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [questionNumber]);

  const onClickNextQuestion = () => {
    setQuestionNumber((prev: number) => prev + 1);
  };

  const onClickPrevQuestion = () => {
    setQuestionNumber((prev: number) => prev - 1);
  };

  console.log(questionNumber);

  const progress = 40;
  return (
    questionData && (
      <Box sx={FlexContainerCol}>
        <Typography variant='h4' mb={'30px'}>
          {questionData?.question_title}
        </Typography>
        <Box sx={ButtonBox}>
          {questionData.selections.map((question: any, idx: number) => {
            return (
              <Box key={idx} sx={ButtonBox}>
                <DefaultButton
                  title={question.selection_title}
                  size='md'
                  onClick={onClickNextQuestion}
                />
              </Box>
            );
          })}
        </Box>
        <ProgressBar progress={progress} />
      </Box>
    )
  );
};

export default Page;
