import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import { onPageStart } from './startPageGalleryRender';
// import { pagination } from './pagination-mm';

const getMovies = new getMoviesApi();
// взяв посилання на селект
const select = document.getElementById('sort');
const headerClass = document.querySelector('header');
const filmList = document.querySelector('.film_list');

headerClass.setAttribute('id', 'trend');
// pagination(filmList, appendMoviesMarkup);
// додав слухача на зміну
select.addEventListener('change', selectHandler);

let sortby;
function selectHandler(e) {
  // в змінній буде вибір з селекту
  const sortName = e.target.options[e.target.selectedIndex].value;
  // ресет сторінки
  getMovies.resetPage();

  // ренде за умовою якщо довжина sortName не = 0, то вибирає критерій і робить рендер, це треба, бо в option Trending знаходитьсяпорожній рядок
  if (sortName.length !== 0) {
    // передаю змінну з назвою сортування в класс
    getMovies.sortBy = sortName;
    sortby = sortName;

    headerClass.removeAttribute('id');
    headerClass.setAttribute('id', sortby);

    // очищати список фільмів
    filmList.innerHTML = '';
    // робити запит за критерієм з селекту
    getMovies.getMovieByPop().then(data => {
      const movies = data.results;

      appendMoviesMarkup(movies);
    });
  } else {
    filmList.innerHTML = '';

    //якщо вибрано Трендінг, то завантажаться фільми як при першому  завантаженні сайту
    onPageStart();
  }
  // просто ще раз викликаю пагінацію і вона скидаєтьсяна першу сторінку

  // pagination(filmList, appendMoviesMarkup);
}

export { sortby };

let sortgenre;
// function chooseGenre() {
// взяв посилання на селект
const selectgenre = document.getElementById('genre');
// додав слухача на зміну
selectgenre.addEventListener('change', selectGenreHandler);

function selectGenreHandler(e) {
  // в змінній буде вибір з селекту
  const genreName = e.target.options[e.target.selectedIndex].value;
  // ресет сторінки
  getMovies.resetPage();

  // рендер за умовою якщо довжина sortName не = 0, то вибирає критерій і робить рендер, це треба, бо в option Trending знаходитьсяпорожній рядок
  if (genreName.length !== 0) {
    // передаю змінну з назвою сортування в класс
    getMovies.sortGenre = genreName;
    sortgenre = genreName;

    headerClass.removeAttribute('id');
    headerClass.setAttribute('id', sortgenre);

    // очищати список фільмів
    filmList.innerHTML = '';
    // робити запит за критерієм з селекту
    getMovies.getMovieByGenre().then(data => {
      const movies = data.results;

      appendMoviesMarkup(movies);
    });
  } else {
    filmList.innerHTML = '';

    //якщо вибрано Трендінг, то завантажаться фільми як при першому  завантаженні сайту
    onPageStart();
  }
  // просто ще раз викликаю пагінацію і вона скидаєтьсяна першу сторінку
  // pagination(filmList, appendMoviesMarkup);
}
// }
// console.log(sortgenre);
export { sortgenre };
