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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { mobile: '38px', laptop: '48px' } }}>
      <Typography
        variant='h2'
        sx={{
          // mb: { mobile: '38px', laptop: '32px' },
          color: 'grey.500',
        }}
      >
        이럴 때 {placeData.name + koreanAffix} 방문하면 좋아요
      </Typography>
      {placeData.descriptions.reasons.map((reason: any, idx: number) => (
        <Box key={idx}>
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
            {reason.title}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              mt: { mobile: '16px', laptop: '24px' },
              // mb: { mobile: '38px', laptop: '48px' },
              color: 'grey.500',
            }}
          >
            {reason.content}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default VisitReason;
