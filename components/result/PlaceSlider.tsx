import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { FlexBox, FlexBoxCol } from '@/style/style';
import Image from 'next/image';
import goBtn from '@/public/imgs/icon_more.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MyPablosProps {
  viewItem: any;
  locationData: any;
  onDesktop?: boolean;
  handleClickToRecommend?: () => void;
}

const PlaceSlider = ({ viewItem, locationData, onDesktop, handleClickToRecommend }: MyPablosProps) => {
  const router = useRouter();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          mb: { mobile: '15px', laptop: '30px' },
        }}
      >
        <Typography variant='body1'>
          불광천에 이런 공간이?
          <br />
          {viewItem?.name}들을 위한 추천 장소에요!
        </Typography>
        <Button
          variant='contained'
          disableElevation
          onClick={handleClickToRecommend}
          sx={{
            width: 'fit-content',
            bgcolor: 'grey.50',
            color: 'grey.500',
            fontSize: { mobile: '12px', laptop: '16px' },
            p: { mobile: '8px 16px', laptop: '12px 43px' },
          }}
        >
          더보기
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          // width: '100%',
          // width: 'calc(100% + 24*2)',
          mr: { mobile: '-24px', laptop: '0' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            ...FlexBox,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: { mobile: '12px', laptop: '24px' },
            overflowX: 'scroll',
            width: '100%',
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
                      width: { mobile: '259px', laptop: '360px' },
                      height: { mobile: '148px', laptop: '200px' },
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      mb: { mobile: 1, laptop: 1.5 },
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
                    }}
                  >
                    <Typography variant={onDesktop ? 'h4' : 'h3'} fontWeight={700}>
                      {location.name}
                    </Typography>
                    <Image
                      src={goBtn}
                      alt={`${location.name}정보로 이동`}
                      width={24}
                      height={24}
                      style={{ paddingBottom: 4 }}
                    />
                  </Box>
                  <Typography variant='body2' fontWeight={500} sx={{ color: 'grey.200' }}>
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
