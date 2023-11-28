import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { FlexBox, FlexBoxCol, FlexContainerCol } from '@/style/style';
import Image from 'next/image';
import goBtn from '@/public/imgs/icon_more.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MyPablosProps {
  viewItem: any;
  locationData: any;
  pablosCode: string;
}

const PlaceSlider = ({ viewItem, locationData, pablosCode }: MyPablosProps) => {
  const router = useRouter();

  const handleClickToRecommend = () => {
    router.push('/recommend');
  };

  return (
    <Box
      sx={
        {
          // height: '100%',
        }
      }
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' mb='20px' fontFamily={'Pretendard-Regular'}>
          불광천에 이런 공간이?
          <br />
          {viewItem.name}들을 위한 추천 장소에요!
        </Typography>
        <Button
          variant='contained'
          disableElevation
          onClick={handleClickToRecommend}
          sx={{
            width: '64px',
            height: '32px',
            bgcolor: 'grey.50',
            color: 'grey.500',
            fontSize: '12px',
            p: 0,
          }}
        >
          더보기
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            ...FlexBox,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '10px',
            overflowX: 'scroll',
            mb: '23px',
            width: '100%',
            // m: '0 auto',
            pr: '22px',
          }}
        >
          {locationData.length > 0 &&
            locationData.map((location: any, idx: number) => {
              return (
                <Link target='_blank' href={location.extra_info.links.naver_map} key={idx}>
                  <Box
                    sx={{
                      ...FlexBoxCol,
                      flexShrink: 0,
                      width: '259px',
                      height: '148px',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
                    <Image
                      fill
                      sizes='100%'
                      src={location.extra_info.images[0]}
                      alt={`${location.name}의 사진`}
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      ...FlexBox,
                      width: '100%',
                      justifyContent: 'space-between',
                      m: '4px 0',
                    }}
                  >
                    <Typography variant='h3' fontWeight={700}>
                      {location.name}
                    </Typography>
                    <Image
                      src={goBtn}
                      alt={`${location.name}정보로 이동`}
                      width={24}
                      style={{ paddingBottom: 4 }}
                    />
                  </Box>
                  <Typography variant='h6' fontWeight={500}>
                    {location.address}
                  </Typography>
                </Link>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceSlider;
