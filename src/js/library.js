import {
  saveLocalStorage,
  loadLocalStorage,
  removeLocalStorage,
} from './localStorage';
import './theme';
import getMoviesApi from './getMoviesApi';
import { appendMoviesMarkup } from './moviesMarkup';
import './footerModal';
import './modalMovieMarkup';
import './getfullMovieInfo';

const KEY_Q = 'queueKey';
const KEY_W = 'watchedKey';

const watchedBtn = document.querySelector('button[data-action="watched"]');
const queueBtn = document.querySelector('button[data-action="queue"]');
const myLibrary = document.querySelector('.library__container');

const queueKey = loadLocalStorage(KEY_Q);
const watchedKey = loadLocalStorage(KEY_W);

// console.log(queueKey);

watchedBtn.addEventListener('click', handleRenderWatchedClick);
queueBtn.addEventListener('click', handleRenderQueueClick);

if (queueBtn.classList.contains('js-current')) {
  libraryMarkup(queueKey);
  return;
}

libraryMarkup(watchedKey);

// ===================================
// FUNCTION

function handleRenderWatchedClick() {
  watchedBtn.classList.add('js-current');
  queueBtn.classList.remove('js-current');
  myLibrary.innerHTML = '';
  libraryMarkup(watchedKey);
}

function handleRenderQueueClick() {
  watchedBtn.classList.remove('js-current');
  queueBtn.classList.add('js-current');
  myLibrary.innerHTML = '';
  libraryMarkup(queueKey);
}

function libraryMarkup(nameKey) {
  if (nameKey === null || nameKey === undefined || nameKey === []) {
    // Тут должна быть заглушка для MyLibrary - картинка или текст, что фильмов в библиотеке нет
    libraryEmptyMarkup();
    console.log('Поставлена инфо что библиотека пустая');
    return;
  }

  // const elementUl = '';
  // myLibrary.insertAdjacentHTML('beforeend', elementUl);
  const labraryList = document.querySelector('.film_list');
  const markupLibraryMovies = nameKey.map(movie => {
    const movieTitle = movie.title;
    const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const movieReleaseDate = movie.release_date.split('').slice(0, 4).join('');
    const movieGenres = getGenres(movie.genres);
    const movieId = movie.id;
    const voteAverage = movie.vote_average;
    
    const movieMarkup = `<li id="${movieId}" class="film-list__item"><img src="${moviePoster}" alt="${movieTitle}" class="film-list__item-poster" loading="lazy">
     <h3 class="film-list__item-title">${movieTitle}</h3>
     <div class="film-list__item-details"><span class="film-list__item-genres">${movieGenres}</span>|<span class="film-list__item-year">${movieReleaseDate}</span><span class="film-list__item-vote">${voteAverage.toFixed(
                  1
                )}</span></div>
   </li>`;
    
    return movieMarkup;
  }).join('');

  // console.log(markupLibraryMovies);

  labraryList.insertAdjacentHTML('beforeend', markupLibraryMovies);

}

function libraryEmptyMarkup() {
  const markup = `<h2 class="library-empty__title">
          Your movie library to watch is empty
        </h2>
        <div class="library-empty__tumb">
          <a href="./index.html" class="library-empty__btn">CHOOSE MOVIE</a>
        </div>`;
  myLibrary.insertAdjacentHTML('beforeend', markup);
}

function getGenres(ids) {
  const genres = ids.map(id => {
    const genre = id.name;
    return genre;
  });
  if (genres.length === 0) {
    return ['Unknown'];
  }
  if (genres.length >= 4) {
    genres.splice(2, 10, 'Other');
  }
  return genres.join(', ');
}
