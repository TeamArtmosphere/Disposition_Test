'use client';

import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllQuestion, getInterimResult, getResult } from '@/api/axios-api';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  eventUserType,
  eventUserUID,
  interimPablosCodeAtom,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  selectedTagsAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { useRouter } from 'next/navigation';
import SelectionButton from '@/components/common/SelectionButton';
import Image from 'next/image';
import ProgressBar from '@/components/layout/ProgressBar';

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'));

  // useState type 수정 필요
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectionData, setSelectionData] = useRecoilState(selectionsAtom);
  const [selectedTagList, setSelectedTagList] = useRecoilState(selectedTagsAtom);

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

  // 질문 번호에 따른 현재 질문 렌더링
  useEffect(() => {
    if (questionData && questionNumber <= 6) {
      setCurrentQuestion(questionData.filter((item: any) => item.question_no === questionNumber));
    } else if (questionNumber === 7 || questionNumber === 8 || questionNumber === 9) {
      setCurrentQuestion(
        questionData.filter(
          (item: any) =>
            item.pablos_result.pablos_code === interimPablosCode &&
            item.question_no === questionNumber,
        ),
      );
    } else if (questionNumber === 10) {
      setCurrentQuestion(questionData.filter((item: any) => item.question_no === questionNumber));
    }

    if (selectionData.length === 6 && UID) {
      getInterimResult({ selections: selectionData })
        .then(data => setInterimPablosCode(data.pablos_code))
        .catch(error => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interimPablosCode, questionData, questionNumber]);

  // 선택지 버튼 내부 flexDirection 지정
  useEffect(() => {
    if (questionNumber === 10) {
      setflexDirection('row');
    } else {
      setflexDirection('column');
    }
  }, [questionNumber]);

  // 단일 선택 질문들 클릭 시 다음 질문
  const onClickNextQuestion = (e: any) => {
    setQuestionNumber((prev: number) => prev + 1);

    setSelectionData([...selectionData, { selectionId: Number(e.currentTarget.id), value: null }]);
  };

  // 태그 버튼 활성화 & 비활성화 기능
  const onClickTagButton = (e: any) => {
    const isSelected = selectedTagList.findIndex(
      (item: any) => item.selectionId === parseInt(e.currentTarget.id),
    );
    // const isSelected = selectionData.findIndex(
    //   (item: any) => item.selectionId === parseInt(e.currentTarget.id),
    // );

    if (isSelected === -1 && [...selectionData, ...selectedTagList].length <= 11) {
      // setSelectionData([
      //   ...selectionData,
      //   { selectionId: Number(e.currentTarget.id), value: null },
      // ]);
      setSelectedTagList([
        ...selectedTagList,
        { selectionId: Number(e.currentTarget.id), value: null },
      ]);
    } else if (isSelected > 0 || [...selectionData, ...selectedTagList].length <= 12) {
      // setSelectionData(prev =>
      //   prev.filter((item: any) => item.selectionId !== parseInt(e.currentTarget.id)),
      // );
      setSelectedTagList(prev =>
        prev.filter((item: any) => item.selectionId !== parseInt(e.currentTarget.id)),
      );
    }
  };

  // useEffect(() => {

  // }, [selectedTagList]);

  // 10번 태그 질문 선택 후 선택완료 버튼 동작
  const onClickGetResult = () => {
    if (questionNumber === 10 && UID && [...selectionData, ...selectedTagList].length === 12) {
      getResult({ uid: UID, selections: [...selectionData, ...selectedTagList] })
        .then(data => {
          setPablosCode(data.result.pablos_code);
          setViewItem(data.result.view_items);
          router.push('/result');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // 이전질문으로 이동
  const onClickPrevQuestion = () => {
    const prevData = [...selectionData].slice(0, selectionData.length - 1);
    setSelectionData(prevData);

    setQuestionNumber((prev: number) => prev - 1);

    if (questionNumber === 1) {
      resetUserTypeState();
      router.push('/genuser');
    } else if (questionNumber === 10) {
      setSelectedTagList([]);
    }
  };

  console.log(
    selectionData,
    interimPablosCode,
    questionNumber,
    currentQuestion,
    selectedTagList,
    '선택지, 임시코드',
    '질문번호',
    '현재질문',
    '선택 태그',
  );

  console.log([...selectionData, ...selectedTagList], '합쳐보낼것');

  const progress: number = (100 / 13) * (questionNumber + 3);

  return questionData ? (
    <Box
      sx={{
        maxWidth: { mobile: '100%', laptop: '1440px' },
        p: { mobile: 3, laptop: 8 },
        pt: { mobile: 7, laptop: '100px' },
        m: '0 auto',
      }}
    >
      <Box
        sx={{
          width: { mobile: '100%', laptop: '640px' },
          m: '0 auto',
        }}
      >
        <ProgressBar progress={progress} questionNumber={questionNumber + 3} />

        {currentQuestion.length > 0 && (
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                mb: 3,
                mt: { mobile: 6, laptop: 3 },
                height: { mobile: '64px', laptop: '96px' },
              }}
            >
              <Typography variant='h2'>{currentQuestion[0].content}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: questionNumber === 10 ? 'flex-start' : 'center',
                alignContent: 'flex-start',
                flexDirection: flexDirection, // 모바일에서 필요없음
                flexWrap: questionNumber === 10 ? 'wrap' : '',
                width: '100%',
                height: { mobile: '328px', laptop: '504px' },
                gap: '12px',
                mb: { mobile: 3, laptop: '0px' },
              }}
            >
              {currentQuestion[0].selections.map((selection: any, idx: number) => {
                return selection.view_type === 'TEXT' ? (
                  <SelectionButton
                    key={idx}
                    className='MuiButton'
                    id={selection.selection_id}
                    title={selection.content}
                    onClick={onClickNextQuestion}
                  />
                ) : selection.view_type === 'IMAGE' ? (
                  <Box
                    key={idx}
                    onClick={onClickNextQuestion}
                    id={selection.selection_id}
                    sx={{ width: '100%', height: '100%', position: 'relative' }}
                  >
                    <Image
                      id={selection.selection_id}
                      alt={selection.view_items.images[0]}
                      src={selection.view_items.images[0]}
                      fill
                      sizes='100%'
                      style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                  </Box>
                ) : selection.view_type === 'TAG' ? (
                  <button
                    className={
                      [...selectionData, ...selectedTagList].findIndex(
                        (item: any) => item.selectionId === selection.selection_id,
                      ) > 0
                        ? 'tag_button active'
                        : 'tag_button'
                    }
                    key={idx}
                    id={selection.selection_id}
                    onClick={onClickTagButton}
                  >
                    {`#${selection.content}`}
                  </button>
                ) : null;
              })}
            </Box>
            <Button
              onClick={onClickPrevQuestion}
              sx={{
                color: 'grey.500',
                border: '1px solid #EDF0F3',
                fontSize: { mobile: '14px', laptop: '20px' },
                width: { mobile: '99px', laptop: '128px' },
                height: { mobile: '48px', laptop: '64px' },
                position: { laptop: 'absolute' },
                bottom: { laptop: '0px' },
                left: { tablet: '0px', laptop: '-224px' },
              }}
            >
              이전
            </Button>
            {questionNumber === 10 && (
              <Button
                disabled={[...selectionData, ...selectedTagList].length === 12 ? false : true}
                onClick={onClickGetResult}
                variant='contained'
                disableElevation
                sx={{
                  color: 'grey.500',
                  border: '1px solid #EDF0F3',
                  fontSize: { mobile: '14px', laptop: '20px' },
                  width: { mobile: '99px', laptop: '128px' },
                  height: { mobile: '48px', laptop: '64px' },
                  position: { mobile: 'absolute', laptop: 'absolute' },
                  bottom: { laptop: '0px' },
                  right: { mobile: '0px', tablet: '0px', laptop: '-224px' },
                  '&. active': {
                    color: 'red',
                  },
                }}
              >
                선택완료
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  ) : null;
};

export default Page;
