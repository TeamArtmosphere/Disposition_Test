import React from 'react';
import { Button } from '@mui/material';

type ButtonProps = {
  id?: any;
  sub_id?: number;
  title: string;
  name?: string;
  size?: string;
  onClick?: (e?: any) => void;
};

const DefaultButton = ({ id, sub_id, title, name, size, onClick }: ButtonProps) => {
  return (
    <Button
      id={id}
      name={name}
      key={sub_id}
      color='primary'
      variant='contained'
      onClick={onClick}
      sx={{
        width: size === 'lg' ? '300px' : size === 'md' ? '250px' : size === 'sm' ? '150px' : '100%',
      }}
    >
      {title}
    </Button>
  );
};

export default DefaultButton;
