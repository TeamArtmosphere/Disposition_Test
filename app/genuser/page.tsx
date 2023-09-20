'use client';

import { postRegistUser } from '@/api/axios-api';
import DefaultButton from '@/components/common/DefaultButton';
import { eventUserType } from '@/recoil/atom';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { FlexContainerCol, FlexBoxCol } from '../page';

export const ButtonBox = { ...FlexContainerCol, gap: '10px', width: '100%' };

type userDataType = {
  ageRange: number;
  gender: string;
  address: string;
  eventType: string;
};

const Page = () => {
  const router = useRouter();

  const [userType, setUserType] = useRecoilState(eventUserType);
  const [renderType, setRenderType] = useState('gender');

  const onClickRegistUser = () => {
    postRegistUser(userType)
      .then(data => {
        console.log(data);
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
            <DefaultButton title='남자' id='MAN' name='gender' size='md' onClick={handleUserData} />
            <DefaultButton
              title='여자'
              id='WOMAN'
              name='gender'
              size='md'
              onClick={handleUserData}
            />
          </Box>
        </Box>
      ) : renderType === 'ageRange' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h4' mb={'30px'}>
            연령대를 선택해주세요
          </Typography>
          <Box sx={ButtonBox}>
            <DefaultButton title='10대' id={10} name='ageRange' onClick={handleUserData} />
            <DefaultButton title='20대' id={20} name='ageRange' onClick={handleUserData} />
            <DefaultButton title='30대' id={30} name='ageRange' onClick={handleUserData} />
            <DefaultButton title='40대' id={40} name='ageRange' onClick={handleUserData} />
            <DefaultButton title='50대+' id={50} name='ageRange' onClick={handleUserData} />
          </Box>
        </Box>
      ) : renderType === 'address' ? (
        <Box sx={FlexBoxCol}>
          <Typography variant='h4' mb={'30px'}>
            거주 지역을 선택해주세요
          </Typography>
          <Box sx={ButtonBox}>
            {/* map */}
            <DefaultButton
              name='address'
              id='수색/증산'
              title='수색/증산'
              onClick={handleUserData}
            />
            <DefaultButton
              name='address'
              id='신사/역촌'
              title='신사/역촌'
              onClick={handleUserData}
            />
            <DefaultButton name='address' id='응암' title='응암' onClick={handleUserData} />
            <DefaultButton
              name='address'
              id='그 외 은평구'
              title='그 외 은평구'
              onClick={handleUserData}
            />
            <DefaultButton name='address' id='타지역' title='타지역' onClick={handleUserData} />
          </Box>
          <Box>
            <DefaultButton title='테스트 시작하기' onClick={onClickRegistUser} />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Page;
