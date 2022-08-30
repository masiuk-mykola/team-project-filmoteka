import getMoviesApi from './getMoviesApi';
import modalMarkupApi from './modalMovieMarkup';
import * as local from './localStorage';
import { moviesGallery } from './moviesMarkup';
import {
  isOpenModal,
  clearModal,
  onEscClose,
  onClickClose,
  makeFilmModalMarkup,
} from './modalMovieMarkup';

moviesGallery.addEventListener('click', onMovieCardClick);
const header = document.querySelector('header');
const getFullInfo = new getMoviesApi();
const modalMarkup = new modalMarkupApi();

function onMovieCardClick(evt) {
  evt.preventDefault();
  clearModal();
  isOpenModal();
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscClose);
  document.addEventListener('click', onClickClose);

  if (!evt.target.closest('li')) {
    return;
  }
  getFullInfo.getFullMovieInfo(evt.target.closest('li').id).then(films => {
    modalMarkup.makeFilmModalMarkup(films);

    modalMarkup.filmInfo = {
      title: films.title,
      poster_path: films.poster_path,
      genres: films.genres,
      release_date: films.release_date,
      vote_average: films.vote_average,
      id: films.id,
    };

    const watchedBtn = document.querySelector('.ls-watched');
    const queueBtn = document.querySelector('.ls-queue');

    if (header.classList.contains('header-library')) {
      queueBtn.textContent = 'Remove from queue';
      watchedBtn.textContent = 'Remove from watched';
    }
    if (watchedIdList.length === -1) {
      return;
    } else {
      watchedIdList.forEach(element => {
        if (element.id === modalMarkup.filmInfo.id) {
          watchedBtn.textContent = 'Remove from watched';
        }
      });
    }

    watchedBtn.addEventListener('click', addWatchedBtn);

    if (queueIdList.length === -1) {
      return;
    } else {
      queueIdList.forEach(element => {
        if (element.id === modalMarkup.filmInfo.id) {
          queueBtn.textContent = 'Remove from queue';
        }
      });
    }
    queueBtn.addEventListener('click', addQueueBtn);
  });
}

//Добавлення в список переглянутих фільмів
let queueIdList = [];
let watchedIdList = [];

const keyW = 'watchedKey';
const keyQ = 'queueKey';

function addWatchedBtn(event) {
  const watchedBtn = event.target;
  const watchedMovie = modalMarkup.filmInfo;

  if (localStorage.getItem(keyW) !== null) {
    watchedIdList = local.loadLocalStorage(keyW);
  }

  if (watchedIdList.find(film => film.id === watchedMovie.id)) {
    watchedIdList = watchedIdList.filter(film => film.id !== watchedMovie.id);
    local.saveLocalStorage(keyW, watchedIdList);
    watchedBtn.textContent = 'Add to watched';
  } else {
    watchedIdList.push(watchedMovie);
    local.saveLocalStorage(keyW, watchedIdList);
    watchedBtn.textContent = 'Remove from watched';
  }
  clearModal();
  document.body.style.overflow = '';
}

//Добавлення в список для перегляду фільмів
function addQueueBtn(event) {
  const queueBtn = event.target;
  const queueMovie = modalMarkup.filmInfo;

  if (localStorage.getItem(keyQ) !== null) {
    queueIdList = local.loadLocalStorage(keyQ);
  }

  if (queueIdList.find(film => film.id === queueMovie.id)) {
    queueIdList = queueIdList.filter(film => film.id !== queueMovie.id);
    local.saveLocalStorage(keyQ, queueIdList);
    queueBtn.textContent = 'Add to Queue';
  } else {
    queueIdList.push(queueMovie);
    local.saveLocalStorage(keyQ, queueIdList);
    queueBtn.textContent = 'Remove from queue';
  }
  clearModal();
  document.body.style.overflow = '';
}

export { addWatchedBtn, addQueueBtn };
