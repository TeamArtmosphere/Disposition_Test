import theme from '@/style/theme';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import capybara from '@/public/imgs/capybara.png';

interface MyPablosProps {
  viewItem: any;
  onDesktop: boolean;
}

const MyPablos = ({ viewItem, onDesktop }: MyPablosProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        mt: onDesktop ? '154px' : '39px',
        mb: onDesktop ? '58px' : '55px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          bgcolor: theme.palette.secondary.main,
          borderRadius: '12px',
          border: '2px solid',
          borderColor: theme.palette.primary.main,
          p: '20px',
          color: '#fff',
          wordBreak: 'keep-all',
        }}
      >
        <Box sx={{ flex: 3 }}>
          {/* 12px mobile */}
          <Typography
            // variant='h2'
            // fontSize={'12px'}
            mb={onDesktop ? '24px' : '4px'}
            color={'grey.100'}
          >
            나의 PABLOS는?
          </Typography>
          {/* 20px mobile */}
          <Typography
            variant='h3'
            fontSize={'20px'}
            fontWeight={700}
            mb={onDesktop ? '24px' : '19px'}
            color={'grey.400'}
          >
            {viewItem.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: onDesktop ? 3 : 1, flexWrap: 'wrap' }}>
            {viewItem.tag.map((tag: string[], idx: number) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: onDesktop ? '123px' : '53px',
                    height: onDesktop ? '72px' : '30px',
                    p: onDesktop ? '12px 24px' : '6px 12px',
                    bgcolor: '#fff',
                    border: '1px solid #e1e1e1',
                    borderRadius: '4px',
                    color: theme.palette.grey[500],
                  }}
                >
                  <Typography
                    variant='body2'
                    fontFamily={'Pretendard_Regular'}
                    sx={{ fontSize: onDesktop ? '32px' : '12px' }}
                  >
                    {tag}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Image src={capybara} alt={viewItem.slide_images[0]} layout='fill' objectFit='contain' />
        </Box>
      </Box>
    </Box>
  );
};

export default MyPablos;
