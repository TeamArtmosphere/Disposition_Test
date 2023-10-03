'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../public/imgs/logo.png';
import { useRouter } from 'next/navigation';

export const FlexBox = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
export const FlexBoxCol = { ...FlexBox, flexDirection: 'column' };
export const FlexContainer = { ...FlexBox, width: '100%', height: '100%' };
export const FlexContainerCol = { ...FlexBoxCol, width: '100%', height: '100%' };

export default function Home() {
  const router = useRouter();

  const onClickStartTest = () => {
    router.push('/genuser');
  };

  return (
    <Box sx={{ ...FlexBoxCol, width: '100%', height: '100%' }}>
      <Image src={logo} alt='아트모스피어 로고' width={100} />
      <Box sx={{ mt: '30px', mb: '50px', textAlign: 'center' }}>
        <Typography variant='h3'>
          artmosphere
          <br />
          유저 성향 테스트
        </Typography>
      </Box>
      <DefaultButton title='테스트 시작하기' size='md' onClick={onClickStartTest} />
    </Box>
  );
}
