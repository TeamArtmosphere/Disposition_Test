'use client';

import { getRecommendLocationList, postRateStar } from '@/api/axios-api';
import { StarRating } from '@/components/result/StarRating';
import {
  eventUserId,
  eventUserType,
  eventUserUID,
  interimPablosCodeAtom,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  scoreAtom,
  selectedTagsAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

// import MyPablos from '@/components/result/MyPablos';
import PlaceSlider from '@/components/result/PlaceSlider';
import PablosDesc from '@/components/result/PablosDesc';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FlexContainer } from '@/style/style';

const MyPablos = React.lazy(() => import('@/components/result/MyPablos'));

const Page = () => {
  const theme = useTheme();
  const onTablet = useMediaQuery(theme.breakpoints.between('tablet', 'mobile'));
  const onDesktop = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'));

  const router = useRouter();
  const UID = useRecoilValue(eventUserUID);
  const pablosCode = useRecoilValue(pablosCodeAtom);
  const viewItem = useRecoilValue(pablosCodeViewItemAtom);
  // const pablosCodeViewItem = viewItem && JSON.parse(viewItem);

  const [score, setScore] = useRecoilState(scoreAtom);

  const resetPablosCodeState = useResetRecoilState(pablosCodeAtom);
  const resetInterimPablosCodeState = useResetRecoilState(interimPablosCodeAtom);
  const resetSelectionsState = useResetRecoilState(selectionsAtom);
  const resetSelectedTagList = useResetRecoilState(selectedTagsAtom);
  const resetUserIdState = useResetRecoilState(eventUserId);
  const resetUIDState = useResetRecoilState(eventUserUID);
  const resetUserTypeState = useResetRecoilState(eventUserType);
  const resetViewItemState = useResetRecoilState(pablosCodeViewItemAtom);

  // const [mounted, setMounted] = useState(false);
  const [ratingMsg, setRatingMsg] = useState('추천 만족도를 별점으로 평가해주세요');
  const [locationData, setLocationData] = useState([]);

  const handleClickToHome = () => {
    resetPablosCodeState();
    resetInterimPablosCodeState();
    resetSelectionsState();
    resetSelectedTagList();
    resetUserIdState();
    resetUIDState();
    resetUserTypeState();
    resetViewItemState();
    setScore(null);
    router.push('/');
    sessionStorage.removeItem('recoil-persist');
  };

  const handleClickToRecommend = () => {
    router.push('/recommend');
  };

  // 별점 주기
  const onClickRateStar = () => {
    if (UID && score) {
      postRateStar({ uid: UID, score: score })
        .then((data) => {
          setScore(null);
          setRatingMsg('답변해 주셔서 감사합니다!');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('uid가 없습니다.');
    }
  };

  useEffect(() => {
    setTimeout(() => {
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
    }, 1500);
  }, [pablosCode]);

  const [mounted, setMounted] = useState(false);

  // !mounted ? (
  //   <Box
  //     sx={{
  //       ...FlexBoxCol,
  //       gap: '40px',
  //       marginTop: '200px',
  //     }}
  //   >
  //     <CircularProgress />
  //     <Typography variant='h4'>페이지 로드 중입니다.</Typography>
  //   </Box>
  // ) : pablosCode && viewItem ? (

  console.log(viewItem, pablosCode, locationData);

  return !mounted ? (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingSpinner text={`공간 취향을\n\n분석 중입니다...`} />
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { mobile: 5, laptop: 8 },
        maxWidth: { mobile: '100%', laptop: '640px' },
        p: { mobile: 3, laptop: 0 },
        pb: { mobile: 5, laptop: 10 },
        pt: { mobile: 7, laptop: '100px' },
        m: '0 auto',
      }}
    >
      <MyPablos viewItem={viewItem} onDesktop={onDesktop} />
      {/* <MyPablos viewItem={viewItem} onDesktop={onDesktop} /> */}
      <PlaceSlider
        viewItem={viewItem}
        locationData={locationData}
        onDesktop={onDesktop}
        handleClickToRecommend={handleClickToRecommend}
      />
      <PablosDesc viewItem={viewItem} />
      <StarRating
        ratingMsg={ratingMsg}
        score={score}
        onClickRateStar={onClickRateStar}
        handleClickToHome={handleClickToHome}
      />
    </Box>
  );
};

export default Page;
