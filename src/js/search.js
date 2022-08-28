import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import { clearGallery } from './moviesMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchMoviesApi = new getMoviesApi();
const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', onSearchFormSubmit);

export function onSearchFormSubmit(evt) {
  evt.preventDefault();

  searchMoviesApi.query = evt.currentTarget.elements.searchQuery.value;
  const query = searchMoviesApi.query.trim();

  if (query === '') {
    return Notify.failure(
      '😭 Sorry, there are no films matching your search query. Please try again.🙏'
    );
  } else if (query.length <= 2) {
    return Notify.failure(
      '🙅‍♂️ Sorry, there are too many films for your request, please enter more than 2 letters.🙏'
    );
  }

  searchMoviesApi.resetPage();
  searchMoviesApi.getSearchMovies().then(data => {
    const movies = data.results;
    clearGallery();

    if (movies.length === 0) {
      return Notify.failure(
        `🤷‍♀️ Sorry, there are no films with "${query}". Please try again.🙏`
      );
    }

    appendMoviesMarkup(movies);
    if (movies.length === 1) {
      return Notify.success('😮 We have found only one film for your request.');
    }

    Notify.success(
      `🎉 Hooray! We have found "${data.total_results}" films with "${query}".🥳`
    );
  });
}
