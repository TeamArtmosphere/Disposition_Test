import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import iconCall from '@/public/imgs/icon_call.png';
import iconHouse from '@/public/imgs/icon_house.png';
import iconPin from '@/public/imgs/icon_pin.png';
import iconTime from '@/public/imgs/icon_time.png';
import Image from 'next/image';

const flexBox = { display: 'flex', alignItems: 'center', gap: '12px' };

interface WorkInfoProps {
  placeData: any;
}

const WorkInfo = ({ placeData }: WorkInfoProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ pb: '36px' }}>
      <Typography variant='h2' mb={'38px'} mt={'80px'} color={'grey.500'}>
        가게정보
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ ...flexBox }}>
          <Image src={iconPin} alt='위치 아이콘' width={24} height={24} />
          <Typography variant='h5' color={'grey.500'} fontFamily={'Pretendard-Regular'}>
            {placeData.address}
          </Typography>
        </Box>
        <Box sx={{ ...flexBox }}>
          <Image src={iconTime} alt='위치 아이콘' width={24} height={24} />
          <Typography variant='h5' color={'grey.500'} fontFamily={'Pretendard-Regular'}>
            {placeData.extra_info.working_hours?.summary}
          </Typography>
        </Box>
        <Box sx={{ ...flexBox }}>
          <Image src={iconCall} alt='위치 아이콘' width={24} height={24} />
          <Typography variant='h5' color={'grey.500'} fontFamily={'Pretendard-Regular'}>
            {placeData.extra_info.contact_number}
          </Typography>
        </Box>
        <Box sx={{ ...flexBox }}>
          <Image src={iconHouse} alt='위치 아이콘' width={24} height={24} />
          <Typography variant='h5' color={'grey.500'} fontFamily={'Pretendard-Regular'}>
            블로그
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkInfo;
