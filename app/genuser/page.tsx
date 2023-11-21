'use client';

import { postRegistUser } from '@/api/axios-api';
import DefaultButton from '@/components/common/DefaultButton';
import SelectionButton from '@/components/common/SelectionButton';
import { eventUserId, eventUserType, eventUserUID, selectionsAtom } from '@/recoil/atom';
import { ButtonBox, FlexBoxCol, FlexContainerCol, FlexContainer } from '@/style/style';
import { Box, Button, Icon, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import backIcon from '@/public/imgs/icon_back.png';
import Image from 'next/image';

const genderData = [
  { id: 'MAN', title: '남자', name: 'gender' },
  { id: 'WOMAN', title: '여자', name: 'gender' },
];

const ageRangeData = [
  { id: '10', title: '10대' },
  { id: '20', title: '20대' },
  { id: '30', title: '30대' },
  { id: '40', title: '40대' },
  { id: '50', title: '50대 이상' },
];

const addressData = [
  { id: '수색/증산', title: '수색/증산' },
  { id: '신사/역촌', title: '신사/역촌' },
  { id: '응암', title: '응암' },
  { id: '그 외 은평구', title: '그 외 은평구' },
];

const Page = () => {
  const router = useRouter();

  const [userType, setUserType] = useRecoilState(eventUserType);
  const [renderType, setRenderType] = useState('gender');
  const setUserId = useSetRecoilState(eventUserId);
  const setUID = useSetRecoilState(eventUserUID);
  const setSelectionData = useSetRecoilState(selectionsAtom);

  const onClickRegistUser = () => {
    setSelectionData([]);
    postRegistUser(userType)
      .then(data => {
        console.log(data);
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
      setRenderType('ageRange');
    }

    if (e.currentTarget.name === 'ageRange') {
      setUserType({ ...userType, ageRange: +e.currentTarget.id });
      setRenderType('address');
    }

    if (e.currentTarget.name === 'address') {
      setUserType({ ...userType, address: e.currentTarget.id });
    }
  };

  const onClickPrevQuestion = () => {
    if (renderType == 'gender') {
      router.push('/');
    } else if (renderType === 'ageRange') {
      setUserType({ ...userType, ageRange: 0 });
      setRenderType('gender');
    } else if (renderType === 'address') {
      setUserType({ ...userType, address: '' });
      setRenderType('ageRange');
    }
  };

  // useEffect(() => {
  //   if (userType.address !== '') {
  //     onClickRegistUser();
  //   }
  // }, [userType]);

  // console.log(userType);

  return (
    <Box sx={{ p: 12 }}>
      {renderType === 'gender' ? (
        <Box>
          <Typography variant='h2' mt={'127px'} mb={'64px'}>
            <span className='sep_typo'>성별</span>을 <br />
            선택해주세요
          </Typography>
          <Box sx={{ ...FlexContainerCol, height: '761px', gap: '20px', mb: '140px' }}>
            {genderData.map((data, idx) => {
              return (
                <SelectionButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='gender'
                  size='lg'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
        </Box>
      ) : renderType === 'ageRange' ? (
        <Box>
          <Typography variant='h2' mt={'127px'} mb={'64px'}>
            <span className='sep_typo'>연령대</span>를 <br />
            선택해주세요
          </Typography>
          <Box sx={{ ...FlexContainerCol, height: '761px', gap: '20px', mb: '140px' }}>
            {ageRangeData.map((data, idx) => {
              return (
                <SelectionButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='ageRange'
                  size='lg'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
        </Box>
      ) : renderType === 'address' ? (
        <Box>
          <Typography variant='h2' mt={'127px'} mb={'64px'}>
            <span className='sep_typo'>거주 지역</span>을 <br />
            선택해주세요
          </Typography>
          <Box sx={{ ...FlexContainerCol, height: '761px', gap: '20px', mb: '140px' }}>
            {addressData.map((data, idx) => {
              return (
                <SelectionButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='address'
                  size='lg'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
          <Box sx={{ ...ButtonBox, flexDirection: 'row' }}>
            <DefaultButton
              title='테스트 시작하기'
              onClick={onClickRegistUser}
              size='sm'
              disabled={userType.address !== '' ? false : true}
            />
          </Box>
        </Box>
      ) : null}
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
  );
};

export default Page;
