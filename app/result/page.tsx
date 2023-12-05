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
  selectionsAtom,
} from '@/recoil/atom';
import { FlexBoxCol } from '@/style/style';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import MyPablos from '@/components/result/MyPablos';
import PlaceSlider from '@/components/result/PlaceSlider';
import PablosDesc from '@/components/result/PablosDesc';

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

  const onClickShareKakao = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '딸기 치즈 케익',
        description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
        imageUrl:
          'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: 'http://localhost:3000',
          webUrl: 'http://localhost:3000',
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'http://localhost:3000',
            webUrl: 'http://localhost:3000',
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: 'http://localhost:3000',
            webUrl: 'http://localhost:3000',
          },
        },
      ],
    });
  };

  const onClickRateStar = () => {
    if (UID && score) {
      postRateStar({ uid: UID, score: score })
        .then(data => {
          setScore(null);
          setRatingMsg('답변해 주셔서 감사합니다!');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('uid가 없습니다.');
    }
  };

  useEffect(() => {
    if (pablosCode) {
      getRecommendLocationList(pablosCode)
        .then(data => {
          setLocationData(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    setMounted(true);
  }, [pablosCode]);

  const [mounted, setMounted] = useState(false);

  return !mounted ? (
    <Box
      sx={{
        ...FlexBoxCol,
        gap: '40px',
        marginTop: '200px',
      }}
    >
      <CircularProgress />
      <Typography variant='h4'>페이지 로드 중입니다.</Typography>
    </Box>
  ) : pablosCode && viewItem ? (
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
      <PlaceSlider
        viewItem={viewItem}
        locationData={locationData}
        pablosCode={pablosCode}
        onDesktop={onDesktop}
      />
      <PablosDesc viewItem={viewItem} />
      <StarRating
        ratingMsg={ratingMsg}
        score={score}
        onClickShareKakao={onClickShareKakao}
        onClickRateStar={onClickRateStar}
        handleClickToHome={handleClickToHome}
      />
    </Box>
  ) : null;
};

export default Page;
