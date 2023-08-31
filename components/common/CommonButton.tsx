import React from 'react';
import { Button } from '@mui/material';

type ButtonProps = {
  name: string;
};

const CommonButton = ({ name }: ButtonProps) => {
  return <Button color='primary'>{name}</Button>;
};

export default CommonButton;
