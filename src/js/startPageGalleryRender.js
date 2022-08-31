import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import { clearGallery } from './moviesMarkup';
import { clearPagContainer } from './pagination';
import { createPagination } from './pagination';

const getMovies = new getMoviesApi();
const pagContainer = document.querySelector('.pag-container');

function onPageStart() {
  getMovies.resetPage();
  getMovies.getStartMovies().then(movies => {
    appendMoviesMarkup(movies.results);
    clearPagContainer();
    createPagination(movies.total_pages, 5);
  });

  pagContainer.addEventListener('click', paginate);

  function paginate(evt) {
    if (parseInt(evt.target.id) === getMovies.page) return;
    if (evt.target.classList.contains('pag-btn')) {
      getMovies.page = parseInt(evt.target.id);
      clearGallery();
      loadFromTop();
      getMovies.getStartMovies().then(movies => {
        appendMoviesMarkup(movies.results);
      });
    }
    if (
      evt.target.classList.contains('move-left') ||
      evt.target.classList.contains('move-right')
    ) {
      getMovies.page = parseInt(evt.target.id);
      clearGallery();
      loadFromTop();
      getMovies.getStartMovies().then(movies => {
        appendMoviesMarkup(movies.results);
      });
    }
    if (evt.target.classList.contains('to-start')) {
      getMovies.page = 1;
      clearGallery();
      loadFromTop();
      getMovies.getStartMovies().then(movies => {
        appendMoviesMarkup(movies.results);
      });
    }
    if (evt.target.classList.contains('to-end')) {
      getMovies.page = parseInt(evt.target.id);
      clearGallery();
      loadFromTop();
      getMovies.getStartMovies().then(movies => {
        appendMoviesMarkup(movies.results);
      });
    }
  }
}

function loadFromTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export { onPageStart, loadFromTop };
