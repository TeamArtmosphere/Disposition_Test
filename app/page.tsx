'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import mainImg from '@/public/imgs/main_img.png';
import { useRouter } from 'next/navigation';
import { FlexBoxCol, FlexContainerCol } from '@/style/style';

export default function Home() {
  const router = useRouter();

  const onClickStartTest = () => {
    router.push('/genuser');
  };

  return (
    <Box sx={FlexContainerCol}>
      <Box sx={{ ...FlexBoxCol, mb: 4 }}>
        <Button
          variant='contained'
          disableElevation
          sx={{ p: 0, width: '267px', height: '30px', fontSize: '14px', mb: 2 }}
        >
          당신의 공간 어떻게 이용하고 계신가요?
        </Button>
        <Typography fontSize={26} mb={1}>
          나에게 딱맞는 공간 찾기
        </Typography>
        <Typography variant='h1' color={'primary'}>
          PABLOS
        </Typography>
      </Box>
      <Image
        src={mainImg}
        alt='컴퓨터 앞에 앉아있는 남자 이미지'
        width={160}
        style={{ marginBottom: '30px' }}
      />
      <Box sx={{ mt: '30px', mb: '50px', textAlign: 'center' }}>
        <Typography fontSize='12px'>
          테스트 결과를 바탕으로
          <br />
          불광천 인근 가게를 추천해 드릴게요!
        </Typography>
      </Box>
      <DefaultButton title='지금바로 테스트해보기' size='md' onClick={onClickStartTest} />
    </Box>
  );
}
