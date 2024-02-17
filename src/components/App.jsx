import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { requestImages } from 'services/api';
import { STATUSES } from 'utils/constants';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { Button } from './Button/Button';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    status: STATUSES.idle,
    query: null,
    error: null,
    page: 1,
    modalData: null,
    isOpenModal: false,
    loadMore: false,
  };

  fetchImages = async (query, page) => {
    try {
      this.setState({ status: STATUSES.pending });
      const { hits, totalHits } = await requestImages(query, page);
      if (totalHits === 0) {
        Notiflix.Notify.failure(`Couln't find any images`);
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: STATUSES.success,
        loadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ status: STATUSES.error, error: error });
      Notiflix.Notify.failure(`Failed to load images: ${error}`);
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages(this.state.query, this.state.page);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const query = event.currentTarget.elements.searchInput.value;
    if (!query.trim()) {
      event.currentTarget.reset();
      return;
    }
    this.setState({ query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = image => {
    this.setState({ isOpenModal: true, modalData: image });
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.status === STATUSES.pending && <Loader />}
        <ImageGallery
          images={this.state.images}
          onClickImage={this.handleOpenModal}
        />
        {this.state.loadMore && <Button handleLoadMore={this.handleLoadMore} />}
        {this.state.isOpenModal && (
          <Modal
            modalData={this.state.modalData}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
