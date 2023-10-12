import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useSetRecoilState } from 'recoil';
import { scoreAtom } from '@/recoil/atom';

export const StarRating = () => {
  const [value, setValue] = React.useState<number | null>(0);
  const setScore = useSetRecoilState(scoreAtom);

  return (
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
  );
};
