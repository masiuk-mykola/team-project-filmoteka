import Notiflix from 'notiflix';
import { firebaseConfig } from './firebaseConfig';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// console.log(auth);

// Когда пользователь заполняет форму, подтвердите адрес электронной почты и пароль, предоставленные пользователем, а затем передайте их методу createUserWithEmailAndPassword 

const inputEmail = document.querySelector('input[name="email"]');
const inputPassword = document.querySelector('input[name="password"]');
const btnSignUpEl = document.querySelector('.js-up');
const backdropEl = document.querySelector('.sing-up-form-backdrop');
const closeModalBtn = document.querySelector(".sing-up-modal__btn-close");

btnSignUpEl.addEventListener('click', onClickSignUpBtn);

function onClickSignUpBtn() {
    backdropEl.classList.remove('is-hidden');
    const formEl = document.querySelector('.sing-up-form');
    formEl.addEventListener('submit', handleSubmitButtonClick, {once: true});
}

function handleSubmitButtonClick(event) {
    event.preventDefault();

    let email = inputEmail.value;
    // console.log(email);
    let password = inputPassword.value;
    // console.log(password);

createUserWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log (user);
    Notiflix.Notify.success('Registration completed successfully');
    backdropEl.classList.add('is-hidden');
    
     // ...
})
.catch((error) => {
if (error.message === 'Firebase: Error (auth/invalid-email).') {
Notiflix.Notify.warning('Ivalid email. Please, try again!');}
else if (
 error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
) {
Notiflix.Notify.warning('Password should be at least 6 characters');}
// else if (
//   error.message === 'Firebase: Error (auth/email-already-in-use).'
// ) {
//   alert('such mail already exists. Please sign in');}
// const errorCode = error.code;
// const errorMessage = error.message;
// ..
});
}

closeModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
backdropEl.classList.toggle("is-hidden");
}
