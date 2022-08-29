import * as api from '../js/getMoviesApi';
import { onPageStart } from '../js/startPageGalleryRender';
import * as renderMarkup from '../js/moviesMarkup';

const prevBtn = document.querySelector('.page-btn.previous');
const nextBtn = document.querySelector('.page-btn.next');
const paginationSection = document.querySelector('.pagination-section');
const paginationBar = document.querySelector('.pagination-btns');
const form = document.querySelector('.search-form');

if (form) {
    form.addEventListener('submit', search);
};

const saveLs = (key, value) => {
  try {
    const status = JSON.stringify(value);
    localStorage.setItem(key, status);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadLs = key => {
  try {
    const status = localStorage.getItem(key);
    return status === null ? undefined : JSON.parse(status);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};


if (!loadLs('total-pages')) {
  saveLs('total-pages', 1000);
}

if (!loadLs('page-pg')) {
  saveLs('page-pg', 1);
}

let searchPage = 1;
let page = loadLs('page-pg');
let amountOfPages = loadLs('total-pages');
let query = loadLs('query-pg');

if (prevBtn) {
  prevBtn.classList.add('is-hidden');
};

if (nextBtn) {
  nextBtn.addEventListener('click', onNextBtnClick);
  prevBtn.addEventListener('click', onPrevBtnClick);
  paginationBar.addEventListener('click', onPageClick);
}

function onPageClick(e) {
  if (e.target.className == 'page') {
    renderPagination(e);
  }
}

function onNextBtnClick() {
  if (page == amountOfPages - 1) {
    nextBtn.classList.add('is-hidden');
  }
  if (page == 1) {
    prevBtn.classList.add('is-hidden');
    }
//   else {
//       prevBtn.classList.remove('is-hidden');
//     }
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page].classList.add('active');
    paginationBar.children[page - 1].classList.remove('active');
    page += 1;
  } else {
    if (page < 3) {
      page += 1;
      paginationBar.children[page + 1].classList.add('active');
      paginationBar.children[page].classList.remove('active');
    } else if (page >= 3) {
      page += 1;
      if (page <= amountOfPages - 2) {
        paginationBar.children[0].classList.remove('is-hidden');
        paginationBar.children[1].classList.remove('is-hidden');
        paginationBar.children[2].textContent = page - 2;
        paginationBar.children[3].textContent = page - 1;
        paginationBar.children[4].textContent = page;
        paginationBar.children[5].textContent = page + 1;
        paginationBar.children[6].textContent = page + 2;
      }
      if (page >= amountOfPages - 2) {
        paginationBar.children[7].classList.add('is-hidden');
        paginationBar.children[8].classList.add('is-hidden');
      }
      if (page == amountOfPages - 1) {
        paginationBar.children[4].classList.remove('active');
        paginationBar.children[5].classList.add('active');
      }
    }
    if (page == amountOfPages) {
      paginationBar.children[5].classList.remove('active');
      paginationBar.children[6].classList.add('active');
    }
  }
  saveLs('page-pg', page);
}

function onPrevBtnClick() {
  if (page == amountOfPages) {
    nextBtn.classList.remove('is-hidden');
  }
  if (page == 2) {
    prevBtn.classList.add('is-hidden');
  }
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page - 2].classList.add('active');
    paginationBar.children[page - 1].classList.remove('active');
    page -= 1;
  } else {
    if (page < 4) {
      page -= 1;
      paginationBar.children[page + 1].classList.add('active');
      paginationBar.children[page + 2].classList.remove('active');
    } else if (page >= 3 && page < amountOfPages - 2) {
      page -= 1;
      paginationBar.children[2].textContent = page - 2;
      paginationBar.children[3].textContent = page - 1;
      paginationBar.children[4].textContent = page;
      paginationBar.children[5].textContent = page + 1;
      paginationBar.children[6].textContent = page + 2;
      if (page == 3) {
        paginationBar.children[0].classList.add('is-hidden');
        paginationBar.children[1].classList.add('is-hidden');
      }
    }
    if (page == amountOfPages - 2) {
      page -= 1;
      paginationBar.children[7].classList.remove('is-hidden');
      paginationBar.children[8].classList.remove('is-hidden');
      paginationBar.children[2].textContent = page - 2;
      paginationBar.children[3].textContent = page - 1;
      paginationBar.children[4].textContent = page;
      paginationBar.children[5].textContent = page + 1;
      paginationBar.children[6].textContent = page + 2;
    } else if (page == amountOfPages - 1) {
      page -= 1;
      paginationBar.children[4].classList.add('active');
      paginationBar.children[5].classList.remove('active');
    } else if (page == amountOfPages) {
      page -= 1;
      paginationBar.children[5].classList.add('active');
      paginationBar.children[6].classList.remove('active');
    }
    }
    saveLs('page-pg', page);
}

