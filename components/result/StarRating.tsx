import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export const StarRating = () => {
  const [value, setValue] = React.useState<number | null>(0);

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
        }}
      />
    </Box>
  );
};
