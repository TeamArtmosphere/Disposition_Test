'use client';

import { postRegistUser } from '@/api/axios-api';
import DefaultButton from '@/components/common/DefaultButton';
import { eventUserId, eventUserType, eventUserUID, selections } from '@/recoil/atom';
import { ButtonBox, FlexBoxCol, FlexContainerCol } from '@/style/style';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

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
  const [userId, setUserId] = useRecoilState(eventUserId);
  const [UID, setUID] = useRecoilState(eventUserUID);
  const [selectionData, setSelectionData] = useRecoilState(selections);

  const onClickRegistUser = () => {
    postRegistUser(userType)
      .then(data => {
        console.log(data);
        setUserId(data.event_user_id);
        setUID(data.uid);
        setSelectionData({ ...selectionData, testId: data.event_user_id, uid: data.uid });
        router.push('/question');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUserData = (e: any) => {
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
      // onClickRegistUser();
    }
  };

  console.log(userType);

  return (
    <Box sx={FlexContainerCol}>
      <Typography variant='h3'>당신은 어떤 사람인가요?</Typography>

      {renderType === 'gender' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h4' mb={'30px'}>
            성별을 골라주세요
          </Typography>
          <Box sx={ButtonBox}>
            {genderData.map((data, idx) => {
              return (
                <DefaultButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='gender'
                  size='md'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
        </Box>
      ) : renderType === 'ageRange' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h4' mb={'30px'}>
            연령대를 선택해주세요
          </Typography>
          <Box sx={ButtonBox}>
            {ageRangeData.map((data, idx) => {
              return (
                <DefaultButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='ageRange'
                  size='md'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
        </Box>
      ) : renderType === 'address' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h4' mb={'30px'}>
            거주 지역을 선택해주세요
          </Typography>
          <Box sx={ButtonBox}>
            {addressData.map((data, idx) => {
              return (
                <DefaultButton
                  key={idx}
                  title={data.title}
                  id={data.id}
                  name='address'
                  size='md'
                  onClick={handleUserData}
                />
              );
            })}
          </Box>
          <Box sx={{ mt: '20px' }}>
            <DefaultButton title='테스트 시작하기' onClick={onClickRegistUser} />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Page;
