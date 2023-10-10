import React from 'react';
import { Button } from '@mui/material';

type ButtonProps = {
  id?: string;
  title: string;
  name?: string;
  size?: string;
  onClick?: (e?: any) => void;
};

const SelectionButton = ({ id, title, name, size, onClick }: ButtonProps) => {
  return (
    <Button
      id={id}
      name={name}
      color='primary'
      variant='outlined'
      disableElevation
      onClick={onClick}
      sx={{
        width: size === 'lg' ? '650px' : size === 'md' ? '470px' : size === 'sm' ? '330px' : '100%',
        height: '65px',
        fontSize: '18px',
        border: '1px solid #CFE6F2',
      }}
    >
      {title}
    </Button>
  );
};

export default SelectionButton;
