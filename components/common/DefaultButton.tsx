import React from 'react';
import { Button } from '@mui/material';

type ButtonProps = {
  name: string;
  size?: string;
  onClick?: (e?: any) => void;
};

const DefaultButton = ({ name, size, onClick }: ButtonProps) => {
  return (
    <Button
      name={name}
      color='primary'
      variant='contained'
      onClick={onClick}
      sx={{
        width: size === 'lg' ? '300px' : size === 'md' ? '250px' : size === 'sm' ? '150px' : '100%',
      }}
    >
      {name}
    </Button>
  );
};

export default DefaultButton;
