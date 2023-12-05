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
        mt: { mobile: '39px', laptop: '124px' },
        // mb: { mobile: '55px', laptop: '167px' }, // 여기
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
          p: { mobile: '20px', laptop: '37px' },
          color: '#fff',
          wordBreak: 'keep-all',
        }}
      >
        <Box sx={{ flex: 3 }}>
          {/* 12px mobile */}
          <Typography
            variant='h6'
            sx={{ mb: { mobile: '4px', laptop: '8px' }, color: 'primary.main', fontWeight: '700' }}
          >
            나의 PABLOS는?
          </Typography>
          <Typography
            variant='h2'
            sx={{ mb: { mobile: '16px', laptop: '30px' }, color: 'grey.400', fontWeight: '700' }}
          >
            {viewItem.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: { mobile: '6px', laptop: '8px' }, flexWrap: 'wrap' }}>
            {viewItem.tag.map((tag: string[], idx: number) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // minWidth: { mobile: '53px', laptop: '95px' },
                    minWidth: 'fit-content',
                    height: { mobile: '30px', laptop: '56px' },
                    p: { mobile: '6px 12px', laptop: '12px 24px' },
                    bgcolor: '#fff',
                    border: '2px solid #e1e1e1',
                    borderRadius: { mobile: '4px', laptop: '12px' },
                    color: theme.palette.grey[500],
                  }}
                >
                  <Typography variant='body2' sx={{ fontSize: { mobile: '12px', laptop: '20px' } }}>
                    {tag}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Image
            src={capybara}
            alt={viewItem.slide_images[0]}
            fill
            sizes='100%'
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MyPablos;
