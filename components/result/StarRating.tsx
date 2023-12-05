import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useSetRecoilState } from 'recoil';
import { scoreAtom } from '@/recoil/atom';
import { Button, Typography } from '@mui/material';
import { FlexBox, FlexContainerCol } from '@/style/style';

interface StarRatingProps {
  score: number | null;
  ratingMsg: string;
  onClickRateStar: () => void;
  onClickShareKakao: () => void;
  handleClickToHome: () => void;
}

export const StarRating = ({
  ratingMsg,
  score,
  onClickRateStar,
  onClickShareKakao,
  handleClickToHome,
}: StarRatingProps) => {
  const [value, setValue] = React.useState<number | null>(0);
  const setScore = useSetRecoilState(scoreAtom);

  return (
    <Box>
      {/* <Box sx={{ pb: 7 }}> */}
      <Typography variant='h4' mb='10px'>
        테스트 유형이 잘 맞나요?
      </Typography>
      <Typography variant='body1' mb='20px' fontFamily={'Pretendard-Regular'}>
        테스트 만족도 설문조사에 참여하면
        <br />
        추첨을 통해 스타벅스 커피 쿠폰을 보내드려요!
      </Typography>
      <Box
        sx={{
          ...FlexContainerCol,
          minHeight: '100px',
          gap: 1,
          bgcolor: 'grey.50',
          borderRadius: '8px',
          mb: { mobile: '20px', laptop: '36px' },
          p: 2,
        }}
      >
        <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
        >
          <Rating
            name='size-large'
            size='large'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setScore(newValue);
            }}
          />
        </Box>
        <Typography variant='body2'>{ratingMsg}</Typography>
        {score && (
          <Button
            disableElevation
            disableRipple
            variant='contained'
            onClick={onClickRateStar}
            sx={{ width: '90px', height: '28px', fontSize: '12px' }}
          >
            별점 주기
          </Button>
        )}
      </Box>
      <Box sx={{ ...FlexBox, width: '100%', mb: '50px', gap: '10px' }}>
        <Button
          variant='outlined'
          onClick={handleClickToHome}
          sx={{
            height: { mobile: '40px', laptop: '56px ' },
            fontSize: { mobile: '14px', laptop: '20px ' },
            borderRadius: '8px',
            borderColor: 'primary.main',
            color: 'grey.200',
          }}
        >
          다시 테스트하기
        </Button>
        <Button
          variant='contained'
          onClick={onClickShareKakao}
          sx={{
            height: { mobile: '40px', laptop: '56px ' },
            fontSize: { mobile: '14px', laptop: '20px ' },
            borderRadius: '8px',
          }}
        >
          공유하기
        </Button>
      </Box>
    </Box>
  );
};
