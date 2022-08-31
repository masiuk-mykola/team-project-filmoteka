import easterBreaker from 'easter-break';
document
  .getElementById('dangerous-button')
  .addEventListener('click', () => easterBreaker());

import { mobMenu } from './mobile-menu';
import { onPageStart } from './startPageGalleryRender';
import './theme';
import './footerModal';
import './modalMovieMarkup';
import './getfullMovieInfo';
import { onSearchFormSubmit } from './search';
import './Utils/auth';
import './header';
import './loader';
import './sortMoviesBy';

const KEY = 'b580e55a4551b421271bf131dd03ab39';

onPageStart();

() => {
  onSearchFormSubmit;
};

mobMenu();
