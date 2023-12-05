import { Box, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/imgs/choople_logo.png';
import { useResetRecoilState } from 'recoil';
import {
  eventUserId,
  eventUserType,
  eventUserUID,
  interimPablosCodeAtom,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  scoreAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const resetPablosCodeState = useResetRecoilState(pablosCodeAtom);
  const resetInterimPablosCodeState = useResetRecoilState(interimPablosCodeAtom);
  const resetScoreState = useResetRecoilState(scoreAtom);
  const resetSelectionsState = useResetRecoilState(selectionsAtom);
  const resetUserIdState = useResetRecoilState(eventUserId);
  const resetUIDState = useResetRecoilState(eventUserUID);
  const resetUserTypeState = useResetRecoilState(eventUserType);
  const resetViewItemState = useResetRecoilState(pablosCodeViewItemAtom);

  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down('mobile'));
  const onTablet = useMediaQuery(theme.breakpoints.between('tablet', 'mobile'));
  const onDesktop = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'));

  const handleClickToHome = () => {
    resetPablosCodeState();
    resetInterimPablosCodeState();
    resetSelectionsState();
    resetUserIdState();
    resetUIDState();
    resetUserTypeState();
    resetViewItemState();
    resetScoreState();
    router.push('/');
    sessionStorage.removeItem('recoil-persist');
  };

  // console.log(onDesktop, onTablet, onMobile);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: { mobile: '56px', laptop: '100px' },
        p: '16px',
        bgcolor: '#fff',
        position: 'absolute',
        top: 0,
        // borderBottom: '1px solid #efefef',
      }}
    >
      <Box
        sx={{
          width: { mobile: '116px', laptop: '180px' },
          height: { mobile: '31px', laptop: '48px' },
          position: 'relative',
        }}
      >
        <Image
          src={logo}
          alt='아트모스피어 로고'
          fill
          sizes='100%'
          onClick={handleClickToHome}
          style={{ cursor: 'pointer', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};

export default Header;
