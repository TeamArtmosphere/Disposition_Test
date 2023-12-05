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
  const [placeData, setPlaceData] = useState<any>();

  useEffect(() => {
    getPlaceDetail(id)
      .then(data => {
        setPlaceData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    placeData && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { mobile: 10, laptop: 20 },
          maxWidth: { mobile: '100%', laptop: '640px' },
          p: { mobile: 3, laptop: 0 },
          pb: { mobile: 5, laptop: 10 },
          pt: { mobile: 7, laptop: '100px' },
          m: '0 auto',
        }}
      >
        <MainInfo placeData={placeData} />
        <VisitReason placeData={placeData} />
        <WorkInfo placeData={placeData} />
      </Box>
    )
  );
};

export default Page;
