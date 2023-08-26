import { NavigateNext } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

type NextButtonProps = {
  onClick: () => void;
};

const NextButton = ({ onClick }: NextButtonProps) => {
  return (
    <IconButton color='primary' onClick={onClick}>
      <NavigateNext />
    </IconButton>
  );
};

export default NextButton;
