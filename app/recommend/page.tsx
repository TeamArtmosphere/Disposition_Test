'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FlexBox, FlexBoxCol } from '@/style/style';
import { useRecoilValue } from 'recoil';
import { pablosCodeAtom, pablosCodeViewItemAtom } from '@/recoil/atom';
import { getPlace, getPlaceDetail, getRecommendLocationList } from '@/api/axios-api';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-material-ui-carousel';
import { useParams, useRouter } from 'next/navigation';

const Page = () => {
  const theme = useTheme();
  const router = useRouter();
  const onTablet = useMediaQuery(theme.breakpoints.down('desktop'));
  const pablosCode = useRecoilValue(pablosCodeAtom);
  const viewItem = useRecoilValue(pablosCodeViewItemAtom);

  const [locationData, setLocationData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [clicked, setClicked] = useState('');

  useEffect(() => {
    if (pablosCode) {
      getRecommendLocationList(pablosCode)
        .then((data) => {
          setLocationData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setMounted(true);
  }, [pablosCode]);

  const onClickActiveBox = (name: string) => {
    if (clicked === '') {
      setClicked(name);
    } else {
      setClicked('');
    }
  };

  const onClickToPlaceDetail = (id: string) => {
    getPlace()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // getPlaceDetail(id)
    //   .then(data => console.log(data))
    //   .catch(error => console.log(error));
    // router.push(`/placedetail/${id}`);
  };

  return (
    viewItem && (
      <Box sx={{ ...FlexBoxCol, maxWidth: onTablet ? '900px' : '1536px', p: '60px 22px' }}>
        <Typography variant='h1' mt={'30px'} mb={1}>
          <span className='sep_typo'>{viewItem?.name}</span>유형을 위한
          <br />
          불광천 인근 가게를 추천드려요!
        </Typography>
        <Box>
          {locationData.map((location: any, idx: number) => {
            return (
              <Box
                key={idx}
                onClick={() => onClickActiveBox(location.name)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mb: 3,
                  p: '12px',
                  border: clicked === location.name ? '2px solid #ffde3c' : '2px solid #e1e1e1',
                  borderRadius: '12px',
                }}
              >
                <Carousel autoPlay={false} indicators={false} animation='slide' duration={500} height={204}>
                  {location.extra_info.images.map((image: string, idx2: number) => (
                    <Box
                      key={idx2}
                      sx={{
                        height: '204px',
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
                <Typography variant='h3' fontFamily={'Pretendard-Regular'} sx={{ mt: '12px', mb: '6px' }}>
                  {location?.name}
                </Typography>
                <Typography variant='body1' fontFamily={'Pretendard-Regular'}>
                  {location?.descriptions?.introduction}
                </Typography>
                <Link href={`/placedetail/${location.id}`}>
                  {/* <Link target='_blank' href={location.extra_info.links.naver_map}> */}
                  <Box
                    // onClick={() => onClickToPlaceDetail(location.id)}
                    sx={{
                      ...FlexBox,
                      height: '50px',
                      bgcolor: '#ffde3c',
                      borderRadius: '8px',
                      mt: '12px',
                      display: clicked === location.name ? 'flex' : 'none',
                    }}
                  >
                    <Typography variant='h5'>{location?.name} 정보 더 보기</Typography>
                  </Box>
                </Link>
              </Box>
              // </div>
            );
          })}
        </Box>
      </Box>
    )
  );
};

export default Page;
