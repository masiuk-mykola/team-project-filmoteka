import {addLoader, removeLoader} from './loader';

//Сохранить в локал
function saveLocalStorage(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

//Витягує ключь з локал
function loadLocalStorage(key) {
  try {
    addLoader();
    const data = localStorage.getItem(key);
    removeLoader();
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    addLoader();
    console.log('Get error: ', error.message);
    removeLoader();
  }
}
// Видаляє локал ключь
function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}

export { saveLocalStorage, loadLocalStorage, removeLocalStorage };

// export default {
//   saveLocalStorage,
//   loadLocalStorage,
//   removeLocalStorage,
// };
