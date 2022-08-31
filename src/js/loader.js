    import { Loading } from 'notiflix/build/notiflix-loading-aio';

    export function addLoader(){
        Loading.standard({
            svgColor: 'var(--accent-color)',
    });
    }

    export function removeLoader(){
        Loading.remove(250);
    }

  