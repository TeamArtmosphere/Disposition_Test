import { NavigateBefore } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

type PrevButtonProps = {
  onClick: () => void;
};

const PrevButton = ({ onClick }: PrevButtonProps) => {
  return (
    <IconButton onClick={onClick}>
      <NavigateBefore />
    </IconButton>
  );
};

export default PrevButton;
