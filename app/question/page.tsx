'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllQuestion } from '@/api/axios-api';
import ProgressBar from '@/components/material/ProgressBar';
import { ButtonBox, FlexContainerCol } from '@/style/style';

const Page = () => {
  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    getAllQuestion()
      .then((data) => {
        setQuestionData(data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickNextQuestion = () => {
    setQuestionNumber((prev: number) => prev + 1);
  };

  const onClickPrevQuestion = () => {
    setQuestionNumber((prev: number) => prev - 1);
  };

  const progress: number = questionData && (100 / questionData.length) * questionNumber + 1;

  console.log(progress);

  return questionData ? (
    <Box sx={{ ...FlexContainerCol }}>
      <Box>
        <Typography variant='h4' mb={'30px'}>
          {questionData[questionNumber].content}
        </Typography>
        <Box sx={ButtonBox}>
          {questionData[questionNumber].selections.map((selection: any) => {
            return (
              <Box key={selection.selection_id} sx={ButtonBox}>
                <DefaultButton
                  id={selection.selection_id}
                  accessKey={selection.sub_question_id}
                  title={selection.content}
                  size='md'
                  onClick={onClickNextQuestion}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <ProgressBar progress={progress} />
    </Box>
  ) : null;
};

export default Page;
