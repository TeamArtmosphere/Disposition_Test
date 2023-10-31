import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/imgs/vertical_logo.png';
import { useResetRecoilState } from 'recoil';
import {
  eventUserId,
  eventUserType,
  eventUserUID,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  scoreAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const resetPablosCodeState = useResetRecoilState(pablosCodeAtom);
  const resetScoreState = useResetRecoilState(scoreAtom);
  const resetSelectionsState = useResetRecoilState(selectionsAtom);
  const resetUserIdState = useResetRecoilState(eventUserId);
  const resetUIDState = useResetRecoilState(eventUserUID);
  const resetUserTypeState = useResetRecoilState(eventUserType);
  const resetViewItemState = useResetRecoilState(pablosCodeViewItemAtom);

  const handleClickToHome = () => {
    resetPablosCodeState();
    resetSelectionsState();
    resetUserIdState();
    resetUIDState();
    resetUserTypeState();
    resetViewItemState();
    resetScoreState();
    router.push('/');
    sessionStorage.removeItem('recoil-persist');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '60px',
        p: '16px',
        bgcolor: '#F8FCFF',
        position: 'absolute',
        top: 0,
        borderBottom: '1px solid #efefef',
      }}
    >
      <Box sx={{ maxWidth: '1920px', width: '100%', m: '0 auto' }}>
        <Image
          height={24}
          src={logo}
          alt='아트모스피어 로고'
          onClick={handleClickToHome}
          style={{ cursor: 'pointer' }}
        />
      </Box>
    </Box>
  );
};

export default Header;
