import  getMoviesApi  from './getMoviesApi';
import { getSearchMovies, getMovies, getStartMovies, onPageStart } from './startPageGalleryRender';
import { appendMoviesMarkup } from './moviesMarkup';

const getMovies1 = new getMoviesApi();

export function insertMovies(query, page = 1) {

getMovies1.page = page;
    getMovies1.getStartMovies().then(movies => {
        appendMoviesMarkup(movies);
    });
}

