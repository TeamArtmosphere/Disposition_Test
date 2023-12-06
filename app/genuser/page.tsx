'use client';

import { postRegistUser } from '@/api/axios-api';
import SelectionButton from '@/components/common/SelectionButton';
import { eventUserId, eventUserType, eventUserUID, selectionsAtom } from '@/recoil/atom';
import { FlexContainerCol, questionStyle } from '@/style/style';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ProgressBar from '@/components/layout/ProgressBar';
import LoadingGenuser from './loading';
const genuserData = [
  {
    content: '성별을 선택해 주세요',
    selections: [
      { id: 'MAN', title: '남자', name: 'gender' },
      { id: 'WOMAN', title: '여자', name: 'gender' },
    ],
  },
  {
    content: '연령대를 선택해 주세요',
    selections: [
      { id: '10', title: '10대', name: 'ageRange' },
      { id: '20', title: '20대', name: 'ageRange' },
      { id: '30', title: '30대', name: 'ageRange' },
      { id: '40', title: '40대', name: 'ageRange' },
      { id: '50', title: '50대 이상', name: 'ageRange' },
    ],
  },
  {
    content: '거주지역을 선택해 주세요',
    selections: [
      { id: '수색/증산', title: '수색/증산', name: 'address' },
      { id: '신사/역촌', title: '신사/역촌', name: 'address' },
      { id: '응암', title: '응암', name: 'address' },
      { id: '그 외 은평구', title: '그 외 은평구', name: 'address' },
    ],
  },
];

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'));

  const [userType, setUserType] = useRecoilState(eventUserType);
  // const [renderType, setRenderType] = useState('gender');
  const [questionNumber, setQuestionNumber] = useState(0);
  const setUserId = useSetRecoilState(eventUserId);
  const setUID = useSetRecoilState(eventUserUID);
  const setSelectionData = useSetRecoilState(selectionsAtom);

  const onClickRegistUser = () => {
    setSelectionData([]);
    postRegistUser(userType)
      .then(data => {
        setUserId(data.event_user_id);
        setUID(data.uid);
        router.push('/question');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUserData = (e?: any) => {
    if (e.currentTarget.name === 'gender') {
      setUserType({ ...userType, gender: e.currentTarget.id });
      // setRenderType('ageRange');
      setQuestionNumber(1); // 렌더 넘버 테스트
    }

    if (e.currentTarget.name === 'ageRange') {
      setUserType({ ...userType, ageRange: +e.currentTarget.id });
      // setRenderType('address');
      setQuestionNumber(2); // 렌더 넘버 테스트
    }

    if (e.currentTarget.name === 'address') {
      setUserType({ ...userType, address: e.currentTarget.id });
    }
  };

  useEffect(() => {
    if (userType.address !== '') {
      onClickRegistUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const onClickPrevQuestion = () => {
    if (questionNumber === 0) {
      router.push('/');
    } else if (questionNumber === 1) {
      setUserType({ ...userType, ageRange: 0 });
      // setRenderType('gender');
      setQuestionNumber(0); // 렌더 넘버 테스트
    } else if (questionNumber === 2) {
      setUserType({ ...userType, address: '' });
      // setRenderType('ageRange');
      setQuestionNumber(1); // 렌더 넘버 테스트
    }
  };

  const progress: number = questionNumber * (100 / 13);

  return (
    <Suspense fallback={<LoadingGenuser />}>
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
          <ProgressBar progress={progress} questionNumber={questionNumber + 1} />

          {genuserData && (
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  mb: 3,
                  mt: { mobile: 6, laptop: 3 },
                  height: { mobile: '64px', laptop: '96px' },
                }}
              >
                <Typography variant='h2'>{genuserData[questionNumber].content}</Typography>
              </Box>
              <Box
                sx={{
                  ...FlexContainerCol,
                  justifyContent: 'flex-start',
                  height: { mobile: '328px', laptop: '504px' },
                  gap: '12px',
                  mb: { mobile: 3, laptop: '0px' },
                }}
              >
                {genuserData[questionNumber].selections.map((data, idx) => {
                  return (
                    <SelectionButton
                      className='MuiButton'
                      key={idx}
                      title={data.title}
                      id={data.id}
                      name={data.name}
                      onClick={handleUserData}
                    />
                  );
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
            </Box>
          )}
        </Box>
      </Box>
    </Suspense>
  );
};

export default Page;
