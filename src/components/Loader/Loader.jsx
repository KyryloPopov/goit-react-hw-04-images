import React from 'react';
import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Audio
      height="200"
      width="200"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  );
};
