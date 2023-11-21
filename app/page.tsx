'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import mainImg from '@/public/imgs/main_img.png';
import { useRouter } from 'next/navigation';
import { FlexBox, FlexContainerCol, FlexBoxCol } from '@/style/style';

export default function Home() {
  const router2 = useRouter();
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down('mobile'));
  const onTablet = useMediaQuery(theme.breakpoints.between('tablet', 'mobile'));
  const onDesktop = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'));

  const onClickStartTest = () => {
    router2.push('/genuser');
  };

  return (
    <Box sx={{ p: 12, pt: '60px' }}>
      <Box sx={{ ...FlexBox, justifyContent: 'space-between', mt: '154px', mb: '75px' }}>
        <Typography variant='h3' color={'secondary'}>
          PABLOS
        </Typography>
        <Typography variant='h5' fontWeight={300} fontFamily={'Pretendard-Regular'}>
          파블로스 공간 선호 테스트 알아보기
        </Typography>
      </Box>
      <Box sx={{ mb: '109px' }}>
        <Typography variant='h1' color={'primary'} mb={3}>
          나에게 딱! 맞는
          <br />
          공간 찾기
        </Typography>
        <Typography variant='h4' fontWeight={300} fontFamily={'Pretendard-Regular'}>
          테스트 결과를 바탕으로 불광천 인근 가게를 추천해 드릴게요!
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Image
          src={mainImg}
          alt='컴퓨터 앞에 앉아있는 남자 이미지'
          width={888}
          style={{ marginBottom: '100px' }}
        />
        <DefaultButton
          title='테스트 시작하기'
          onClick={onClickStartTest}
          sx={{ width: '100%', height: '160px', fontSize: '48px', fontWeight: '700' }}
        />
      </Box>
    </Box>
  );
}
