'use client';

import { postRateStar } from '@/api/axios-api';
import DefaultButton from '@/components/common/DefaultButton';
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
import theme from '@/style/theme';
import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

const Page = () => {
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

  const [mounted, setMounted] = useState(false);
  const [ratingMsg, setRatingMsg] = useState('마음에 들어요!');

  const handleClickToHome = () => {
    resetPablosCodeState();
    resetSelectionsState();
    resetUserIdState();
    resetUIDState();
    resetUserTypeState();
    resetViewItemState();
    setScore(null);
    router.push('/');
    localStorage.removeItem('recoil-persist');
  };

  const onClickRateStar = () => {
    if (UID && score) {
      postRateStar({ uid: UID, score: score })
        .then((data) => {
          console.log(data);
          setScore(null);
          setRatingMsg('답변해 주셔서 감사합니다!');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('uid 음슴');
    }
  };

  const onClickLinkSurvey = () => {
    window.open('https://forms.gle/yxMXJ49uTQxo6Fd49');
  };

  console.log(score, '점수점수');

  useEffect(() => {
    setMounted(true);
  }, []);

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
    const filter = pablosInfo.filter((item: any) => code.filter((i: string) => i === item.code).length > 0);
    return filter;
  };

  const filteredPablosCode = pablosCode && filterPablosCode(pablosCode);

  return (
    mounted && (
      <Box sx={{ ...FlexBoxCol, pt: '60px' }}>
        {!pablosCode && !viewItem && (
          <Box sx={{ ...FlexBoxCol, gap: '40px', marginTop: '200px' }}>
            <CircularProgress />
            <Typography variant='h4'>페이지 로드 중입니다.</Typography>
          </Box>
        )}
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
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image src={viewItem.slide_images[0]} alt={viewItem.slide_images[0]} layout='fill' objectFit='contain' />
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
            <Box sx={{ ...FlexContainerCol, p: '24px 22px', gap: '10px' }}>
              <Typography fontSize='18px' fontWeight='600' pb={2}>
                {pablosCode}유형이 추구하는 가치는?
              </Typography>
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

              <Box sx={{ ...FlexBox, width: '100%', mt: '20px', gap: '10px' }}>
                <Button variant='outlined' onClick={handleClickToHome} sx={{ bgcolor: '#C0E0F0', color: '#136ea6' }}>
                  다시 테스트하기
                </Button>
              </Box>

              <Box sx={{ ...FlexContainerCol, mt: '40px', textAlign: 'center' }}>
                <Typography fontSize='18px' fontWeight={600} mb='10px'>
                  {pablosCode}유형에게 추천하는 장소
                </Typography>
                <Typography variant='h5' mb='20px'>
                  불광천에 이런 공간이 있다고?
                  <br />
                  당신의 취향에 맞는 장소를 확인해보세요!
                </Typography>
                <Box sx={{ ...FlexContainer, gap: '10px', overflow: 'scroll', mb: '30px' }}>
                  {viewItem.slide_images &&
                    viewItem.slide_images.map((item: any, idx: number) => {
                      return (
                        <Image
                          key={idx}
                          width={293}
                          height={175}
                          src={item}
                          alt={item}
                          style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}
                        />
                      );
                    })}
                </Box>
              </Box>

              <Divider variant='middle' sx={{ width: '100%' }} />

              <Box sx={{ ...FlexContainerCol, mt: '40px', textAlign: 'center' }}>
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
              </Box>

              <Box sx={{ ...FlexBox, width: '100%', mt: '20px', gap: '10px' }}>
                <DefaultButton title='설문조사 하러 가기' size='n' onClick={onClickLinkSurvey} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    )
  );
};

export default Page;
