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

    modalMarkup.title = films.title;
    modalMarkup.poster_path = films.poster_path;
    modalMarkup.genres = films.genres;
    modalMarkup.release_date = films.release_date;
    modalMarkup.vote_average = films.vote_average;
    modalMarkup.id = films.id;

    const watchedBtn = document.querySelector('.ls-watched');

    if (watchedIdList.length === -1) {
      return;
    } else {
      watchedIdList.forEach(element => {
        if (element.id === modalMarkup.id) {
          watchedBtn.textContent = 'Remove from watched';
        }
      });
    }

    watchedBtn.addEventListener('click', addWatchedBtn);

    const queueBtn = document.querySelector('.ls-queue');

    if (queueIdList.length === -1) {
      return;
    } else {
      queueIdList.forEach(element => {
        if (element.id === modalMarkup.id) {
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
  const watchedMovie = {
    title: modalMarkup.title,
    poster_path: modalMarkup.poster_path,
    genres: modalMarkup.genres,
    release_date: modalMarkup.release_date,
    vote_average: modalMarkup.vote_average,
    id: modalMarkup.id,
  };
  const watchedId = watchedMovie;

  if (watchedIdList.find(film => film.id === watchedId.id)) {
    watchedIdList = watchedIdList.filter(film => film.id !== watchedId.id);
    local.saveLocalStorage(keyW, watchedIdList);
    watchedBtn.textContent = 'Add to watched';
    return;
  } else {
    watchedIdList.push(watchedId);
    local.saveLocalStorage(keyW, watchedIdList);
    watchedBtn.textContent = 'Remove from watched';
  }
}

//Добавлення в список для перегляду фільмів
function addQueueBtn(event) {
  const queueBtn = event.target;

  const watchedMovie = {
    title: modalMarkup.title,
    poster_path: modalMarkup.poster_path,
    genres: modalMarkup.genres,
    release_date: modalMarkup.release_date,
    vote_average: modalMarkup.vote_average,
    id: modalMarkup.id,
  };
  const queueId = watchedMovie;

  if (queueIdList.find(film => film.id === queueId.id)) {
    queueIdList = queueIdList.filter(film => film.id !== queueId.id);
    local.saveLocalStorage(keyQ, queueIdList);
    queueBtn.textContent = 'Add to Queue';
  } else {
    queueIdList.push(queueId);
    local.saveLocalStorage(keyQ, queueIdList);
    queueBtn.textContent = 'Remove from queue';
  }
}

export { addWatchedBtn, addQueueBtn };
