import React from 'react';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ image, onClickImage }) => {
  return (
    <li className={css.galleryItem}>
      <img
        onClick={() => onClickImage(image)}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};
