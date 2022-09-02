import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import Pagination from './paginationApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchMoviesApi = new getMoviesApi();
const searchPagination = new Pagination();
const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', onSearchFormSubmit);

export function onSearchFormSubmit(evt) {
  evt.preventDefault();

  searchMoviesApi.query = evt.currentTarget.elements.searchQuery.value;
  const query = searchMoviesApi.searchQuery.trim();

  if (query === '') {
    return notifyEmptyQuery(query);
  }

  function search() {
    searchMoviesApi.getSearchMovies().then(data => {
      const movies = data.results;

      appendMoviesMarkup(movies);
    });
  }

  searchMoviesApi.resetPage();
  searchMoviesApi.getSearchMovies().then(data => {
    const movies = data.results;

    if (movies.length === 0) {
      return notifyNoResults(query);
    }

    appendMoviesMarkup(movies);
    searchPagination.clearPagContainer();
    searchPagination.create(data.total_pages, 5, searchMoviesApi, search);

    if (movies.length === 1) {
      notifySuccesOneFilm();
      return;
    }

    notifySuccesFilms(data, query);
  });
}

function notifyEmptyQuery() {
  Notify.failure(
    '😭 Sorry, there are no films matching your search query. Please try again.🙏'
  );
}

function notifyNoResults(query) {
  Notify.failure(
    `🤷‍♀️ Sorry, there are no films with "${query}". Please try again.🙏`
  );
}

function notifySuccesOneFilm() {
  Notify.success('😮 We have found only one film for your request.');
}

function notifySuccesFilms(data, query) {
  Notify.success(
    `🎉 Hooray! We have found "${data.total_results}" films with "${query}".🥳`
  );
}
