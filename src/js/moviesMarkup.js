import { genresArray } from './moviesGenres';

const moviesGallery = document.querySelector('.film_list');

function appendMoviesMarkup(movies) {
  clearGallery();
  movies.forEach(movie => {
    let moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if (movie.poster_path === null) {
      moviePoster = `https://qqcinema.com/wp-content/uploads/no-poster.png`;
    }
    const movieTitle = movie.title;
    let movieReleaseDate = movie.release_date.split('').slice(0, 4).join('');
    if (movie.release_date === '') {
      movieReleaseDate = `Unknown`;
    }
    const movieGenres = getGenres(movie.genre_ids);
    const movieId = movie.id;

    const movieMarkup = `<li id="${movieId}" class="film-list__item"><img src="${moviePoster}" alt="${movieTitle}" class="film-list__item-poster" loading="lazy">
     <div class="film-list__item-info"><h3 class="film-list__item-title">${movieTitle}</h3><div class="film-list__item-details"><span class="film-list__item-genres">${movieGenres}</span>|<span class="film-list__item-year">${movieReleaseDate}</span></div></div>
   </li>`;

    moviesGallery.insertAdjacentHTML('beforeend', movieMarkup);
  });
}

function getGenres(ids) {
  const genres = ids.map(id => {
    const genre = genresArray.find(genre => genre.id === id).name;
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

function clearGallery() {
  moviesGallery.innerHTML = '';
}

export { appendMoviesMarkup, moviesGallery, clearGallery };
