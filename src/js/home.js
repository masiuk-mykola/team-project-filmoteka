import { mobMenu } from './mobile-menu';
import { onPageStart } from './startPageGalleryRender';
import './footerModal';
import './modalMovieMarkup';
import './getfullMovieInfo';
import { onSearchFormSubmit } from './search';
import './singUpForm';
import './singInForm';
// import './auth';

const KEY = 'b580e55a4551b421271bf131dd03ab39';

onPageStart();

() => {
  onSearchFormSubmit;
};

mobMenu();
