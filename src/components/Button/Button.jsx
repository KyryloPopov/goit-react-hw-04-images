import React from 'react';
import css from './Button.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button className={css.button} type="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};
