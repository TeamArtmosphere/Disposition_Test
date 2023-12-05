import { useKoreanAffix } from '@/hooks/useKoreanAffix';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface MainInfoProps {
  placeData: any;
}

const MainInfo = ({ placeData }: MainInfoProps) => {
  const koreanAffix = useKoreanAffix(placeData.name, '을를');

  return (
    placeData && (
      <Box sx={{ mt: { mobile: '30px', laptop: '100px' } }}>
        <Typography
          variant='h2'
          sx={{ mb: { mobile: '4px', laptop: '7px' }, color: 'secondary.contrastText' }}
        >
          {placeData.name}
        </Typography>
        <Typography
          variant='body1'
          sx={{ mb: { mobile: '21px', laptop: '52px' }, color: 'grey.300' }}
        >
          {placeData.address}
        </Typography>

        {placeData.tags.map((tag: any, idx: number) => (
          <Typography
            key={idx}
            variant='body1'
            sx={{
              width: 'fit-content',
              mb: { mobile: '9px', laptop: '20px' },
              color: '#625d44',
              p: { mobile: '6px 12px', laptop: '12px 24px' },
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: '8px',
            }}
          >
            {tag.display_name}
          </Typography>
        ))}

        <Carousel autoPlay={false} indicators={false} animation={'slide'} height={240}>
          {placeData.extra_info.images.map((image: string, idx2: number) => (
            <Box
              key={idx2}
              sx={{
                height: '240px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <Image
                // layout='fill' // next13부터 layout 사용 안함
                fill
                sizes='100%'
                src={image}
                alt={`${image}의 사진`}
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Carousel>
        <Typography
          variant='h2'
          sx={{
            mt: { mobile: '29px', laptop: '44px' },
            mb: { mobile: '11px', laptop: '32px' },
            color: 'grey.500',
          }}
        >
          {placeData.name + koreanAffix} 추천하는 이유?
        </Typography>
        <Typography variant='body1' color={'grey.400'}>
          {placeData.descriptions.introduction}
        </Typography>
      </Box>
    )
  );
};

export default MainInfo;
