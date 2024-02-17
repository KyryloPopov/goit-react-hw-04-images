import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClickImage }) => {
  return (
    <ul className={css.gallery}>
      {Array.isArray(images) &&
        images.map((image, key) => {
          return (
            <ImageGalleryItem
              onClickImage={onClickImage}
              key={key}
              image={image}
            />
          );
        })}
    </ul>
  );
};
