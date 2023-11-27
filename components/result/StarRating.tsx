import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useSetRecoilState } from 'recoil';
import { scoreAtom } from '@/recoil/atom';
import { Button, Typography } from '@mui/material';
import { FlexBox, FlexBoxCol, FlexContainerCol } from '@/style/style';

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
    <Box sx={{ pb: 7 }}>
      <Typography className='text_body' fontSize='18px' fontWeight={600} mb='10px'>
        테스트 유형이 잘 맞나요?
      </Typography>
      <Typography className='text_body' variant='h5' mb='20px'>
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
          mb: '20px',
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
      <Box sx={{ ...FlexBox, width: '100%', mb: '50px', gap: '10px' }}>
        <Button variant='outlined' onClick={handleClickToHome}>
          다시 테스트하기
        </Button>
        <Button variant='contained' onClick={onClickShareKakao}>
          공유하기
        </Button>
      </Box>
    </Box>
  );
};
