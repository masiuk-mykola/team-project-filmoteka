//Сохранить в локал
function saveLocalStorage(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

//Витягує ключь з локал
function loadLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.log('Get error: ', error.message);
  }
}
// Видаляє локал ключь
function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}

export default {
  saveLocalStorage,
  loadLocalStorage,
  removeLocalStorage,
};
