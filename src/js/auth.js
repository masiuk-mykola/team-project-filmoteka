import Notiflix from 'notiflix';
import { firebaseConfig } from './firebaseConfig';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const inputEmail = document.querySelector('input[name="email"]');
const inputPassword = document.querySelector('input[name="password"]');
const inputSingInEmail = document.querySelector('input[name="sing-in-email"]');
// console.log(inputSingInEmail);
const inputSingInPassword = document.querySelector(
  'input[name="sing-in-password"]'
);
const btnSignUpEl = document.querySelector('.js-up');
const btnSingInEl = document.querySelector('.js-in');
const btnSignOutEl = document.querySelector('.js-out');
const backdropSingUpEl = document.querySelector('.sing-up-form-backdrop');
const backdropSingInEl = document.querySelector('.sing-in-form-backdrop');
const closeSingUpModalBtn = document.querySelector(".sing-up-modal__btn-close");
const closeSingInModalBtn = document.querySelector('.sing-in-modal__btn-close');


btnSignUpEl.addEventListener('click', onClickSignUpBtn);

function onClickSignUpBtn() {
    backdropSingUpEl.classList.remove('is-hidden');
    const formEl = document.querySelector('.sing-up-form');
    formEl.addEventListener('submit', handleSubmitButtonClick, {once: true});
}

function handleSubmitButtonClick(event) {
    event.preventDefault();

    let email = inputEmail.value;
    console.log(email);
    let password = inputPassword.value;
    console.log(password);

createUserWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log (user);
    Notiflix.Notify.success('Registration completed successfully! Please, sing in!');
    backdropSingUpEl.classList.add('is-hidden');
    if (user) {
        inputEmail.value = '';
        inputPassword.value = '';
        btnSignUpEl.classList.add('is-hidden');
    }
})
.catch((error) => {
    // console.log('error', error);
    // console.log('error.code', error.code);
    // console.log('error.message', error.message);
if (error.message === 'Firebase: Error (auth/invalid-email).') {
Notiflix.Notify.warning('Ivalid email. Please, try again!');}
else if (
 error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
) {
Notiflix.Notify.warning('Password should be at least 6 characters');}
else if (
 error.message === 'Firebase: Error (auth/email-already-in-use).'
) {
    Notiflix.Notify.warning('Such mail already exists. Please sign in');}
else {
    Notiflix.Notify.warning('Registration error. Try again');
    }
})
}

closeSingUpModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
    inputEmail.value = '';
    inputPassword.value = '';
backdropSingUpEl.classList.toggle("is-hidden");
}

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

btnSignOutEl.addEventListener('click', onClickSingOutBtn);

function onClickSingOutBtn(){
    signOut(auth);
    Notiflix.Notify.info("You're sing out.");
}

closeSingInModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
  backdropSingInEl.classList.toggle('is-hidden');
}





// export declare function signOut(auth: Auth): Promise<void>;



