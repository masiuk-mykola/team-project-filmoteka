import { getMoviesApi, clearGallery } from './getMoviesApi';
import { getMovies, getStartMovies } from "./startPageGalleryRender";
import { onPageStart } from './startPageGalleryRender';
import { onSearchFormSubmit } from './search';
import { appendMoviesMarkup, moviesGallery, clearGallery } from './moviesMarkup';
import { genresArray } from './moviesGenres';
import { saveLocalStorage, loadLocalStorage, removeLocalStorage } from './localStorage';
import { addLoader, removeLoader } from './loader';
import { insertMovies } from './insertMovies';

const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const beforeDots = document.querySelector('.before-dots');
const afterDots = document.querySelector('.after-dots');
const listPagination = document.querySelector('.pagination-list');
const pageFirst = document.querySelector('.first-button');
const pageLast = document.querySelector('.last-button');
const pagination = document.querySelector('.pagination');

let searchQuery = ''; 
let activePage = 50;
let totalPages = 50;
let totalBtn = 20;

export function paginationPage(data) {
    searchQuery = data.query;
    activePage = data.page;
    setLastPageNumber(data.total_data);
    renderPagesList(data.total_pages);
    checkBtnOpacity();  
}

function clearPage() {
  moviesGallery.innerHTML = '';
}

function onBtnsClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  } else if (evt.target.classList.contains('arrow-left')) {
    activePage -= 1;
  } else if (evt.target.classList.contains('arrow-right')) {
    activePage += 1;
  } else if (evt.target.classList.contains('pagination-button')) {
    activePage = Number(evt.target.textContent);
    }
    clearPage();
  insertMovies(searchQuery, activePage);
}

function checkBtnOpacity() {
  localStorage.setItem('current-pagination', activePage)
  
  activePage === 1
    ? leftArrow.classList.add('visually-hidden')
        : leftArrow.classList.remove('visually-hidden');
    
  activePage === Number(pageLast.textContent)
    ? rightArrow.classList.add('visually-hidden')
        : rightArrow.classList.remove('visually-hidden');
    
  if (document.body.clientWidth <= 320) {
    beforeDots.classList.add('visually-hidden');
      afterDots.classList.add('visually-hidden');
      
    activePage > 3
      ? pageFirst.classList.add('visually-hidden')
          : pageFirst.classList.remove('visually-hidden');
      
    activePage < Number(pageLast.textContent) - 2
      ? pageLast.classList.add('visually-hidden')
          : pageLast.classList.remove('visually-hidden');
      
  } else {
    activePage > Number(pageLast.textContent) - 4
      ? afterDots.classList.add('visually-hidden')
          : afterDots.classList.remove('visually-hidden');
      
      activePage > Number(pageLast.textContent) - 3
      ? pageLast.classList.add('visually-hidden')
      : pageLast.classList.remove('visually-hidden');
  }
}

export function renderButtons(activePage, pagesCount, query) {
  setLastPageNumber(pagesCount);
  searchQuery = query;
  return renderPagesList(activePage, pagesCount);
}

function setLastPageNumber(totalPages) {
    pageLast.textContent = totalPages;
}

function renderPagesList(activePage, totalPages) {
    listPagination.innerHTML = '';
    
  const start = activePage < 4 ? 1 : activePage - totalBtn;
  let end = activePage === totalPages ? totalPages : activePage + totalBtn;
  end = end > totalPages ? totalPages : end;
    if (activePage >= 4) {
    listPagination.insertAdjacentHTML(
      'beforeend',
      `<button class="pagination-button first-button">1</button>`,
    );
    }
    
    if (activePage > 4) {
    listPagination.insertAdjacentHTML(
      'beforeend',
      `<span class="pagination-dots after-dots">...</span>`,
    );
    }
    
  for (let i = start; i <= end; i += 1) {
      let classes = 'pagination-button';
      if (activePage === i) {
        classes += ' current-pagination'
      }

      listPagination.insertAdjacentHTML(
        'beforeend',
        `<li class=""><button class="${classes}">${i}</button></li>`,
      );
    }
    
  checkBtnOpacity();
}

pagination.addEventListener('click', onBtnsClick);





