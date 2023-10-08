import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/imgs/vertical_logo.png';

const Header = () => {
  return (
    <Box sx={{ height: '60px' }}>
      <Image height={24} src={logo} alt='아트모스피어 로고' />
    </Box>
  );
};

export default Header;
