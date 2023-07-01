import axios from "axios";

const API_URL = "https://pixabay.com/api/";
const KEY = "36364572-be11ddf9e4d275e46894a73aa";

export const fetchPictures = async (searchValue, page) => {
  const response = await axios.get(API_URL, {
    params: {
      key: KEY,
      q: searchValue,
      page: page,
      per_page: 12,
    },
  });

  return response.data.hits;
};
