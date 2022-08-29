import Notiflix from 'notiflix';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

closeModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
  backdropSingInEl.classList.toggle('is-hidden');
}
