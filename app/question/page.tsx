'use client';

import { Box, Button, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllQuestion, getResult } from '@/api/axios-api';
import { FlexBox, FlexBoxCol, FlexContainerCol, FlexContainer } from '@/style/style';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  eventUserType,
  eventUserUID,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { useRouter } from 'next/navigation';
import SelectionButton from '@/components/common/SelectionButton';
import Image from 'next/image';
import backIcon from '@/public/imgs/icon_back.png';

const Page = () => {
  const router = useRouter();
  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectionData, setSelectionData] = useRecoilState(selectionsAtom);
  // const userId = useRecoilValue(eventUserId);
  const [UID, setUID] = useRecoilState(eventUserUID);
  const setPablosCode = useSetRecoilState(pablosCodeAtom);
  const resetUserTypeState = useResetRecoilState(eventUserType);
  const setViewItem = useSetRecoilState(pablosCodeViewItemAtom);
  const [flexDirection, setflexDirection] = useState('column');

  useEffect(() => {
    setSelectionData([]);
    setPablosCode(null);
    setViewItem(null);
    if (!UID) {
      router.push('/genuser');
    }

    getAllQuestion()
      .then(data => {
        setQuestionData(data.questions);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (questionNumber === 6 || questionNumber === 7 || questionNumber === 8) {
      setflexDirection('row');
    } else {
      setflexDirection('column');
    }
  }, [questionNumber]);

  console.log(UID, 'uid');
  console.log(questionData);

  const onClickNextQuestion = (e: any) => {
    setQuestionNumber((prev: number) => prev + 1);

    setSelectionData([...selectionData, { selectionId: Number(e.currentTarget.id), value: null }]);

    if (questionNumber === 8 && UID) {
      setSelectionData([
        ...selectionData,
        { selectionId: Number(e.currentTarget.id), value: null },
      ]);

      getResult({ uid: UID, selections: selectionData })
        .then(data => {
          console.log(data);
          setPablosCode(data.result.pablos_code);
          setViewItem(data.result.view_items);
          router.push('/result');
        })
        .catch(error => {
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
    <Box sx={{ p: 12 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '168px' }}>
        <Slider
          // disabled
          value={progress}
          sx={{
            height: '20px',
            borderRadius: '0px',

            '& .MuiSlider-track': {
              borderRadius: 0,
              height: '20px',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#C9CDD6',
            },
            '& .MuiSlider-thumb': {
              height: '48px',
              width: '48px',
              border: '8px solid currentColor',
              backgroundColor: '#fff',
            },
          }}
        />
      </Box>
      {questionNumber < 9 && (
        <Box>
          <Box sx={{ height: '180px', wordBreak: 'keep-all', mt: '127px', mb: '64px' }}>
            <Typography variant='h2'>
              {questionData[questionNumber].content.includes('사진질문')
                ? `다음 중 어떤 공간을\n 선호하시나요?`
                : questionData[questionNumber].content}
            </Typography>
          </Box>
          <Box
            sx={{
              ...FlexContainer,
              flexDirection: flexDirection,
              height: '761px',
              gap: '20px',
              mb: '140px',
            }}
          >
            {questionData[questionNumber].selections.map((selection: any, idx: number) => {
              return selection.view_type === 'TEXT' ? (
                <SelectionButton
                  className='MuiButton'
                  key={idx}
                  id={selection.selection_id}
                  title={selection.content}
                  size='lg'
                  onClick={onClickNextQuestion}
                />
              ) : selection.view_type === 'IMAGE' ? (
                <Box
                  onClick={onClickNextQuestion}
                  sx={{ width: '50%', height: '100%', position: 'relative' }}
                >
                  <Image
                    key={idx}
                    id={selection.selection_id}
                    alt={selection.view_items.images[0]}
                    src={selection.view_items.images[0]}
                    layout='fill'
                    objectFit='cover'
                  />
                  <Button
                    disableElevation
                    sx={{
                      width: '100%',
                      height: '136px',
                      position: 'absolute',
                      bottom: '0',
                      fontSize: '32px',
                      fontFamily: 'Pretendard-Regular',
                      bgcolor: '#EDF0F3',
                      border: 'none',
                      borderRadius: 0,
                      color: 'black',
                    }}
                  >
                    #미치겠다 #진짜로 #하하하
                  </Button>
                </Box>
              ) : null;
            })}
          </Box>
          {/* <Box sx={{ mt: 2 }}>
            <DefaultButton
              title={questionNumber === 0 ? '개인정보 재입력' : '이전 질문'}
              onClick={questionNumber === 0 ? onClickGoGenUserPage : onClickPrevQuestion}
            />
          </Box> */}
          <Button
            onClick={onClickPrevQuestion}
            sx={{
              width: '275px',
              height: '120px',
              border: '1px solid #EDF0F3',
              fontSize: '36px',
              color: 'black',
            }}
          >
            <Image src={backIcon} alt='이전 아이콘' style={{ marginRight: '20px' }} />
            이전
          </Button>
        </Box>
      )}
    </Box>
  ) : null;
};

export default Page;
