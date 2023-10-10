import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/imgs/vertical_logo.png';

const Header = () => {
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
      <Image height={24} src={logo} alt='아트모스피어 로고' />
    </Box>
  );
};

export default Header;
