import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import { clearGallery } from './moviesMarkup';
import { clearPagContainer } from './pagination';
import { createPagination } from './pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { loadFromTop } from './startPageGalleryRender';

const searchMoviesApi = new getMoviesApi();
const searchForm = document.querySelector('#search-form');
const pagContainer = document.querySelector('.pag-container');

searchForm.addEventListener('submit', onSearchFormSubmit);

export function onSearchFormSubmit(evt) {
  evt.preventDefault();

  searchMoviesApi.query = evt.currentTarget.elements.searchQuery.value;
  const query = searchMoviesApi.searchQuery.trim();

  if (query === '') {
    return Notify.failure(
      '😭 Sorry, there are no films matching your search query. Please try again.🙏'
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
    clearPagContainer();
    createPagination(data.total_pages, 5);
    if (movies.length === 1) {
      return Notify.success('😮 We have found only one film for your request.');
    }

    Notify.success(
      `🎉 Hooray! We have found "${data.total_results}" films with "${query}".🥳`
    );
  });

  // pagContainer.addEventListener('click', paginate);

  // function paginate(evt) {
  //   if (parseInt(evt.target.id) === searchMoviesApi.page) return;
  //   if (evt.target.classList.contains('pag-btn')) {
  //     searchMoviesApi.page = parseInt(evt.target.id);
  //     clearGallery();
  //     loadFromTop();
  //     searchMoviesApi.getSearchMovies().then(movies => {
  //       appendMoviesMarkup(movies.results);
  //     });
  //   }
  //   if (
  //     evt.target.classList.contains('move-left') ||
  //     evt.target.classList.contains('move-right')
  //   ) {
  //     searchMoviesApi.page = parseInt(evt.target.id);
  //     clearGallery();
  //     loadFromTop();
  //     searchMoviesApi.getSearchMovies().then(movies => {
  //       appendMoviesMarkup(movies.results);
  //     });
  //   }
  //   if (evt.target.classList.contains('to-start')) {
  //     searchMoviesApi.page = 1;
  //     clearGallery();
  //     loadFromTop();
  //     searchMoviesApi.getSearchMovies().then(movies => {
  //       appendMoviesMarkup(movies.results);
  //     });
  //   }
  //   if (evt.target.classList.contains('to-end')) {
  //     searchMoviesApi.page = parseInt(evt.target.id);
  //     clearGallery();
  //     loadFromTop();
  //     searchMoviesApi.getSearchMovies().then(movies => {
  //       appendMoviesMarkup(movies.results);
  //     });
  //   }
  // }
}
