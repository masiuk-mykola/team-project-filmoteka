import Notiflix from 'notiflix';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// console.log(auth);

const btnSingInEl = document.querySelector('.js-in');
const backdropSingInEl = document.querySelector('.sing-in-form-backdrop');
const closeModalBtn = document.querySelector('.sing-in-modal__btn-close');
const inputSingInEmail = document.querySelector('input[name="sing-in-email"]');
// console.log(inputSingInEmail);
const inputSingInPassword = document.querySelector(
  'input[name="sing-in-password"]'
);
const btnSignUpEl = document.querySelector('.js-up');
const btnSignOutEl = document.querySelector('.js-out');
// console.log(btnSignOutEl);

btnSingInEl.addEventListener('click', onClickSingInBtn);

function onClickSingInBtn() {
  backdropSingInEl.classList.remove('is-hidden');
  const singInFormEl = document.querySelector('.sing-in-form');
  singInFormEl.addEventListener('submit', onSingInFormSubmit, { once: true });
}

function onSingInFormSubmit(event) {
  event.preventDefault();

  let email = inputSingInEmail.value;
  console.log(email);
  let password = inputSingInPassword.value;
  console.log(password);

  // const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      Notiflix.Notify.success('You are logged into your account');
      backdropSingInEl.classList.add('is-hidden');
    //   btnSingInEl.classList.add('is-hidden');
    //   btnSignUpEl.classList.add('is-hidden');
    //   btnSignOutEl.classList.remove('is-hidden');
// for library
// const libraryLinkEl = document.querySelector('.library-link-for-sing');
// libraryLinkEl.classList.remove('is-hidden');

   
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          // ...
        } else {
            localStorage.removeItem('uid');
          // User is signed out
          // ...
        }
      });
   
}


closeModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
  backdropSingInEl.classList.toggle('is-hidden');
}

btnSignOutEl.addEventListener('click', onClickSingOutBtn);

function onClickSingOutBtn(){
    signOut(auth);
    Notiflix.Notify.info("You're sing out.");
}



// export declare function signOut(auth: Auth): Promise<void>;



