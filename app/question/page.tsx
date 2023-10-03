'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getQuestion } from '@/api/axios-api';
import { ButtonBox } from '@/app/genuser/page';
import { FlexContainerCol } from '@/app/page';
import ProgressBar from '@/components/material/ProgressBar';

export const browserPreventEvent = (event: () => void) => {
  history.pushState(null, '', location.href);
  event();
};

const Page = () => {
  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [subQuestionNumber, setSubQuestionNumber] = useState(null);

  useEffect(() => {
    getQuestion(questionNumber)
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [questionNumber]);

  const onClickNextQuestion = (e: any) => {
    console.log(e.currentTarget.id, 'id');
    console.log(e.currentTarget.accessKey, 'target');

    if (e.currentTarget.accessKey) {
      setQuestionNumber(e.currentTarget.accessKey);
    } else if (e.currentTarget.id === '10') {
      setQuestionNumber(4);
    }
  };

  const onClickPrevQuestion = () => {
    setQuestionNumber((prev: number) => prev - 1);
  };

  console.log(questionNumber, 'q number');
  console.log(questionData, 'data');

  // 테스트 필요
  // useEffect(() => {
  //   history.pushState(null, '', location.href);
  //   window.addEventListener('popstate', () => {
  //     browserPreventEvent(onClickNextQuestion); // 임시용
  //   });
  //   return () => {
  //     window.removeEventListener('popstate', () => {
  //       browserPreventEvent(onClickNextQuestion); // 임시용
  //     });
  //   };
  // }, []);
  // 테스트 필요

  const progress = 40;
  return questionData ? (
    <Box sx={FlexContainerCol}>
      <Box>
        <Typography variant='h4' mb={'30px'}>
          {questionData.content}
        </Typography>
        <Box sx={ButtonBox}>
          {questionData.selections.map((selection: any) => {
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
      {/* {questionData?.map((question: any, idx: number) => {
        return (
          <Box key={idx}>
            <Typography variant='h4' mb={'30px'}>
              {question.content}
            </Typography>
            <Box sx={ButtonBox}>
              {question.selections.map((selection: any) => {
                return (
                  <Box key={selection.selection_id} sx={ButtonBox}>
                    <DefaultButton title={selection.content} size='md' onClick={onClickNextQuestion} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })} */}
      <ProgressBar progress={progress} />
    </Box>
  ) : null;
};

export default Page;
