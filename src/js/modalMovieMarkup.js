const modalWindowEl = document.querySelector('.backdrop');
const btnMovieClose = document.querySelector('.btn-close_modal');
const bodyEl = document.querySelector('body');

export default class modalMarkupApi {
  constructor() {
    this.filmInfo = {};
  }

  makeFilmModalMarkup({
    poster_path,
    original_title,
    title,
    name,
    vote_average,
    vote_count,
    genres,
    overview,
    popularity,
    id,
  }) {
    const filmGenres = genres.map(({ name }) => name).join(', ');
    const modalWindow = `<div class="modal-window">

        <div class="modal-film_img">
         <button type="button" class="btn-close_modal" id="modal-close" >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="bi bi-x-lg"
        id="close-icon"
        viewBox="0 0 16 16"
      >
        <path 
           id = "close-svg" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
        </button>

            <img class="modal-img" id=${id} src='${
      poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : `https://qqcinema.com/wp-content/uploads/no-poster.png`
    }' alt=${title || original_title || name} width="370" height="470">

        </div>
        <div class="film-info">
       
            <h2 class="film-name">${title || original_title || name}</h2>
            <div class="film-info">
            <ul class="film-info__list">
                <li class="film-info__item">Vote / Votes</li>
                <li class="film-info__item"><span class="span-info__current-item">${vote_average.toFixed(
                  1
                )}</span> <span>/</span> <span class="span-info__item">${vote_count}</span></li>
                <li class="film-info__item">Popularity</li>
                 <li class="film-info__params">${popularity}</li>
                <li class="film-info__item">Original Title</li>
                 <li class="film-info__params">${
                   title || original_title || name
                 }</li>
                <li class="film-info__item">Genre</li>
            <li class="film-info__params">${filmGenres}</li>   
            </ul>
            </div>
            <h3 class="film-about_title">About</h3>
            <p class="film-description">${overview}</p>
            <div class="modal-btn-wrap">
                <button type="button" id='${id}' class="modal__add-watched modal-btn--active ls-watched">ADD TO WATCHED</button>
                <button type="button" id='${id}' class="modal__add-queue modal-btn--active ls-queue">ADD TO QUEUE</button>
            </div>
        </div>
    </div>`;

    modalWindowEl.insertAdjacentHTML('beforeend', modalWindow);
  }
}

//

// ?????????????????? ??-??????

export function isOpenModal() {
  modalWindowEl.classList.add('modal-open');
  document.getElementById('backToTop').style.display = 'none';
  document.body.style.overflow = 'hidden';
}

export function clearModal() {
  modalWindowEl.innerHTML = '';
  modalWindowEl.classList.remove('modal-open');
}

// ??-?????? ???????????????? ??????????????

export function onEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

export function onClickClose(event) {
  if (
    event.target === modalWindowEl ||
    event.target.id === 'modal-close' ||
    event.target.id === 'close-icon' ||
    event.target.id === 'close-svg'
  ) {
    closeModal();
  }
}

function closeModal() {
  modalWindowEl.classList.remove('modal-open');
  document.removeEventListener('click', onClickClose);
  document.removeEventListener('keydown', onEscClose);
  document.body.style.overflow = '';
}
