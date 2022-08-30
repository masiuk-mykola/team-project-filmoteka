import { mobMenu } from './mobile-menu';
import { onPageStart } from './startPageGalleryRender';
import './theme';
import './footerModal';
import './modalMovieMarkup';
import './getfullMovieInfo';
import { onSearchFormSubmit } from './search';
import './auth';
import './header';

const KEY = 'b580e55a4551b421271bf131dd03ab39';

onPageStart();

() => {
  onSearchFormSubmit;
};

mobMenu();
