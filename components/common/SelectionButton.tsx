import React from 'react';
import { Button } from '@mui/material';

type ButtonProps = {
  id?: string;
  title: string;
  name?: string;
  size?: string;
  onClick?: (e?: any) => void;
  ref?: any;
  className?: string;
};

const SelectionButton = ({ id, title, name, size, onClick, ref, className }: ButtonProps) => {
  return (
    <Button
      className={className}
      id={id}
      ref={ref}
      name={name}
      color='secondary'
      variant='contained'
      disableElevation
      onClick={onClick}
      sx={{
        width:
          size === 'lg'
            ? '582px'
            : size === 'md'
            ? '206px'
            : size === 'sm'
            ? '175px'
            : size === 'xs'
            ? '75px'
            : '100%',
        height:
          size === 'lg'
            ? '136px'
            : size === 'md'
            ? '56px'
            : size === 'sm'
            ? '95px'
            : size === 'xs'
            ? '37px'
            : '100%',
        fontSize: '36px',
        border: '1px solid #CFE6F2',
        // '& .MuiButton-root:hover': {
        //   bgcolor: '#000',
        // },
      }}
    >
      {title}
    </Button>
  );
};

export default SelectionButton;
