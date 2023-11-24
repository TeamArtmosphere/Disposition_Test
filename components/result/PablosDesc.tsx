import { Box, Typography } from '@mui/material';
import React from 'react';
import { FlexBox, FlexBoxCol, FlexContainerCol } from '@/style/style';
import theme from '@/style/theme';

interface PablosDescProps {
  viewItem: any;
}

const PablosDesc = ({ viewItem }: PablosDescProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 10 }}>
      <Typography className='text_body_title' mb={'24px'}>
        {viewItem.summary}
      </Typography>
      <Box>
        {viewItem &&
          viewItem.descriptions.map((desc: any, idx: number) => {
            return (
              <Box key={idx} sx={{ mb: '36px' }}>
                <Typography
                  className='text_body'
                  fontWeight='600'
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
                    mb: '12px',
                  }}
                >
                  {desc.title}
                </Typography>
                <Typography className='text_body' variant='h5' color={'grey.500'}>
                  {desc.content}
                </Typography>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default PablosDesc;
333639;
