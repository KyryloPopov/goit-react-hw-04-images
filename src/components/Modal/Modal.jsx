import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ modalData, handleCloseModal }) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.code === 'Escape') {
        handleCloseModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleCloseModal]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={modalData.largeImageURL} alt={modalData.tags} width="1000" />
      </div>
    </div>
  );
};
