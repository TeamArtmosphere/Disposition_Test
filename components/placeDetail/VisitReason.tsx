import { useKoreanAffix } from '@/hooks/useKoreanAffix';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface VisitReasonProps {
  placeData: any;
}

const VisitReason = ({ placeData }: VisitReasonProps) => {
  const theme = useTheme();
  const koreanAffix = useKoreanAffix(placeData.name, '을를');

  return (
    <Box>
      <Typography
        variant='h2'
        sx={{
          mt: { mobile: '29px', laptop: '44px' },
          mb: { mobile: '11px', laptop: '32px' },
          color: 'grey.500',
        }}
      >
        이럴 때 {placeData.name + koreanAffix} 방문하면 좋아요
      </Typography>
      <Typography
        variant='body1'
        color={'grey.500'}
        sx={{
          display: 'inline',
          lineHeight: '32px',
          minWidth: '154px',
          height: '32px',
          bgcolor: theme.palette.secondary.main,
          border: '1px solid',
          borderColor: theme.palette.primary.main,
          borderRadius: '4px',
          p: '4px 12px',
        }}
      >
        {placeData.name}
      </Typography>
      <Typography variant='body1' color={'grey.500'} mt={'12px'}>
        {placeData.descriptions.introduction}
      </Typography>
    </Box>
  );
};

export default VisitReason;
