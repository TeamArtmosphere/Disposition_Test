'use client';

// import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography } from '@mui/material';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FlexBoxCol } from '@/style/style';

export default function Home() {
  const router = useRouter();

  const onClickStartTest = () => {
    router.push('/genuser');
  };

  return (
    <Box sx={{ ...FlexBoxCol, width: '100%', height: '100%' }}>
        hello world
      {/*<Image src="https://artmosphere-dev-storage.s3.ap-northeast-2.amazonaws.com/logo.png" alt='아트모스피어 로고' width={100} height={100} />*/}
      {/*<Box sx={{ mt: '30px', mb: '50px', textAlign: 'center' }}>*/}
      {/*  <Typography variant='h3'>*/}
      {/*    artmosphere*/}
      {/*    <br />*/}
      {/*    유저 성향 테스트*/}
      {/*  </Typography>*/}
      {/*</Box>*/}
      {/*<DefaultButton title='테스트 시작하기' size='md' onClick={onClickStartTest} />*/}
    </Box>
  );
}
