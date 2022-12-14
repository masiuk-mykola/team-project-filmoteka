import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import Pagination from './paginationApi';

const getMovies = new getMoviesApi();
const startPagination = new Pagination();

function onPageStart() {
  function get() {
    getMovies.getStartMovies().then(movies => {
      appendMoviesMarkup(movies.results);
    });
  }
  getMovies.resetPage();
  getMovies.getStartMovies().then(movies => {
    appendMoviesMarkup(movies.results);

    startPagination.create(movies.total_pages, 5, getMovies, get);
  });
}

export { onPageStart };
