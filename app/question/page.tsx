'use client';

import { Box, Button, Slider, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllQuestion, getInterimResult, getResult } from '@/api/axios-api';
import { FlexBox, FlexBoxCol, FlexContainerCol, FlexContainer } from '@/style/style';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  eventUserType,
  eventUserUID,
  interimPablosCodeAtom,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { useRouter } from 'next/navigation';
import SelectionButton from '@/components/common/SelectionButton';
import Image from 'next/image';
import backIcon from '@/public/imgs/icon_back.png';
import ProgressSlideBar from '@/components/layout/ProgressSlideBar';

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'));

  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectionData, setSelectionData] = useRecoilState(selectionsAtom);
  const [UID, setUID] = useRecoilState(eventUserUID);
  const setPablosCode = useSetRecoilState(pablosCodeAtom);
  const [interimPablosCode, setInterimPablosCode] = useRecoilState(interimPablosCodeAtom);
  const resetUserTypeState = useResetRecoilState(eventUserType);
  const setViewItem = useSetRecoilState(pablosCodeViewItemAtom);
  const [flexDirection, setflexDirection] = useState('column');
  const [currentQuestion, setCurrentQuestion] = useState<any>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const test =
  //   questionData && questionData.filter((item: any) => item.question_no === questionNumber);

  useEffect(() => {
    if (questionData && questionNumber <= 6) {
      setCurrentQuestion(questionData.filter((item: any) => item.question_no === questionNumber));
    } else if (questionNumber === 7 || questionNumber === 8) {
      setCurrentQuestion(
        questionData.filter((item: any) => item.pablos_result.pablos_code === interimPablosCode),
      );
    } else if (questionNumber === 9) {
      setCurrentQuestion(questionData.filter((item: any) => item.question_no === questionNumber));
    }

    if (questionNumber === 6 && UID) {
      getInterimResult({ selections: selectionData })
        .then(data => setInterimPablosCode(data.pablos_code))
        .catch(error => console.log(error));
    }
  }, [interimPablosCode, questionData, questionNumber]);

  useEffect(() => {
    if (questionNumber === 9) {
      setflexDirection('row');
    } else {
      setflexDirection('column');
    }
  }, [questionNumber]);

  console.log(interimPablosCode);
  console.log(questionData, '질문 데이터');
  console.log(questionNumber, '질문 번호');
  console.log(selectionData, '고른거');
  console.log(currentQuestion, '현재질문');
  console.log('--------------------');

  const onClickNextQuestionTest = (e: any) => {
    setQuestionNumber((prev: number) => prev + 1);
  };

  const onClickNextQuestion = (e: any) => {
    setQuestionNumber((prev: number) => prev + 1);

    setSelectionData([...selectionData, { selectionId: Number(e.currentTarget.id), value: null }]);

    if (questionNumber === 5 && UID) {
      getInterimResult({ selections: selectionData })
        .then(data => setInterimPablosCode(data.pablos_code))
        .catch(error => console.log(error));
    }

    // if (questionNumber === 8 && UID) {
    //   setSelectionData([
    //     ...selectionData,
    //     { selectionId: Number(e.currentTarget.id), value: null },
    //   ]);

    //   getResult({ uid: UID, selections: selectionData })
    //     .then(data => {
    //       // console.log(data);
    //       setPablosCode(data.result.pablos_code);
    //       setViewItem(data.result.view_items);
    //       router.push('/result');
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
  };

  const onClickPrevQuestion = () => {
    const prevData = [...selectionData].slice(0, selectionData.length - 1);
    setSelectionData(prevData);
    setQuestionNumber((prev: number) => prev - 1);

    if (questionNumber === 0) {
      resetUserTypeState();
      router.push('/genuser');
    }
  };

  const progress: number = questionData && (100 / (questionData.length - 7)) * questionNumber + 1;

  return questionData ? (
    <Box sx={{ height: '100%', p: onDesktop ? 12 : 3, pt: 7 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: onDesktop ? '168px' : '32px',
        }}
      >
        <ProgressSlideBar progress={progress} onDesktop={onDesktop} />
      </Box>

      {/* 테스트 */}
      {currentQuestion.length > 0 && (
        <Box>
          <Box
            sx={{ height: '62px', wordBreak: 'keep-all', mt: onDesktop ? '127px' : 3, mb: '42px' }}
          >
            <Typography variant='h2'>{currentQuestion[0].content}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: flexDirection, // 모바일에서 필요없음
              flexWrap: questionNumber === 9 ? 'wrap' : null,
              height: onDesktop ? '761px' : '328px',
              gap: '12px',
              mb: onDesktop ? '140px' : '47px',
            }}
          >
            {currentQuestion[0].selections.map((selection: any, idx: number) => {
              return selection.view_type === 'TEXT' ? (
                <SelectionButton
                  className='MuiButton'
                  key={idx}
                  id={selection.selection_id}
                  title={selection.content}
                  size={onDesktop ? 'lg' : 'md'}
                  onClick={onClickNextQuestionTest}
                />
              ) : selection.view_type === 'IMAGE' ? (
                <Box
                  onClick={onClickNextQuestionTest}
                  id={selection.selection_id}
                  sx={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <Image
                    key={idx}
                    id={selection.selection_id}
                    alt={selection.view_items.images[0]}
                    src={selection.view_items.images[0]}
                    layout='fill'
                    objectFit='cover'
                    style={{ borderRadius: '8px' }}
                  />
                </Box>
              ) : selection.view_type === 'TAG' ? (
                <SelectionButton
                  title={selection.content}
                  key={idx}
                  id={selection.selection_id}
                  sx={{ height: '45px', minWidth: '83px' }}
                />
              ) : null;
            })}
          </Box>
          <Button
            onClick={onClickPrevQuestion}
            sx={
              onDesktop
                ? {
                    width: '275px',
                    height: '120px',
                    border: '1px solid #EDF0F3',
                    fontSize: '36px',
                    color: 'black',
                  }
                : {
                    width: '99px',
                    height: '48px',
                    border: '1px solid #EDF0F3',
                    fontSize: '14px',
                    color: 'black',
                  }
            }
          >
            {onDesktop ? (
              <Image src={backIcon} alt='이전 아이콘' style={{ marginRight: '20px' }} />
            ) : null}
            이전
          </Button>
        </Box>
      )}
      {/* 테스트 */}

      {/* {questionNumber < 9 && (
        <Box>
          <Box
            sx={{ height: '62px', wordBreak: 'keep-all', mt: onDesktop ? '127px' : 3, mb: '42px' }}
          >
            <Typography variant='h2'>{questionData[questionNumber]?.content}</Typography>
          </Box>
          <Box
            sx={{
              ...FlexContainerCol,
              // flexDirection: flexDirection, // 모바일에서 필요없음
              height: onDesktop ? '761px' : '328px',
              gap: '12px',
              mb: onDesktop ? '140px' : '47px',
            }}
          >
            {questionData[questionNumber].selections.map((selection: any, idx: number) => {
              return selection.view_type === 'TEXT' ? (
                <SelectionButton
                  className='MuiButton'
                  key={idx}
                  id={selection.selection_id}
                  title={selection.content}
                  size={onDesktop ? 'lg' : 'md'}
                  onClick={onClickNextQuestion}
                />
              ) : selection.view_type === 'IMAGE' ? (
                <Box
                  onClick={onClickNextQuestion}
                  id={selection.selection_id}
                  sx={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <Image
                    key={idx}
                    id={selection.selection_id}
                    alt={selection.view_items.images[0]}
                    src={selection.view_items.images[0]}
                    layout='fill'
                    objectFit='cover'
                    style={{ borderRadius: '8px' }}
                  />
                </Box>
              ) : null;
            })}
          </Box>
          <Button
            onClick={onClickPrevQuestion}
            sx={
              onDesktop
                ? {
                    width: '275px',
                    height: '120px',
                    border: '1px solid #EDF0F3',
                    fontSize: '36px',
                    color: 'black',
                  }
                : {
                    width: '99px',
                    height: '48px',
                    border: '1px solid #EDF0F3',
                    fontSize: '14px',
                    color: 'black',
                    // bottom: '38px',
                  }
            }
          >
            {onDesktop ? (
              <Image src={backIcon} alt='이전 아이콘' style={{ marginRight: '20px' }} />
            ) : null}
            이전
          </Button>
        </Box>
      )} */}
    </Box>
  ) : null;
};

export default Page;
