'use client';

import DefaultButton from '@/components/common/DefaultButton';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import mainImg from '@/public/imgs/bbomi.png';
import { useRouter } from 'next/navigation';
import { FlexBox } from '@/style/style';

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
    <Box
      sx={{
        maxWidth: { mobile: '100%', tablet: '100%', laptop: '1440px' },
        // height: '100%',
        p: { mobile: 3, laptop: 8 },
        pt: { mobile: 7, laptop: '100px' },
        m: '0 auto',
      }}
    >
      <Box
        sx={{
          width: { mobile: '100%', laptop: '640px' },
          m: '0 auto',
        }}
      >
        <Box sx={{ mt: { mobile: '78px', laptop: '92px' }, mb: '44px' }}>
          <Typography variant='h1' color={'grey.600'} mb={3}>
            나에게 딱! 맞는
            <br />
            공간 찾기
          </Typography>
        </Box>
        <Box
          sx={{
            m: '0 auto',
            mb: 10,
            width: { mobile: '142px', laptop: '192px' },
            height: { mobile: '194px', laptop: '243px' },
            position: 'relative',
          }}
        >
          <Image src={mainImg} alt='포메라니안 캐릭터 뽀미' fill priority sizes='100%' style={{ objectFit: 'cover' }} />
        </Box>
        <DefaultButton
          title='테스트 시작하기'
          onClick={onClickStartTest}
          sx={{
            width: '100%',
            height: { mobile: '52px', laptop: '64px' },
            fontSize: { mobile: '16px', laptop: '24px' },
          }}
        />
      </Box>
    </Box>
  );
}
