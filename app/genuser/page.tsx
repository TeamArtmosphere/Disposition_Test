'use client';

import { postRegistUser } from '@/api/axios-api';
import SelectionButton from '@/components/common/SelectionButton';
import { eventUserId, eventUserType, eventUserUID, selectionsAtom } from '@/recoil/atom';
import { FlexContainerCol } from '@/style/style';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import backIcon from '@/public/imgs/icon_back.png';
import Image from 'next/image';
import ProgressSlideBar from '@/components/layout/ProgressSlideBar';
import { style } from '../question/page';

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

  const progress: number = questionNumber * (100 / 12);

  return (
    <Box sx={{ height: '100%', p: onDesktop ? 12 : 3, pt: 7 }}>
      <Box sx={{ ...style.containerBox, height: onDesktop ? '168px' : '32px' }}>
        <ProgressSlideBar progress={progress} onDesktop={onDesktop} />
      </Box>
      {genuserData && (
        <Box>
          <Typography variant='h2' height={'62px'} mt={onDesktop ? '127px' : 3} mb={'42px'}>
            {genuserData[questionNumber].content}
          </Typography>
          <Box
            sx={{
              ...FlexContainerCol,
              height: onDesktop ? '761px' : '328px',
              gap: '12px',
              mb: onDesktop ? '140px' : '47px',
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
                  size={onDesktop ? 'lg' : 'md'}
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
        </Box>
      )}
      <Button
        onClick={onClickPrevQuestion}
        sx={onDesktop ? style.buttonOnDesktop : style.buttonOnMobile}
      >
        {onDesktop ? (
          <Image src={backIcon} alt='이전 아이콘' style={{ marginRight: '20px' }} />
        ) : null}
        이전
      </Button>
    </Box>
  );
};

export default Page;
