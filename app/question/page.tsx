'use client';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllQuestion, getResult } from '@/api/axios-api';
import ProgressBar from '@/components/layout/ProgressBar';
import { ButtonBox, FlexBox, FlexBoxCol, FlexContainerCol } from '@/style/style';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  eventUserId,
  eventUserType,
  eventUserUID,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { useRouter } from 'next/navigation';
import SelectionButton from '@/components/common/SelectionButton';
import DefaultButton from '@/components/common/DefaultButton';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectionData, setSelectionData] = useRecoilState(selectionsAtom);
  // const userId = useRecoilValue(eventUserId);
  const UID = useRecoilValue(eventUserUID);
  const setPablosCode = useSetRecoilState(pablosCodeAtom);
  const resetUserTypeState = useResetRecoilState(eventUserType);
  const setViewItem = useSetRecoilState(pablosCodeViewItemAtom);

  useEffect(() => {
    if (!UID) {
      router.push('/genuser');
    }

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

    if (questionNumber === 8 && UID) {
      setSelectionData([...selectionData, { selectionId: Number(e.currentTarget.id), value: null }]);

      getResult({ uid: UID, selections: selectionData })
        .then((data) => {
          console.log(data);
          setPablosCode(data.result.pablos_code);
          setViewItem(data.result.view_items);
          router.push('/result');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickPrevQuestion = () => {
    const prevData = [...selectionData].slice(0, selectionData.length - 1);
    setSelectionData(prevData);
    setQuestionNumber((prev: number) => prev - 1);
  };

  const onClickGoGenUserPage = () => {
    resetUserTypeState();
    router.push('/genuser');
  };

  const progress: number = questionData && (100 / questionData.length) * questionNumber + 1;

  console.log(selectionData);

  return questionData ? (
    <Box sx={{ ...FlexContainerCol, height: '100%' }}>
      {questionNumber < 9 && (
        <Box sx={{ ...FlexBoxCol, width: '100%' }}>
          <Box sx={{ p: 2, wordBreak: 'keep-all', textAlign: 'center' }}>
            <Typography variant='h3' mb={'30px'}>
              {questionData[questionNumber].content.includes('사진질문')
                ? '마음에 드는 장소를 골라주세요.'
                : questionData[questionNumber].content}
            </Typography>
          </Box>
          <Box sx={{ ...ButtonBox, mb: 3 }}>
            {questionData[questionNumber].selections.map((selection: any, idx: number) => {
              return selection.view_type === 'TEXT' ? (
                <SelectionButton
                  key={idx}
                  id={selection.selection_id}
                  title={selection.content}
                  size='sm'
                  onClick={onClickNextQuestion}
                />
              ) : selection.view_type === 'IMAGE' ? (
                <Image
                  key={idx}
                  id={selection.selection_id}
                  onClick={onClickNextQuestion}
                  alt={selection.view_items.images[0]}
                  src={selection.view_items.images[0]}
                  width={300}
                  height={150}
                  style={{
                    objectFit: 'cover',
                    border: '1px solid #CFE6F2',
                    borderRadius: '10px',
                  }}
                />
              ) : null;
            })}
          </Box>

          <ProgressBar progress={progress} />

          <Box sx={{ mt: 2 }}>
            <DefaultButton
              title={questionNumber === 0 ? '개인정보 재입력' : '이전 질문'}
              onClick={questionNumber === 0 ? onClickGoGenUserPage : onClickPrevQuestion}
            />
          </Box>
        </Box>
      )}
    </Box>
  ) : null;
};

export default Page;
