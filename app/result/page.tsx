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
import { FlexBox, FlexBoxCol, FlexContainerCol, FlexContainer } from '@/style/style';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import goBtn from '@/public/imgs/left_btn.png';
import Link from 'next/link';

const Page = () => {
  const theme = useTheme();
  const onTablet = useMediaQuery(theme.breakpoints.down('lg'));

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

  const onClickLinkSurvey = () => {
    window.open('https://forms.gle/yxMXJ49uTQxo6Fd49');
  };

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
  ) : (
    <Box sx={{ ...FlexBoxCol, pt: '60px', maxWidth: onTablet ? '900px' : '1536px' }}>
      {pablosCode && viewItem && (
        <>
          <Typography variant='h4' mt={'30px'} mb={'30px'}>
            나의 PABLOS는?
          </Typography>
          <Typography
            variant='h4'
            fontWeight={600}
            sx={{
              minWidth: '100px',
              p: '4px 20px',
              lineHeight: '31px',
              color: 'white',
              bgcolor: theme.palette.primary.main,
              borderRadius: '50px',
              mb: '20px',
              textAlign: 'center',
            }}
          >
            {viewItem.name}
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '204px',
              bgcolor: '#ececec',
              position: 'relative',
            }}
          >
            <Image
              src={viewItem.slide_images[0]}
              alt={viewItem.slide_images[0]}
              layout='fill'
              objectFit='contain'
            />
          </Box>
          <Box
            sx={{
              ...FlexContainerCol,
              height: '90px',
              bgcolor: theme.palette.primary.main,
              color: 'white',
            }}
          >
            <Typography variant='h4' fontWeight={600} pb={1}>
              {viewItem.intro}
            </Typography>
            <Box sx={FlexBox}>
              {filteredPablosCode && (
                <Typography variant='h5'>
                  {`${filteredPablosCode[0].desc} ${filteredPablosCode[0].code} / ${filteredPablosCode[1].desc} ${filteredPablosCode[1].code} / ${filteredPablosCode[2].desc} ${filteredPablosCode[2].code}`}
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ ...FlexContainerCol, p: '24px 0' }}>
            <Typography fontSize='18px' fontWeight='600' pb={2}>
              {pablosCode}유형이 추구하는 가치는?
            </Typography>
            <Box sx={{ ...FlexBoxCol, gap: '10px', p: '0 22px', pb: 3 }}>
              {viewItem.descriptions &&
                viewItem.descriptions.map((desc: any, idx: number) => {
                  return (
                    <Box
                      key={idx}
                      sx={{
                        width: '100%',
                        minHeight: '100px',
                        bgcolor: 'white',
                        border: '1px solid #CFE6F2',
                        borderRadius: '20px',
                        p: '18px 24px',
                        textAlign: 'center',
                      }}
                    >
                      <Typography fontSize='18px' fontWeight='600' pb={2} color={'primary'}>
                        {desc.title}
                      </Typography>
                      <Typography variant='h5' color={'#262B41'}>
                        {desc.content}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>

            {/* <Box
              sx={{ ...FlexBox, width: '100%', mt: '20px', mb: '50px', gap: '10px', p: '0 22px' }}
            ></Box> */}

            <Divider variant='middle' sx={{ width: '95%' }} />

            <Box
              sx={{
                ...FlexContainerCol,
                mt: '30px',
                textAlign: 'center',
              }}
            >
              <Typography fontSize='18px' fontWeight={600} mb='10px'>
                {pablosCode}유형에게 추천하는 장소
              </Typography>
              <Typography variant='h5' mb='20px'>
                불광천에 이런 공간이 있다고?
                <br />
                당신의 취향에 맞는 장소를 확인해보세요!
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  pl: '22px',
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
                    mb: '30px',
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
                              width: '293px',
                              height: '175px',
                              position: 'relative',
                              overflow: 'hidden',
                              borderRadius: '10px',
                            }}
                          >
                            <Image
                              layout='fill'
                              objectFit='cover'
                              sizes='100%'
                              src={location.extra_info.images[0]}
                              alt={`${location.name}의 사진`}
                            />
                            <Box
                              sx={{
                                ...FlexBox,
                                width: '100%',
                                position: 'absolute',
                                bottom: 0,
                                pl: 2,
                                pb: 2,
                                pr: 1,
                                color: 'white',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography fontSize={'24px'} fontWeight={700}>
                                {location.name}
                              </Typography>
                              <Image
                                src={goBtn}
                                alt={`${location.name}정보로 이동`}
                                width={36}
                                style={{ paddingBottom: 4 }}
                              />
                            </Box>
                          </Box>
                        </Link>
                      );
                    })}
                </Box>
              </Box>
              <Box sx={{ ...FlexBox, width: '100%', mb: '50px', gap: '10px', p: '0 22px' }}>
                <Button
                  variant='outlined'
                  onClick={handleClickToRecommend}
                  sx={{ bgcolor: '#C0E0F0', color: '#136ea6' }}
                >
                  더 많은 장소 보기
                </Button>
              </Box>
            </Box>

            <Divider variant='middle' sx={{ width: '95%' }} />

            <Box sx={{ ...FlexContainerCol, mt: '30px', textAlign: 'center', p: '0 22px' }}>
              <Typography fontSize='18px' fontWeight={600} mb='10px'>
                테스트 유형이 잘 맞나요?
              </Typography>
              <Typography variant='h5' mb='20px'>
                추천 만족도를 별점으로 평가해주세요!
              </Typography>
              <Box
                sx={{
                  ...FlexContainerCol,
                  minHeight: '100px',
                  gap: 2,
                  bgcolor: 'white',
                  border: '1px solid #CFE6F2',
                  borderRadius: '20px',
                  mb: '20px',
                  p: 2,
                }}
              >
                <StarRating />
                <Typography variant='h5'>{ratingMsg}</Typography>
                {score && (
                  <Button
                    variant='outlined'
                    onClick={onClickRateStar}
                    sx={{ width: '100px', height: '30px', bgcolor: '#C0E0F0', color: '#136ea6' }}
                  >
                    별점 주기
                  </Button>
                )}
              </Box>
              <Typography variant='h5' mb='20px'>
                아트모스피어 베타테스터에 등록하시면
                <br />
                추첨을 통해 기프티콘을 보내드립니다!
              </Typography>
              <Box sx={{ ...FlexBox, width: '100%', mb: '50px', gap: '10px' }}>
                <Button
                  variant='outlined'
                  onClick={handleClickToHome}
                  sx={{ bgcolor: '#C0E0F0', color: '#136ea6' }}
                >
                  다시 테스트하기
                </Button>
                <Button
                  variant='outlined'
                  onClick={onClickShareKakao}
                  sx={{ bgcolor: '#C0E0F0', color: '#136ea6' }}
                >
                  공유하기
                </Button>
                {/* <DefaultButton title='설문조사 하러 가기' size='n' onClick={onClickLinkSurvey} /> */}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Page;
