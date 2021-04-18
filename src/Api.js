import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const key = "cd745b1c38819d91d823e4d3c6c216e8";

const fetchTrendingMovies = () => {
  return axios.get(`/trending/movie/day?api_key=${key}`).then((data) => {
    // console.log(data);
    return data;
  });
};
const fetchSearchMovie = ({ query, page }) => {
  return axios
    .get(
      `search/movie?api_key=${key}&query=${query}&page=${page}&language=en-US`
    )
    .then(({ data }) => {
      // console.log(data);
      return data;
    });
};
const fetchDetailsMovies = (movie_id) => {
  return axios.get(`/movie/${movie_id}?api_key=${key}`).then((data) => {
    return data;
  });
};

const fetchCastMovies = (movie_id) => {
  return axios.get(`/movie/${movie_id}/credits?api_key=${key}`).then((data) => {
    return data;
  });
};

const fetchReviewsMovies = (movie_id) => {
  return axios.get(`/movie/${movie_id}/reviews?api_key=${key}`).then((data) => {
    return data;
  });
};

// eslint-disable-next-line
export default {
  fetchTrendingMovies,
  fetchSearchMovie,
  fetchDetailsMovies,
  fetchCastMovies,
  fetchReviewsMovies,
};
