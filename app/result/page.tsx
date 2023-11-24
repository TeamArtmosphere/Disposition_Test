'use client';

import { getRecommendLocationList, postRateStar } from '@/api/axios-api';
import { StarRating } from '@/components/result/StarRating';
import {
  eventUserId,
  eventUserType,
  eventUserUID,
  pablosCodeAtom,
  pablosCodeViewItemAtom,
  scoreAtom,
  selectionsAtom,
} from '@/recoil/atom';
import { FlexBox, FlexBoxCol, FlexContainerCol } from '@/style/style';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
  const resetSelectionsState = useResetRecoilState(selectionsAtom);
  const resetUserIdState = useResetRecoilState(eventUserId);
  const resetUIDState = useResetRecoilState(eventUserUID);
  const resetUserTypeState = useResetRecoilState(eventUserType);
  const resetViewItemState = useResetRecoilState(pablosCodeViewItemAtom);

  // const [mounted, setMounted] = useState(false);
  const [ratingMsg, setRatingMsg] = useState('마음에 들어요!');
  const [locationData, setLocationData] = useState([]);

  const handleClickToHome = () => {
    resetPablosCodeState();
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
      console.log({ uid: UID, score: score });
      postRateStar({ uid: UID, score: score })
        .then(data => {
          console.log(data);
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

  console.log(UID);

  console.log(score, '점수점수');

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

  const pablosInfo = [
    { code: 'I', desc: '개인적인' },
    { code: 'S', desc: '사교적인' },
    { code: 'X', desc: '경험추구' },
    { code: 'P', desc: '상품추구' },
    { code: 'V', desc: '가치추구' },
    { code: 'R', desc: '가성비추구' },
  ];

  const filterPablosCode = (pablosCode: any) => {
    const code = pablosCode.split('');
    const filter = pablosInfo.filter(
      (item: any) => code.filter((i: string) => i === item.code).length > 0,
    );
    return filter;
  };

  const filteredPablosCode = pablosCode && filterPablosCode(pablosCode);

  const [mounted, setMounted] = useState(false);

  console.log(onTablet);

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
    <Box sx={{ height: '100%', p: onDesktop ? 12 : 3, pt: 7 }}>
      <MyPablos viewItem={viewItem} onDesktop={onDesktop} />
      <PlaceSlider viewItem={viewItem} locationData={locationData} pablosCode={pablosCode} />
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
