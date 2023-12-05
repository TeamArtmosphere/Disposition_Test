import React from 'react';
import { Button, useTheme } from '@mui/material';

type ButtonProps = {
  id?: string;
  title: string;
  name?: string;
  size?: string;
  onClick?: (e?: any) => void;
  ref?: any;
  className?: string;
  sx?: any;
  disabled?: boolean;
};

const SelectionButton = ({
  id,
  title,
  name,
  size,
  onClick,
  ref,
  className,
  sx,
  disabled,
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      className={className}
      id={id}
      ref={ref}
      name={name}
      color='primary'
      variant='outlined'
      disableElevation // theme에서 shadow 삭제
      disableRipple
      disableTouchRipple
      disableFocusRipple
      onClick={onClick}
      disabled={disabled}
      sx={
        // sx
        //   ? sx
        //   : {
        //       width:
        //         size === 'lg'
        //           ? '582px'
        //           : size === 'md'
        //           ? '280px'
        //           : size === 'sm'
        //           ? '175px'
        //           : size === 'xs'
        //           ? '83px'
        //           : '100%',
        //       height:
        //         size === 'lg'
        //           ? '136px'
        //           : size === 'md'
        //           ? '56px'
        //           : size === 'sm'
        //           ? '95px'
        //           : size === 'xs'
        //           ? '45px'
        //           : '100%',
        //       fontSize:
        //         size === 'lg'
        //           ? '36px'
        //           : size === 'md'
        //           ? '16px'
        //           : size === 'sm'
        //           ? '16px'
        //           : size === 'xs'
        //           ? '16px'
        //           : '16px',
        //       borderRadius: '8px',
        //       p: 1,
        //     }
        theme => ({
          borderRadius: '8px',
          '&:hover': {
            border: '2px solid #e1e1e1',
            bgcolor: 'white',
          },
          '&:active': {
            border: '2px solid',
            bgcolor: theme.palette.secondary.main,
            borderColor: theme.palette.primary.main,
          },
          '&:disabled': {
            bgcolor: 'black',
          },
          [theme.breakpoints.up('mobile')]: { width: '100%', height: '56px', fontSize: '16px' },
          [theme.breakpoints.up('tablet')]: { width: '100%', height: '56px', fontSize: '16px' },
          [theme.breakpoints.up('laptop')]: {
            width: '100%',
            height: '88px',
            fontSize: '24px',
            textAlign: 'left',
          },
          [theme.breakpoints.up('desktop')]: {
            width: '100%',
            height: '88px',
            fontSize: '24px',
            textAlign: 'left',
          },
        })
      }
    >
      {title}
    </Button>
  );
};

export default SelectionButton;
