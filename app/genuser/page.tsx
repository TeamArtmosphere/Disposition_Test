'use client';

import { postRegistUser } from '@/api/axios-api';
import DefaultButton from '@/components/common/DefaultButton';
import SelectionButton from '@/components/common/SelectionButton';
import { eventUserId, eventUserType, eventUserUID, selectionsAtom } from '@/recoil/atom';
import { ButtonBox, FlexBoxCol, FlexContainerCol } from '@/style/style';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

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
      .then((data) => {
        console.log(data);
        setUserId(data.event_user_id);
        setUID(data.uid);
        router.push('/question');
      })
      .catch((error) => {
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
    if (renderType === 'ageRange') {
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
    <Box sx={FlexContainerCol}>
      {renderType === 'gender' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h3' mb={'50px'}>
            성별을 골라주세요
          </Typography>
          <Box sx={ButtonBox}>
            {genderData.map((data, idx) => {
              return (
                <SelectionButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='gender'
                  size='sm'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
        </Box>
      ) : renderType === 'ageRange' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h3' mb={'50px'}>
            연령대를 선택해주세요
          </Typography>
          <Box sx={{ ...ButtonBox, mb: '40px' }}>
            {ageRangeData.map((data, idx) => {
              return (
                <SelectionButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='ageRange'
                  size='sm'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
          <DefaultButton title='이전 질문' onClick={onClickPrevQuestion} size='sm' />
        </Box>
      ) : renderType === 'address' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h3' mb={'50px'}>
            거주 지역을 선택해주세요
          </Typography>
          <Box sx={{ ...ButtonBox, mb: '40px' }}>
            {addressData.map((data, idx) => {
              return (
                <SelectionButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='address'
                  size='sm'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
          <Box sx={{ ...ButtonBox, flexDirection: 'row' }}>
            <DefaultButton title='이전 질문' onClick={onClickPrevQuestion} size='sm' />
            <DefaultButton
              title='테스트 시작하기'
              onClick={onClickRegistUser}
              size='sm'
              disabled={userType.address !== '' ? false : true}
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Page;
