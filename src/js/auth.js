import Notiflix from 'notiflix';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
    onAuthStateChanged, } from "firebase/auth";


const app = initializeApp(firebaseConfig);   // Initialize Firebase

const auth = getAuth();    // Initialize Firebase Authentication and get a reference to the servic

const singUpEL = document.querySelector('.js-up');
const singOutEL = document.querySelector('.js-out');
const singInEL = document.querySelector('.js-in');
const singUpModalBtnClose = document.querySelector('.sing-up-modal__btn-close');
const singInModalBtnClose = document.querySelector('.sing-in-modal__btn-close');
const backdropSingUpEl = document.querySelector('.sing-up-form-backdrop');
const backdropSingInEl = document.querySelector('.sing-in-form-backdrop');
const singUpEmailInput = document.querySelector('input[name="sing-up-email"]');
const singUpPasswordInput = document.querySelector('input[name="sing-up-password"]');
const singInEmailInput = document.querySelector('input[name="sing-in-email"]');
const singInPasswordInput = document.querySelector('input[name="sing-in-password"]');

singUpModalBtnClose.addEventListener('click', 
() => { backdropSingUpEl.classList.add('is-hidden')});

singInModalBtnClose.addEventListener('click', 
() => { backdropSingInEl.classList.add('is-hidden')});

singUpEL.addEventListener('click', onSingUpBtnClick);

function onSingUpBtnClick () {
    backdropSingUpEl.classList.remove('is-hidden');
    const formSingUpEl = document.querySelector('.sing-up-form');
    formSingUpEl.addEventListener('submit', onSubmitSingUpButtonClick, {once: true});
}

function onSubmitSingUpButtonClick (e) {
    e.preventDefault();
    let email = singUpEmailInput.value;
    let password = singUpPasswordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    e.target.reset();
    backdropSingUpEl.classList.add('is-hidden');
    Notiflix.Notify.info("Registration completed successfully");
    // ...
  })
  .catch((error) => {
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
  });
}

singOutEL.addEventListener('click', onSingOutBtnClick);

function onSingOutBtnClick() {
    signOut(auth)
    .then(() => {
        Notiflix.Notify.info("You're sing out.");
    })
    .catch(() => {
        Notiflix.Notify.error("Error.");
    })
}

singInEL.addEventListener('click', onSingInBtnClick);

function onSingInBtnClick() {
    backdropSingInEl.classList.remove('is-hidden');
    const formSingInEl = document.querySelector('.sing-in-form');
    formSingInEl.addEventListener('submit', onSubmitSingInButtonClick, {once: true});
}

function onSubmitSingInButtonClick(e) {
    e.preventDefault();
    let email = singInEmailInput.value;
    let password = singInPasswordInput.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    e.target.reset();
    backdropSingInEl.classList.add('is-hidden');
    Notiflix.Notify.success('You are logged into your account');
    })
    .catch((error) => {
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
  });
}
// let uid = null;
// let userInterface = null;
onAuthStateChanged(auth, (user) => {
    // userInterface = user;
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      singUpEL.classList.add('is-hidden');
      singUpEL.classList.remove('btn__item');
      singInEL.classList.add('is-hidden');
      singInEL.classList.remove('btn__item');
      singOutEL.classList.remove('is-hidden');
      singOutEL.classList.add('btn__item');
    } else {
        singUpEL.classList.remove('is-hidden');
        singInEL.classList.remove('is-hidden');
        singOutEL.classList.add('is-hidden');
    }
  });






