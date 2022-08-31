import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import { paginationPage } from './pagination';

const getMovies = new getMoviesApi();

export function onPageStart() {
  getMovies.resetPage();

  getMovies.getStartMovies().then(movies => {
     appendMoviesMarkup(movies);
  });
  paginationPage(getMovies);
}


