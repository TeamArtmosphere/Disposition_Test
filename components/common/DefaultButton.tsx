import React from 'react';
import { Button } from '@mui/material';

type ButtonProps = {
  name: string;
  size?: string;
};

const DefaultButton = ({ name, size }: ButtonProps) => {
  return (
    <Button
      color='primary'
      variant='contained'
      sx={{
        width: size === 'lg' ? '300px' : size === 'md' ? '250px' : size === 'sm' ? '150px' : '100%',
      }}
    >
      {name}
    </Button>
  );
};

export default DefaultButton;
