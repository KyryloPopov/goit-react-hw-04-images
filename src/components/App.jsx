import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { requestImages } from 'services/api';
import { STATUSES } from 'utils/constants';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { Button } from './Button/Button';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUSES.idle);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const fetchImages = async (query, page) => {
    try {
      setStatus(STATUSES.pending);
      const { hits, totalHits } = await requestImages(query, page);
      if (totalHits === 0) {
        Notiflix.Notify.failure(`Couln't find any images`);
      }
      setImages(prevState => [...prevState, ...hits]);
      setStatus(STATUSES.success);
      setLoadMore(page < Math.ceil(totalHits / 12));
    } catch (error) {
      Notiflix.Notify.failure(`Failed to load images: ${error}`);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchImages(query, page);
  }, [query, page]);

  const handleSubmit = event => {
    event.preventDefault();
    const formedQuery = event.currentTarget.elements.searchInput.value;
    if (!formedQuery.trim()) {
      event.currentTarget.reset();
      return;
    }
    setQuery(formedQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpenModal = image => {
    setIsOpenModal(true);
    setModalData(image);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {status === STATUSES.pending && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onClickImage={handleOpenModal} />
      )}
      {loadMore && <Button handleLoadMore={handleLoadMore} />}
      {isOpenModal && (
        <Modal modalData={modalData} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
