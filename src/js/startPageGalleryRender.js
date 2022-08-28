import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';

const getMovies = new getMoviesApi();

function onPageStart() {
  getMovies.resetPage();
  getMovies.getStartMovies().then(movies => {
    appendMoviesMarkup(movies);
  });
}

export { onPageStart };
