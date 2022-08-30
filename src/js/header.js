import { getAuth, onAuthStateChanged, } from "firebase/auth";
import Notiflix from 'notiflix';

const hrefMyLibraryEl = document.querySelector('#my-library');
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
        hrefMyLibraryEl.setAttribute('href', './library.html');
        hrefMyLibraryEl.classList.remove('lib');
    } 
    else {
        hrefMyLibraryEl.addEventListener('click', onClickhrefMyLibrary);  
    }
  });

  function onClickhrefMyLibrary(){
    Notiflix.Notify.info("Please register or sing in.");
  }
