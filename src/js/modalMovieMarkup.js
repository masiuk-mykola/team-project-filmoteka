const modalWindowEl = document.querySelector('.backdrop');
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
         <button type="button" class="btn-close_modal">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
        </button>

            <img class="modal-img" id=${id} src="https://image.tmdb.org/t/p/w500${poster_path}" alt=${
      title || original_title || name
    } width="370" height="470">

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

// допоміжні ф-ції

export function isOpenModal() {
  modalWindowEl.classList.add('modal-open');
  document.getElementById('backToTop').style.display = 'none';
}

export function clearModal() {
  modalWindowEl.innerHTML = '';
}

// ф-ція закриття модалки

export function setCloseOptionModal() {
  modalWindowEl.addEventListener('click', e => {
    if (e.target.nodeName == 'BUTTON') {
      return;
    }
    modalWindowEl.classList.remove('modal-open');
    document.body.style.overflow = '';
  });
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modalWindowEl.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
});