function renderPagination(e) {
  page = parseInt(e.target.textContent);
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page - 1].classList.remove('active');
    paginationBar.children[page - 1].classList.add('active');
  } else {
    if (page == 1) {
      paginationBar.innerHTML = `
            <li class="page is-hidden">1</li>
            <li class="dots is-hidden">...</li>
            <li class="page active">1</li>
            <li class="page">2</li>
            <li class="page">3</li>
            <li class="page">4</li>
            <li class="page">5</li>
            <li class="dots">...</li>
            <li class="page">${amountOfPages}</li>`;
    } else if (page == 2) {
      paginationBar.innerHTML = `
            <li class="page is-hidden">1</li>
            <li class="dots is-hidden">...</li>
            <li class="page">1</li>
            <li class="page active">2</li>
            <li class="page">3</li>
            <li class="page">4</li>
            <li class="page">5</li>
            <li class="dots">...</li>
            <li class="page">${amountOfPages}</li>`;
    } else if (page == 3) {
      paginationBar.innerHTML = `
            <li class="page is-hidden">1</li>
            <li class="dots is-hidden">...</li>
            <li class="page">1</li>
            <li class="page">2</li>
            <li class="page active">3</li>
            <li class="page">4</li>
            <li class="page">5</li>
            <li class="dots">...</li>
            <li class="page">${amountOfPages}</li>`;
    } else if (page > 3) {
      if (page <= amountOfPages - 2) {
        paginationBar.innerHTML = `
            <li class="page">1</li>
            <li class="dots">...</li>
            <li class="page">${page - 2}</li>
            <li class="page">${page - 1}</li>
            <li class="page active">${page}</li>
            <li class="page">${page + 1}</li>
            <li class="page">${page + 2}</li>
            <li class="dots">...</li>
            <li class="page">${amountOfPages}</li>`;
      }
      if (page >= amountOfPages - 2) {
        paginationBar.innerHTML = `
            <li class="page">1</li>
            <li class="dots">...</li>
            <li class="page">${page - 2}</li>
            <li class="page">${page - 1}</li>
            <li class="page active">${page}</li>
            <li class="page">${page + 1}</li>
            <li class="page">${page + 2}</li>
            <li class="dots is-hidden">...</li>
            <li class="page is-hidden">${amountOfPages}</li>`;
      }
      if (page == amountOfPages - 1) {
        paginationBar.innerHTML = `
                <li class="page">1</li>
                <li class="dots">...</li>
                <li class="page">${amountOfPages - 4}</li>
                <li class="page">${amountOfPages - 3}</li>
                <li class="page">${amountOfPages - 2}</li>
                <li class="page active">${amountOfPages - 1}</li>
                <li class="page">${amountOfPages}</li>
                <li class="dots is-hidden">...</li>
                <li class="page is-hidden">${amountOfPages}</li>`;
      }
    }
    if (page == amountOfPages) {
      paginationBar.innerHTML = `
                <li class="page">1</li>
                <li class="dots">...</li>
                <li class="page">${amountOfPages - 4}</li>
                <li class="page">${amountOfPages - 3}</li>
                <li class="page">${amountOfPages - 2}</li>
                <li class="page">${amountOfPages - 1}</li>
                <li class="page active">${amountOfPages}</li>
                <li class="dots is-hidden">...</li>
                <li class="page is-hidden">${amountOfPages}</li>`;
    }
    } 
  if (page == amountOfPages) {
    nextBtn.classList.add('is-hidden');
  } else {
    nextBtn.classList.remove('is-hidden');
    }
  if (page == 1) {
      prevBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
    }
    saveLs('page-pg', page);
}

function clearPagination(amountOfPages) {
  prevBtn.classList.add('is-hidden');
  paginationBar.innerHTML = `   <li class="page is-hidden">1</li>
    <li class="dots is-hidden">...</li>
    <li class="page active">1</li>
    <li class="page">2</li>
    <li class="page">3</li>
    <li class="page">4</li>
    <li class="page">5</li>
    <li class="dots">...</li>
    <li class="page">${amountOfPages}</li>`;
}

function search(e) {
  e.preventDefault();
    searchPage = 1;
  prevBtn.classList.add('is-hidden');
    nextBtn.classList.remove('is-hidden');
    saveLs('query-pg', query);
    if (data.results.length < 1 ) {
      list.classList.add('visually-hidden');
      form.reset();
      paginationSection.classList.add('is-hidden');
    } else {
     list.classList.remove('visually-hidden');
      form.reset();
      paginationSection.classList.remove('is-hidden');
    }
    clearPagination(amountOfPages);

}

export function activationPagination() {
    search();
    clearPagination();
    renderPagination();
    onPrevBtnClick();
    onNextBtnClick();
    onPageClick();
}