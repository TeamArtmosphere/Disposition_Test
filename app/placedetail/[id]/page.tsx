'use client';

import { getPlaceDetail } from '@/api/axios-api';
import MainInfo from '@/components/placeDetail/MainInfo';
import VisitReason from '@/components/placeDetail/VisitReason';
import WorkInfo from '@/components/placeDetail/WorkInfo';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';

// export async function generateStaticParams() {
//   //   const placedetail = await getPlace();

//   const res = await fetch('/api/v1/artmosphere-places/1');
//   const placedetail = await res.json();

//   return placedetail.map((place: any) => ({
//     id: place.id.toString(),
//   }));

//   return placedetail.id;
// }

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'));
  const [placeData, setPlaceData] = useState<any>();

  useEffect(() => {
    getPlaceDetail(id)
      .then((data) => {
        setPlaceData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(placeData);

  return (
    placeData && (
      <Box sx={{ height: '100%', p: onDesktop ? 12 : 3, pt: 7 }}>
        <MainInfo placeData={placeData} onDesktop={onDesktop} />
        <VisitReason placeData={placeData} />
        <WorkInfo placeData={placeData} />
      </Box>
    )
  );
};

export default Page;
