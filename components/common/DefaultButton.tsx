import React from 'react';
import { Button, useTheme } from '@mui/material';

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
  const theme = useTheme();

  return (
    <Button
      id={id}
      name={name}
      color='primary'
      variant='contained'
      disableElevation
      onClick={onClick}
      disabled={disabled}
      disableRipple
      disableTouchRipple
      sx={
        sx
          ? sx
          : {
              width:
                size === 'lg'
                  ? '582px'
                  : size === 'md'
                  ? '250px'
                  : size === 'sm'
                  ? '206px'
                  : '100%',
              height:
                size === 'lg' ? '136px' : size === 'md' ? '80px' : size === 'sm' ? '56px' : '100%',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: theme.palette.grey[50],
              },
              '&:active': {
                bgcolor: theme.palette.primary.main,
              },
            }
      }
    >
      {title}
    </Button>
  );
};

export default DefaultButton;
