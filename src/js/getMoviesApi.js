const axios = require('axios').default;

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
  }

  async getStartMovies() {
    const url = `${this.base_url}${this.moviesStartPath}${this.key}&page=${this.page}`;

    try {
      const movies = await axios.get(url);

      this.nextPage();
      return movies.data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async getSearchMovies() {
    const url = `${this.base_url}${this.moviesSearchPath}${this.key}&query="${this.searchQuery}"&page=${this.page}`;

    try {
      const searchedMovies = await axios.get(url);

      this.nextPage();
      return searchedMovies.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getFullMovieInfo(id) {
    const url = `${this.base_url}${this.fullInfoPath}${id}${this.key}`;

    try {
      const fullMovieInfo = await axios.get(url);

      return fullMovieInfo.data;
    } catch (error) {
      console.log(error);
    }
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
