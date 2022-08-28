import { mobMenu } from './js/mobile-menu';
import { onPageStart } from './js/startPageGalleryRender';
import './js/footerModal';
import './js/modalMovieMarkup';
import './js/getfullMovieInfo';
import { onSearchFormSubmit } from './js/search';
import './js/singUpForm';

const KEY = 'b580e55a4551b421271bf131dd03ab39';

onPageStart();

() => {
  onSearchFormSubmit;
};

mobMenu();
