const axios = require('axios').default;
import {addLoader, removeLoader} from './loader';

export default class getMoviesApi {
  constructor() {
    this.key = '?api_key=b580e55a4551b421271bf131dd03ab39';
    this.searchQuery = '';
    this.page = 1;
    this.base_url = 'https://api.themoviedb.org/3';
    this.moviesStartPath = `/trending/movie/day`;
    this.genresPath = `/genre/movie/list`;
    this.fullInfoPath = `/movie/`;
    this.moviesSearchPath = `/search/movie`;

    this.discover = '/discover/movie';
    this.sortBy = '';
    this.sortGenre = '';
  }

  async getStartMovies() {
    const url = `${this.base_url}${this.moviesStartPath}${this.key}&page=${this.page}`;

    try {
      addLoader();
      const movies = await axios.get(url);
      removeLoader();
      return movies.data;
    } catch (error) {
      addLoader();
      console.log(error);
      removeLoader();
    }
  }

  async getSearchMovies() {
    const url = `${this.base_url}${this.moviesSearchPath}${this.key}&query="${this.searchQuery}"&page=${this.page}`;

    try {
      addLoader();
      const searchedMovies = await axios.get(url);
      removeLoader();

      return searchedMovies.data;
    } catch (error) {
      addLoader();
      console.log(error);
      removeLoader();
    }
  }

  async getFullMovieInfo(id) {
    const url = `${this.base_url}${this.fullInfoPath}${id}${this.key}`;

    try {
      addLoader();
      const fullMovieInfo = await axios.get(url);
      removeLoader();

      return fullMovieInfo.data;
    } catch (error) {
      addLoader();
      console.log(error);
      removeLoader();
    }
  }

  async getMovieByPop() {
    const url = `${this.base_url}${this.discover}${this.key}&sort_by=${this.sortBy}&page=${this.page}`;

    try {
      addLoader();
      const movieByPop = await axios.get(url);
      removeLoader();
      return movieByPop.data;
    } catch (error) {
      addLoader();
      console.log(error);
      removeLoader();
    }
  }

  async getMovieByGenre() {
    const url = `${this.base_url}${this.discover}${this.key}&with_genres=${this.sortGenre}&page=${this.page}`;

    try {
      addLoader();
      const movieByGenre = await axios.get(url);
      removeLoader();

      return movieByGenre.data;
    } catch (error) {
      addLoader();
      console.log(error);
      removeLoader();
    }
  }

  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
