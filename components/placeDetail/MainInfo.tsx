import { useKoreanAffix } from '@/hooks/useKoreanAffix';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface MainInfoProps {
  placeData: any;
  onDesktop?: boolean;
}

const MainInfo = ({ placeData, onDesktop }: MainInfoProps) => {
  const koreanAffix = useKoreanAffix(placeData.name, '을를');

  return (
    <Box>
      <Typography variant='h2' mb={onDesktop ? '24px' : '4px'} mt={'30px'} color={'secondary.contrastText'}>
        {placeData.name}
      </Typography>
      <Typography variant='h5' mb={'8px'} color={'grey.300'}>
        {placeData.address}
      </Typography>
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
      <Typography variant='h2' mb={onDesktop ? '24px' : '4px'} mt={'29px'} color={'grey.500'}>
        {placeData.name + koreanAffix} 추천하는 이유?
      </Typography>
      <Typography
        variant='body1'
        mb={onDesktop ? '24px' : '4px'}
        mt={'11px'}
        color={'grey.400'}
        fontFamily={'Pretendard-Regular'}
      >
        {placeData.descriptions.introduction}
      </Typography>
    </Box>
  );
};

export default MainInfo;
