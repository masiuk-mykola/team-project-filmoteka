import './localStorage';

import { appendMoviesMarkup } from './moviesMarkup';

const watchedBtn = document.querySelector('button[data-action="watched"]');
const queueBtn = document.querySelector('button[data-action="queue"]');
const myLibrary = document.querySelector('.library__container');

const queueKey = loadLocalStorage('queueKey');
const watchedKey = loadLocalStorage('watchedKey');

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
  if (nameKey === null || nameKey === undefined) {
    // Тут должна быть заглушка для MyLibrary - картинка или текст, что фильмов в библиотеке нет
    libraryEmptyMarkup();
    console.log('Поставлена инфо что библиотека пустая');
    return;
  }

  const elementUl = '<ul class="library-list"></ul>';
  myLibrary.insertAdjacentHTML('beforeend', elementUl);
  const moviesGallery = document.querySelector('.library-list');
  appendMoviesMarkup(nameKey);
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
