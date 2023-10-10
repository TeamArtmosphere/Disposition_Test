'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { StarRating } from '@/components/result/StarRating';
import {
  eventUserId,
  eventUserType,
  eventUserUID,
  pablosCodeAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { FlexBox, FlexBoxCol, FlexContainerCol, FlexContainer } from '@/style/style';
import theme from '@/style/theme';
import { Box, Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

const Page = () => {
  const router = useRouter();
  const pablosCode = useRecoilValue(pablosCodeAtom);
  const resetPablosCodeState = useResetRecoilState(pablosCodeAtom);
  const resetSelectionsState = useResetRecoilState(selectionsAtom);
  const resetUserIdState = useResetRecoilState(eventUserId);
  const resetUIDState = useResetRecoilState(eventUserUID);
  const resetUserTypeState = useResetRecoilState(eventUserType);

  const handleClickToHome = () => {
    resetPablosCodeState();
    resetSelectionsState();
    resetUserIdState();
    resetUIDState();
    resetUserTypeState();
    router.push('/');
  };

  console.log(pablosCode);

  return (
    <Box sx={{ ...FlexBoxCol, pt: '60px' }}>
      <Typography variant='h4' mt={'30px'} mb={'30px'}>
        나의 PABLOS는?
      </Typography>
      <Typography
        variant='h4'
        sx={{
          minWidth: '100px',
          p: '4px 20px',
          lineHeight: '31px',
          color: 'white',
          bgcolor: theme.palette.primary.main,
          borderRadius: '50px',
          mb: '20px',
          textAlign: 'center',
        }}
      >
        {pablosCode}
      </Typography>
      <Box sx={{ width: '100%', height: '204px', bgcolor: '#ececec' }}></Box>
      <Box sx={{ width: '100%', height: '90px', bgcolor: theme.palette.primary.main }}></Box>
      <Box sx={{ ...FlexContainerCol, p: '24px 22px', gap: '10px' }}>
        <Typography fontSize='18px' fontWeight='600' pb={2}>
          {pablosCode}유형이 추구하는 가치는?
        </Typography>
        <Box
          sx={{
            width: '100%',
            minHeight: '100px',
            bgcolor: 'white',
            border: '1px solid #CFE6F2',
            borderRadius: '20px',
          }}
        ></Box>
        <Box
          sx={{
            width: '100%',
            minHeight: '100px',
            bgcolor: 'white',
            border: '1px solid #CFE6F2',
            borderRadius: '20px',
          }}
        ></Box>
        <Box sx={{ ...FlexBox, width: '100%', mt: '20px', gap: '10px' }}>
          <Button variant='outlined' sx={{ bgcolor: '#C0E0F0', color: '#136ea6' }}>
            상세결과 보기
          </Button>
          <DefaultButton title='공유하기' />
        </Box>
        <Box sx={{ ...FlexContainerCol, mt: '40px', textAlign: 'center' }}>
          <Typography fontSize='18px' fontWeight={600} mb='10px'>
            {pablosCode}유형에게 추천하는 장소
          </Typography>
          <Typography variant='h5' mb='20px'>
            불광천에 이런 공간이 있다고?
            <br />
            당신의 취향에 맞는 장소를 확인해보세요!
          </Typography>
          <Box sx={{ ...FlexContainer, gap: '10px', overflow: 'scroll', mb: '30px' }}>
            <Image
              width={293}
              height={175}
              src=''
              alt=''
              style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}
            />
            <Image
              width={293}
              height={175}
              src=''
              alt=''
              style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}
            />
          </Box>
        </Box>

        <Divider variant='middle' sx={{ width: '100%' }} />

        <Box sx={{ ...FlexContainerCol, mt: '40px', textAlign: 'center' }}>
          <Typography fontSize='18px' fontWeight={600} mb='10px'>
            테스트 유형이 잘 맞나요?
          </Typography>
          <Typography variant='h5' mb='20px'>
            추천 만족도를 별점으로 평가해주세요!
          </Typography>
          <Box
            sx={{
              ...FlexContainerCol,
              height: '100px',
              gap: 2,
              bgcolor: 'white',
              border: '1px solid #CFE6F2',
              borderRadius: '20px',
              mb: '20px',
            }}
          >
            <StarRating />
            <Typography variant='h5'>마음에 들어요!</Typography>
          </Box>
          <Typography variant='h5' mb='20px'>
            테스트 만족도 설문조사에 참여하면
            <br />
            추첨을 통해 스타벅스 커피 쿠폰을 보내드려요!
          </Typography>
        </Box>

        <Box sx={{ ...FlexBox, width: '100%', mt: '20px', gap: '10px' }}>
          <Button
            variant='outlined'
            onClick={handleClickToHome}
            sx={{ bgcolor: '#C0E0F0', color: '#136ea6' }}
          >
            다시 테스트하기
          </Button>
          <DefaultButton title='설문조사 하러 가기' />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
