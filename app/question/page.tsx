'use client';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllQuestion, getResult } from '@/api/axios-api';
import ProgressBar from '@/components/layout/ProgressBar';
import { ButtonBox, FlexContainerCol } from '@/style/style';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { eventUserId, eventUserUID, pablosCodeAtom, selectionsAtom } from '@/recoil/atom';
import { useRouter } from 'next/navigation';
import SelectionButton from '@/components/common/SelectionButton';

const Page = () => {
  const router = useRouter();
  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectionData, setSelectionData] = useRecoilState(selectionsAtom);
  const userId = useRecoilValue(eventUserId);
  const UID = useRecoilValue(eventUserUID);
  const setPablosCode = useSetRecoilState(pablosCodeAtom);

  useEffect(() => {
    getAllQuestion()
      .then((data) => {
        setQuestionData(data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickNextQuestion = (e: any) => {
    setQuestionNumber((prev: number) => prev + 1);

    setSelectionData([...selectionData, { selectionId: Number(e.currentTarget.id), value: null }]);

    if (questionNumber === 8 && userId && UID) {
      setSelectionData([...selectionData, { selectionId: Number(e.currentTarget.id), value: null }]);

      getResult(userId, { testId: userId, uid: UID, selections: selectionData })
        .then((data) => {
          console.log(data);
          setPablosCode(data.pablos_code);
          router.push('/result');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickPrevQuestion = () => {
    setQuestionNumber((prev: number) => prev - 1);
  };

  const progress: number = questionData && (100 / questionData.length) * questionNumber + 1;

  return questionData ? (
    <Box sx={{ ...FlexContainerCol }}>
      {questionNumber < 9 && (
        <Box>
          <Typography variant='h3' mb={'30px'}>
            {questionData[questionNumber].content}
          </Typography>
          <Box sx={ButtonBox}>
            {questionData[questionNumber].selections.map((selection: any) => {
              return (
                <Box key={selection.selection_id} sx={ButtonBox}>
                  <SelectionButton
                    id={selection.selection_id}
                    title={selection.content}
                    size='md'
                    onClick={onClickNextQuestion}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      <ProgressBar progress={progress} />
    </Box>
  ) : null;
};

export default Page;
