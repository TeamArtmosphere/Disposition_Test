'use client';

import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FlexBox, FlexBoxCol, FlexContainerCol, FlexContainer } from '@/style/style';
import { useRecoilValue } from 'recoil';
import { pablosCodeAtom, pablosCodeViewItemAtom } from '@/recoil/atom';
import { getRecommendLocationList } from '@/api/axios-api';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-material-ui-carousel';

const Page = () => {
  const theme = useTheme();
  const onTablet = useMediaQuery(theme.breakpoints.down('desktop'));
  const pablosCode = useRecoilValue(pablosCodeAtom);
  const viewItem = useRecoilValue(pablosCodeViewItemAtom);

  const [locationData, setLocationData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (pablosCode) {
      getRecommendLocationList(pablosCode)
        .then(data => {
          console.log(data);
          setLocationData(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    setMounted(true);
  }, [pablosCode]);

  console.log(pablosCode, viewItem);

  return (
    <Box sx={{ ...FlexBoxCol, maxWidth: onTablet ? '900px' : '1536px', p: '60px 22px' }}>
      <Typography variant='h4' mt={'30px'} mb={1}>
        불광천 인근 가볼만한 곳
      </Typography>
      <Typography
        // variant='h4'
        fontSize={'18px'}
        fontWeight={600}
        sx={{
          minWidth: '100px',
          p: '4px 20px',
          color: 'white',
          bgcolor: theme.palette.primary.main,
          borderRadius: '50px',
          mb: '20px',
          textAlign: 'center',
        }}
      >
        {pablosCode}유형이라면 바로 여기!
      </Typography>
      <Box>
        {locationData.map((location: any, idx: number) => {
          return (
            <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Carousel autoPlay={false}>
                {location.extra_info.images.map((image: string, idx2: number) => (
                  <Box
                    key={idx2}
                    sx={{
                      //   width: '100%',
                      height: '204px',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '10px',
                    }}
                  >
                    <Image
                      layout='fill'
                      objectFit='cover'
                      sizes='100%'
                      src={image}
                      alt={`${image}의 사진`}
                    />
                  </Box>
                ))}
              </Carousel>
              <Typography variant='h4' fontWeight={600} sx={{ mt: '12px', mb: '6px' }}>
                {location?.name}
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  color: 'white',
                  //   minWidth: '10px',
                  bgcolor: theme.palette.primary.main,
                  mb: '12px',
                  p: '1px 12px',
                  borderRadius: '24px',
                }}
              >
                {location?.address}
              </Typography>
              <Typography variant='h6'>{location?.descriptions?.introduction}</Typography>
              <Link target='_blank' href={location.extra_info.links.naver_map}>
                <Box
                  sx={{
                    ...FlexBox,
                    // width: '100%',
                    height: '50px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    m: '16px 0',
                  }}
                >
                  <Typography variant='h5'>{location?.name} 정보 더 보기</Typography>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Page;
