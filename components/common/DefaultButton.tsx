import React from 'react';
import { Button } from '@mui/material';

type ButtonProps = {
  id?: string;
  title: string;
  name?: string;
  size?: string;
  onClick?: (e?: any) => void;
  sx?: any;
  disabled?: boolean;
};

const DefaultButton = ({ id, title, name, size, onClick, sx, disabled }: ButtonProps) => {
  return (
    <Button
      id={id}
      name={name}
      color='primary'
      variant='contained'
      disableElevation
      onClick={onClick}
      disabled={disabled}
      sx={
        sx
          ? sx
          : {
              width:
                size === 'lg'
                  ? '300px'
                  : size === 'md'
                  ? '250px'
                  : size === 'sm'
                  ? '150px'
                  : '100%',
            }
      }
    >
      {title}
    </Button>
  );
};

export default DefaultButton;
