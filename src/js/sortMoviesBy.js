import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import { onPageStart } from './startPageGalleryRender';
import Pagination from './paginationApi';

const getMovies = new getMoviesApi();
const sortPagination = new Pagination();

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

      // Допоміжна функція для передачі у пагінацію
      function sortPop() {
        getMovies.getMovieByPop().then(data => {
          const movies = data.results;

          appendMoviesMarkup(movies);
        });
      }
      //

      sortPagination.clearPagContainer();
      sortPagination.create(data.total_pages, 5, getMovies, sortPop);
    });
  } else {
    filmList.innerHTML = '';

    onPageStart();
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

      // Допоміжна функція для передачі у пагінацію
      function sortGenre() {
        getMovies.getMovieByGenre().then(data => {
          const movies = data.results;

          appendMoviesMarkup(movies);
        });
      }
      //

      sortPagination.clearPagContainer();
      sortPagination.create(data.total_pages, 5, getMovies, sortGenre);
    });
  } else {
    filmList.innerHTML = '';

    onPageStart();
  }
}
export { sortgenre };
