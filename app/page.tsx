'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Container, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../public/imgs/logo.png';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const onClickStartTest = () => {
    router.push('/question/q1');
  };

  return (
    <Container
      sx={{
        width: '390px',
        height: '844px',
        p: 0,
      }}
    >
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Image src={logo} alt='아트모스피어 로고' width={100} />
        <Box sx={{ mt: '30px', mb: '50px', textAlign: 'center' }}>
          <Typography variant='h3'>
            artmosphere
            <br />
            유저 성향 테스트
          </Typography>
        </Box>
        <DefaultButton name='테스트 시작하기' onClick={onClickStartTest} />
      </Paper>
    </Container>
  );
}
