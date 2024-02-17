import axios from 'axios';

const apiKey = '42396152-96b1a8ed9022137965126359d';
const imagesPerPage = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const requestImages = async (query, page) => {
  const { data } = await axios({
    params: {
      key: apiKey,
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: imagesPerPage,
    },
  });
  return data;
};
