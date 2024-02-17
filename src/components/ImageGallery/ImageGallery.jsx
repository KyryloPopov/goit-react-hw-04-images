import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.gallery}>
        {Array.isArray(this.props.images) &&
          this.props.images.map(image => {
            return (
              <ImageGalleryItem
                onClickImage={this.props.onClickImage}
                key={image.id}
                image={image}
              />
            );
          })}
      </ul>
    );
  }
}
