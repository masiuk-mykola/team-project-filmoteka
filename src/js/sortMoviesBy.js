import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import { clearGallery } from './moviesMarkup';
import { loadFromTop } from './startPageGalleryRender';
import { onPageStart } from './startPageGalleryRender';
import { clearPagContainer, createPagination } from './pagination';

const pagContainer = document.querySelector('.pag-container');

const getMovies = new getMoviesApi();

const select = document.getElementById('sort');
const headerClass = document.querySelector('header');
const filmList = document.querySelector('.film_list');

headerClass.setAttribute('id', 'trend');

select.addEventListener('change', selectHandler);

let sortby;
function selectHandler(e) {
  const sortName = e.target.options[e.target.selectedIndex].value;
  getMovies.resetPage();

  if (sortName.length !== 0) {
    getMovies.sortBy = sortName;
    sortby = sortName;

    headerClass.removeAttribute('id');
    headerClass.setAttribute('id', sortby);

    filmList.innerHTML = '';
    getMovies.getMovieByPop().then(data => {
      const movies = data.results;

      appendMoviesMarkup(movies);
      clearPagContainer();

      createPagination(data.total_pages, 5);
    });
  } else {
    filmList.innerHTML = '';

    onPageStart();
  }
}

pagContainer.addEventListener('click', paginate);

function paginate(evt) {
  if (parseInt(evt.target.id) === getMovies.page) return;
  if (evt.target.classList.contains('pag-btn')) {
    getMovies.page = parseInt(evt.target.id);
    clearGallery();
    loadFromTop();
    getMovies.getMovieByPop().then(movies => {
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
    getMovies.getMovieByPop().then(movies => {
      appendMoviesMarkup(movies.results);
    });
  }
  if (evt.target.classList.contains('to-start')) {
    getMovies.page = 1;
    clearGallery();
    loadFromTop();
    getMovies.getMovieByPop().then(movies => {
      appendMoviesMarkup(movies.results);
    });
  }
  if (evt.target.classList.contains('to-end')) {
    getMovies.page = parseInt(evt.target.id);
    clearGallery();
    loadFromTop();
    getMovies.getMovieByPop().then(movies => {
      appendMoviesMarkup(movies.results);
    });
  }
}

export { sortby };

let sortgenre;

const selectgenre = document.getElementById('genre');
selectgenre.addEventListener('change', selectGenreHandler);

function selectGenreHandler(e) {
  const genreName = e.target.options[e.target.selectedIndex].value;
  getMovies.resetPage();

  if (genreName.length !== 0) {
    getMovies.sortGenre = genreName;
    sortgenre = genreName;

    headerClass.removeAttribute('id');
    headerClass.setAttribute('id', sortgenre);

    filmList.innerHTML = '';
    getMovies.getMovieByGenre().then(data => {
      const movies = data.results;

      appendMoviesMarkup(movies);
      clearPagContainer();

      createPagination(data.total_pages, 5);
    });
  } else {
    filmList.innerHTML = '';

    onPageStart();
  }
}
export { sortgenre };
